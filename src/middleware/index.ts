import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator"; //check se usa en funciones asíncronas

export const handleInputErrors = ( req: Request, res: Response, next: NextFunction) => {//Parece que tiene que ir en orden
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}