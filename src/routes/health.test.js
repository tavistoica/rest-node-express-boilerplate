import supertest from "supertest";
import { Server } from "../bootstrap/server.bootstrap";

const serverInstance = new Server();
serverInstance.bootstrap();
const app = serverInstance.app;

const request = supertest(app);

describe("routes", () => {
  afterAll(() => {
    delete serverInstance.app;
    delete serverInstance.listen;
  });

  it("should return a 200 status code on health endpoint", async () => {
    const response = await request.get("/health/");
    expect(response.status).toBe(200);
  });
});
