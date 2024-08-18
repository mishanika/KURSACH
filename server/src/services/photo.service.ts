import { decode, verify } from "../utils/utils";
// import { Tokens, decode, makeTokens, readFile, unlinkFile, verify, writeFile } from "../utils/utils";
import { PhotoEdit, ServiceResponse } from "../types";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

class PhotoService {
  changePhoto = async ({
    id,
    table,
    folder,
    photoName,
    accessToken,
  }: PhotoEdit): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);
    if (isAccessVerified && isAccessVerified.isAuth) {
      const decodedToken = decode(accessToken);

      const item = (
        await database.query(`
        SELECT * FROM ${table} WHERE id = '${id}'`)
      ).recordset as any;

      if (item && item.photo && item.photo.length) {
        const url = item.photo;
        const regex = /\/([^/?]+)\?/;

        await bucket.deleteFiles({
          prefix: `${folder}/${url.match(regex)![1]}`,
        });
      }

      const photoFile = await bucket.getFiles({
        prefix: `${folder}/${photoName}`,
      });
      const photoURL = await photoFile[0][0]
        .getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        })
        .then((data) => data[0]);

      // console.log(photoURL);

      await database.query(`
        UPDATE ${table} SET photo = '${photoURL}' WHERE id = '${id}'`);

      return {
        error: "",
        code: 200,
        accessToken: accessToken,
        data: { photo: photoURL },
      };
    }
    return { error: "Internal error while edit", code: 500, accessToken: "" };
  };
}

export default PhotoService;
