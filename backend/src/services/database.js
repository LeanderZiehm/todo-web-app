import pg from "pg";
// import { Client } from 'pg'
// let client: pg.Client | null = null;
let client = null;
get_client(); // for testing

async function get_client() {
  try {
    client = new pg.Client({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_ADMIN_USER, //process.env.POSTGRES_USER,
      password: process.env.POSTGRES_ADMIN_PASSWORD, //process.env.POSTGRES_PASSWORD
    });
    await client.connect();
    try {
      const sql = Texts.get_ensure_table_texts_sql();
      await client.query(sql);
    } catch (error) {
      console.log("ERROR for get_ensure_table_texts_sql:",error)
      return client;
    }

    return client;
  } catch (error) {
    console.error(error);
    return null;
  }
}

class Texts {
    static get_select_all_texts_sql() {
    return `SELECT * FROM texts;`;
  }
  static get_select_texts_sql(descending=true,limit=5) {
    const sortBy = descending ? "DESC" : "ASC"; 
    return `SELECT * FROM texts ORDER BY timestamp ${sortBy} LIMIT ${limit};`;
  }

  static get_insert_texts_sql(text) {
    return      `INSERT INTO texts 
                        (text)
                 VALUES ('${text}');`;
  }

  static get_ensure_table_texts_sql() {
    return `CREATE TABLE IF NOT EXISTS texts
          (
            id SERIAL PRIMARY KEY,
            timestamp timestamp default current_timestamp,
            text TEXT
          );`;
  }
}

export async function get_texts(descending=true,limit=5,page=0) {
  client = await get_client();
  if (client !== null) {
    try {
      console.log("page:",page)
      const sql = Texts.get_select_texts_sql(descending,limit);
      console.log(sql);
      const result = await client.query(sql);
      // console.log(result.rows[0].message);
      console.log(result);
      return result.rows;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      await client.end();
    }
  } else {
    return "Client is null";
  }
}

export async function insert_into_texts(text) {
  client = await get_client();
  if (client !== null) {
    try {
      const sql = Texts.get_insert_texts_sql(text);
      console.log(sql);
      const result = await client.query(sql);
      // console.log(result.rows[0].message);
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      await client.end();
    }
  } else {
    return "Client is null";
  }
}
