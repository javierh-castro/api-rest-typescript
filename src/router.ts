import { Router } from "express";

const router = Router()//De esta manera llamamos todas las funciones de router

router.get("/", (req, res) => {
  res.json("Desde Get");
});

router.post("/", (reg, res) => {
  res.json("Desde POST");
});

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