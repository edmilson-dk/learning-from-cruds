import fs from "fs";
import sharp from "sharp";
import path from "path";
import { Express } from "express";

import { IDiskImageStorage, resizedPathTypes } from "src/application/repositories/disk-image-storage";

export class SharpDiskImageStorage implements IDiskImageStorage {
  async resizeImage(file: Express.Multer.File, size: number): Promise<Buffer> {
    return sharp(file.path)
      .resize(size)
      .toFormat("webp")
      .webp({ quality: 80 })
      .toBuffer();
  }

  saveImage(imageBuffer: Buffer, file: Express.Multer.File, resizedPath: resizedPathTypes): string {
    const newFilename = file.filename.split(".")[0] + ".webp";
    const pathArray = file.path.split("/");
    pathArray.pop();
    const newPath = `${pathArray.join("/")}/resized/${resizedPath}/${newFilename}`;

    fs.access(file.path, (err) => {
      if (!err) 
        fs.unlink(file.path, err => { if (err) console.log(err) });
    });
        
    fs.writeFile(newPath, imageBuffer, err => {
      if(err) throw err;
    });

    return newFilename;
  }

  deleteNotResizedImage(imageName: string) {
    const imagePath = `${path.resolve(__dirname, '..', '..', "..", "..", 'uploads')}`;
    fs.unlink(`${imagePath}/${imageName}`, (err) => { if (err) console.log(err)});
  }
}