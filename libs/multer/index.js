import multer from "multer";

const generateFilterImage = (props) => {
  const { mimetypes } = props;
  return multer({
    fileFilter: (req, file, cb) => {
      const allowedMimetypes = mimetypes;
      if (!allowedMimetypes.includes(file.mimetype)) {
        const err = new Error(
          `Invalid mimetype ${file.mimetype}, only ${allowedMimetypes} are allowed`
        );
        return cb(err, false);
      }
      cb(null, true);
    },
  });
};

export const imageUpload = generateFilterImage({
  mimetypes: ["image/jpeg", "image/png", "image/jpg, image/gif"],
});
