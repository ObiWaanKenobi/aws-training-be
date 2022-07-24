import { Client } from 'pg';
import { Product } from '../types/product';
import { HttpCodes } from '../types/httpCodes';
import { HttpError } from '../utils/errors';
import {
  getProductsQuery,
  getProductByIdQuery,
  createProductQuery,
  createStockQuery,
} from '../utils/queries';

const { DB_NAME, DB_PORT, DB_HOST, DB_USER_NAME, DB_PASSWORD } = process.env;

const pgConfig = {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_NAME,
  user: DB_USER_NAME,
  password: DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
};

export class ProductsService {
  static async getProductsList() {
    const client = new Client(pgConfig);
    try {
      await client.connect();
      const { rows } = await client.query(getProductsQuery);

      console.log('ProductsService.getProductsList() result', rows);

      return rows;
    } finally {
      await client.end();
    }
  }

  static async getProductById(id: string) {
    const client = new Client(pgConfig);
    try {
      await client.connect();
      const { rows } = await client.query(getProductByIdQuery, [id]);

      if (!rows[0]) throw new HttpError('Product not found!', HttpCodes.NOT_FOUND);

      console.log('ProductsService.getProductById() result', rows[0]);

      return rows[0];
    } finally {
      await client.end();
    }
  }

  static async createProduct({ title, description, image_url, price, count }: Product) {
    const client = new Client(pgConfig);
    try {
      await client.connect();
      await client.query('BEGIN');

      const { rows: product } = await client.query(createProductQuery, [
        title,
        description,
        image_url,
        price,
      ]);
      const { rows: stock } = await client.query(createStockQuery, [product[0].id, count]);
      await client.query('COMMIT');

      const result = { ...product[0], ...stock[0] };

      console.log('ProductsService.getProductsList() result', result);

      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      await client.end();
    }
  }
}
