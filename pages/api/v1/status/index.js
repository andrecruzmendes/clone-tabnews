import database from "/infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const databaseStatus = await database.status();
  response.status(200).json({
    updated_at: updateAt,
    database: databaseStatus,
  });
}

export default status;
