import { Express } from "express";

export type resizedPathTypes = "user" | "book";

export interface IDiskImageStorage {
  resizeImage: (file: Express.Multer.File, size: number) => Promise<Buffer>;
  saveImage: (imageBuffer: Buffer, file: Express.Multer.File, resizedPath: resizedPathTypes) => string;
  deleteNotResizedImage: (imageName: string) => void;
}