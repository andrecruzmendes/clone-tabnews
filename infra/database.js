import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

async function getVersion() {
  const result = await query("SELECT version()");
  return result.rows[0].version;
}
async function getMaxConnections() {
  const result = await query("SHOW max_connections");
  return result.rows[0].max_connections;
}
async function getActiveConnections() {
  const result = await query("SELECT count(*) FROM pg_stat_activity");
  return result.rows[0].count;
}
async function status() {
  try {
    return {
      version: await getVersion(),
      max_connections: await getMaxConnections(),
      active_connections: await getActiveConnections(),
    };
  } catch (error) {
    return {
      errorCode: error.code,
    };
  }
}

export default {
  query: query,
  status: status,
};
