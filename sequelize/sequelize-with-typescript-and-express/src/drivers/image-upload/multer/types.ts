export interface MulterFileNameProps {
  req: Request;
  file: Express.Multer.File;
  callback: (error: Error | null, filename: string) => void;
}