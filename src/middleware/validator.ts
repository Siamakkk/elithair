import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateBodyDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoInstance);
    console.log(errors)
    if (errors.length > 0) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
      return
    }

    next();
  };
};

export const validateParamsDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.params) as object

    const errors = await validate(dtoInstance);
    console.log(errors)
    if (errors.length > 0) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
      return
    }

    next();
  };
};