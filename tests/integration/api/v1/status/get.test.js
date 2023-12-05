test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  if ("errorCode" in responseBody.database) {
    expect(responseBody.database).toEqual(
      expect.objectContaining({
        errorCode: expect.any(String),
      }),
    );
  } else {
    expect(responseBody.database).toEqual(
      expect.objectContaining({
        version: expect.any(String),
        max_connections: expect.stringMatching(/^\d+$/),
        active_connections: expect.stringMatching(/^\d+$/),
      }),
    );
  }
});
