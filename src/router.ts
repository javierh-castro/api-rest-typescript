import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router(); //De esta manera llamamos todas las funciones de router

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *        type: object
 *        properties:
 *          id:
 *             type: integer
 *             description: The Product ID
 *             example: 1
 *          name:
 *             type: string
 *             description: The Product name
 *             example: Monitor Curvo de 49 Pulgadas
 *          price:
 *             type: number
 *             description: The Product price
 *             example: 300
 *          availability:
 *             type: boolean
 *             description: The Product availability
 *             example: true
 */

router.get('/', getProducts)



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               types: array
 *               items:
 *                   $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product
 *      tags:
 *        - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */


/**
 *  TODO: Utilizando POST
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *         - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                             example: "Monitor Curvo 49 Pulgadas"
 *                         price:
 *                             type: number
 *                             example: 399
 *     responses:
 *        200:
 *            description: Successful response
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/Product'
 *        400:
 *            description: Bad Request - Invalid ID
 */
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

/**
 * @swagger
 * /api/products/{id}:
 * 
 *  put:
 *    summary: Update a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *             type: integer
 *    requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        name:
 *                            type: string
 *                            example: "Monitor Curvo 49 Pulgadas"
 *                        price:
 *                            type: number
 *                            example: 399
 *                        availability:
 *                            type: boolean
 *                            example: true
 *    responses:
 *        200:
 *            description: Successful response
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/Product'
 *        400:
 *            description: Bad Request - Invalid ID or Invalid input data
 *        404:
 *            description: Product Not Found
 */

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


/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *        200:
 *            description: Successful response
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/Product'
 *        400:
 *            description: Bad Request - Invalid ID
 *        404:
 *            description: Product Not Found
 */


router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no es valido"),
  handleInputErrors,
  updateAvailability
);


/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message 
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *        200:
 *            description: Successful response
 *            content:
 *                application/json:
 *                    schema:
 *                        type: string
 *                        value: 'Producto Eliminado'
 *        400:
 *            description: Bad Request - Invalid ID
 *        404:
 *            description: Product Not Found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no es valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
