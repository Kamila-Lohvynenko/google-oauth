import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';

export const swaggerDocs = () => {
  try {
    const doc = JSON.parse(
      fs.readFileSync(path.resolve('docs', 'swagger.json'), {
        encoding: 'utf-8',
      }),
    );
    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch (error) {
    console.log(error);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
