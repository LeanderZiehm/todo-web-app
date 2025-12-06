import pg from "pg";

// make import env that loads the env if not already instead of process.env
// import dotenv from "dotenv";
// dotenv.config();
// console.log(process.env.POSTGRES_PASSWORD)

let pool = new pg.Pool({
    max: 20,
    min: 3,
    idleTimeoutMillis: 5000,
    host:process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE2,
    user: process.env.POSTGRES_ADMIN_USER,//process.env.POSTGRES_USER,
    password: process.env.POSTGRES_ADMIN_PASSWORD//process.env.POSTGRES_PASSWORD
});


export default async function get_bookmarks(){
    const sql = `SELECT id, created_at, "text", user_agent, ip_address, device_hash FROM bookmarks;`
    const client = await pool.connect();
    const result = await client.query(sql);
    console.log(result);
    //convert to string 
    return result
}


// get()



// export interface PoolConfig extends ClientConfig {
//     // properties from module 'pg-pool'
//     max?: number | undefined;
//     min?: number | undefined;
//     idleTimeoutMillis?: number | undefined | null;
//     log?: ((...messages: any[]) => void) | undefined;
//     Promise?: PromiseConstructorLike | undefined;
//     allowExitOnIdle?: boolean | undefined;
//     maxUses?: number | undefined;
//     maxLifetimeSeconds?: number | undefined;
//     Client?: (new() => ClientBase) | undefined;
// }

// export interface ClientConfig {
//     user?: string | undefined;
//     database?: string | undefined;
//     password?: string | (() => string | Promise<string>) | undefined;
//     port?: number | undefined;
//     host?: string | undefined;
//     connectionString?: string | undefined;
//     keepAlive?: boolean | undefined;
//     stream?: () => stream.Duplex | undefined;
//     statement_timeout?: false | number | undefined;
//     ssl?: boolean | ConnectionOptions | undefined;
//     query_timeout?: number | undefined;
//     lock_timeout?: number | undefined;
//     keepAliveInitialDelayMillis?: number | undefined;
//     idle_in_transaction_session_timeout?: number | undefined;
//     application_name?: string | undefined;
//     fallback_application_name?: string | undefined;
//     connectionTimeoutMillis?: number | undefined;
//     types?: CustomTypesConfig | undefined;
//     options?: string | undefined;
//     client_encoding?: string | undefined;
// }