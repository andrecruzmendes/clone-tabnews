import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      const liveRunMigrations = async () =>
        await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });

      test("For the first time", async () => {
        const firstResponse = await liveRunMigrations();
        expect(firstResponse.status).toBe(201);
        const firstResponseBody = await firstResponse.json();
        expect(Array.isArray(firstResponseBody)).toBe(true);
        expect(firstResponseBody.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const secondResponse = await liveRunMigrations();
        expect(secondResponse.status).toBe(200);
        const secondResponseBody = await secondResponse.json();
        expect(Array.isArray(secondResponseBody)).toBe(true);
        expect(secondResponseBody.length).toBe(0);
      });
    });
  });
});
