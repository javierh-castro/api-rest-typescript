import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router(); //De esta manera llamamos todas las funciones de router

router.get("/", getProduct);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no es valido"),
  handleInputErrors, //Para que sirve esto?
  getProductById
);

router.post(
  "/",
  //Validación de datos
  body("name")
    .notEmpty() //Lo que ase este método es que no este vació este valor
    .withMessage("El nombre no puede ir vació"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del product no puede ir vació")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no es valido"),
  body("name")
    .notEmpty() //Lo que ase este método es que no este vació este valor
    .withMessage("El nombre no puede ir vació"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del product no puede ir vació")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  updateProduct
);

router.patch("/:id",
  param("id").isInt().withMessage("ID no es valido"), 
  handleInputErrors,
  updateAvailability
);

router.delete("/:id", 
  param("id").isInt().withMessage("ID no es valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
