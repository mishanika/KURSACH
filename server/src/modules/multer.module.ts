import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, "backup.bak");
  },
});
export const upload = multer({
  storage: storage,
});
