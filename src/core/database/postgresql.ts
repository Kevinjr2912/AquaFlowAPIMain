import { Pool, PoolClient, Result } from "pg";
import { config } from "../config";
export class Postgresql {
  
  private static instance: Postgresql;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      port: parseInt(config.DB_PORT || '5432'),
      max: 10,
    });
  }

  public static getInstance(): Postgresql {
    if (!Postgresql.instance) Postgresql.instance = new Postgresql();
    return Postgresql.instance;
  }

  public async query(sql: string, params?: any[]): Promise<Result> {
    try {
      const result = await this.pool.query(sql, params);
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  public async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }

}