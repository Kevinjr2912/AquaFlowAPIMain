import { Pool, PoolClient, Result } from "pg";
import dotenv from 'dotenv';

dotenv.config();

export class Postgresql {
  
  private static instance: Postgresql;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '5432'),
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