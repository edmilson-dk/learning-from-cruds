import { Express } from "express";

export interface IDiskImageStorage {
  resizeImage: (file: Express.Multer.File, size: number) => Promise<Buffer>;
  saveImage: (imageBuffer: Buffer, file: Express.Multer.File) => string;
}