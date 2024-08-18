import { ref, uploadBytes } from "firebase/storage";
import { bucket } from "../../firebase/firebase";
import { url } from "../../utils/utils";

export const uploadImg = async (
  resData: any,
  photos: FileList | null,
  route: string,
  table: string,
  folder: string
) => {
  if (photos && photos instanceof FileList && photos.length) {
    const name = `${resData.id}.${photos[0].type.split("/")[1]}`;
    const firebaseRef = ref(bucket, `${folder}/${name}`);
    const metadata = {
      contentType: photos[0].type,
    };

    await uploadBytes(firebaseRef, photos[0], metadata);

    const data = {
      id: resData.id,
      table: table,
      folder: folder,
      photoName: name,
      accessToken: localStorage.getItem("accessToken"),
    };

    const response = await fetch(`${url}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(name);
    return responseData;
  }
};
