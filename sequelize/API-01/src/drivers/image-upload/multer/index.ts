import { FileFilterCallback } from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
const multer = require("multer");

export const multerConfig = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', '..', 'uploads'),
    filename: function(
      req: Request, file: Express.Multer.File, 
      callback: (error: Error | null, filename: string) => void)
    {
      const newFileName = `${uuid()}-${file.originalname}`;
      callback(null, newFileName);
    }
  }),
  fileFilter: (req: any, file: any, callback: FileFilterCallback) => {
    const isAccepted = ["image/png", "image/jpg", "image/jpeg"]
      .find(validFormat => validFormat == file.mimetype );

    if(isAccepted) return callback(null, true);
    
    return callback(null, false);
  }
}
