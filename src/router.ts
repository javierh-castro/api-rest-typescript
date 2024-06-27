import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router()//De esta manera llamamos todas las funciones de router

router.get("/", (req, res) => {
  res.json("Desde Get");
});

router.post("/", createProduct)

router.put("/", (reg, res) => {
  res.json("Desde PUT");
});
router.patch("/", (req, res) => {
  res.json("Desde PATCH");
});
router.delete("/", (reg, res) => {
  res.json("Desde DELETE");
});


export default router