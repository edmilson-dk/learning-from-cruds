export interface IDataCacheRepository {
  setCache: (key: string, value: any, expires: number) => boolean;
  getCache: (key: string) => Promise<any | null>;
}