import Redis from "ioredis";

import { IDataCacheRepository } from "src/application/repositories/data-cache";

export class RedisDataCache implements IDataCacheRepository {
  private readonly redis: Redis.Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT || 6379),
    });
  }

  setCache(key: string, value: any, expires: number) {
    const result = this.redis.set(key, JSON.stringify(value), "EX", expires);
    return !result ? false : true;
  }

  async getCache(key: string) {
    const value = await this.redis.get(key);

    return value ? JSON.parse(value) : null;
  }
}