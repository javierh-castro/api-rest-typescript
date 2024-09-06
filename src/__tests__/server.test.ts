import request from "supertest";
import server from "../server";

describe("Get/ Api", () => {
  it("Provando bases de datos", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    // console.log(res.status);
  });
});

describe("GET /api/products", () => {
  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    // expect(response.body.data).toHaveLength(2)
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  }, 10000);
});

describe("", () => {
  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto No Encontrado");
  });
});
