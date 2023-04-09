import path from "path";

export const generateFileName = (req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  const extension = path.extname(file.originalname);
  if (extension.length > 16) {
    cb(new Error("extension too long"), "");
  } else {
    const prependedExtension = extension.length > 0 ? `.${extension}` : "";
    cb(null, `${file.fieldname}-${uniqueSuffix}${prependedExtension}`);
  }
};
