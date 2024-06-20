import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const liveRunMigrations = async () =>
    await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });

  const firstResponse = await liveRunMigrations();
  expect(firstResponse.status).toBe(201);
  const firstResponseBody = await firstResponse.json();
  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(firstResponseBody.length).toBeGreaterThan(0);

  const secondResponse = await liveRunMigrations();
  expect(secondResponse.status).toBe(200);
  const secondResponseBody = await secondResponse.json();
  expect(Array.isArray(secondResponseBody)).toBe(true);
  expect(secondResponseBody.length).toBe(0);
});
