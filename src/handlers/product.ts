import { Response, Request } from "express"
import Product from "../models/Product.model"

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)//Esto es mas accesible que el código de abajo

    // const product = new Product(req.body)//Crea el objeto product
    // const saveProduct = await product.save()//Con este encontramos el producto ya guardado y podemos encontrar el id por ejemplo
res.json({data: product})
}