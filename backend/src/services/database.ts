import pg from "pg";
// import { Client } from 'pg'

const client = new pg.Client({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE2,
  user: process.env.POSTGRES_ADMIN_USER, //process.env.POSTGRES_USER,
  password: process.env.POSTGRES_ADMIN_PASSWORD, //process.env.POSTGRES_PASSWORD
});
await client.connect();

export default async function get_bookmarks() {
//   const sql = `SELECT id, created_at, "text", user_agent, ip_address, device_hash FROM bookmarks;`;

//   try {
//     const result = await client.query(sql);
//     console.log(result.rows[0].message); // Hello world!
//     // const result = await client.query(sql);
//     console.log(result);
//     //convert to string
//     return result;
//   } catch (err) {
//     console.error(err);
//     return err;
//   } finally {
//     await client.end();
//   }
return "hardcoded"
}
