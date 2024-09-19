import request from "supertest";
import server from "../../server";

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

//----------------------------------------------------------------

describe("GET  /api/products", () => {
  //   it("should check if api/products url exists", async () => {
  //     const response = await request(server).get("/api/products");
  //     expect(response.status).not.toBe(404);
  //   });

  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(0); //Mi arreglo tiene 0 pero puede ser 1 o mas
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });

  it("should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/products/not-valid-url");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no es valido");
  });

  //   it("get a JSON response for a single product", async () => {//Esta guardado un product por eso tiene que dar true
  //     const response = await request(server).get("/api/products/1");
  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("data");
  //   });
});

describe("PUT /api/products/:id", () => {
  it("should validate that the price is greater than O", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor Curvo",
      availability: true,
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy;
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Precio no valido");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
});
