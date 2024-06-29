import { Response, Request } from "express";
import Product from "../models/Product.model";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      //Nos traemos todos los product
      order: [
        ["price", "DESC"], //Esto es una forma de ordenar product
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] }, //Con esto podemos quitar algunos atributos
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id); //Aca podes elegir como nombrarlo id o numero
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body); //Esto es mas accesible que el código de abajo
    // const product = new Product(req.body)//Crea el objeto product
    // const saveProduct = await product.save()//Con este encontramos el producto ya guardado y podemos encontrar el id por ejemplo
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  //Actualizar product
  // console.log(req.body)
  await product.update(req.body);
  await product.save();

  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product no Encontrado",
    });
  }

  //Actualizar product
  // console.log(req.body)
  product.availability = !product.dataValues.availability//Esto cambia de de true a false sin usar el body

  await product.save();

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product no Encontrado",
    });
  }

  //Actualizar product
  // console.log(req.body)
  product.availability = !product.dataValues.availability//Esto cambia de de true a false sin usar el body

  await product.destroy();//DESTROY?

  res.json({ data: 'Producto Eliminando' });
}