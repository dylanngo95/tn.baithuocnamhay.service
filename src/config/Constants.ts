import { resolve as pathResolve } from 'path';
import { config } from 'dotenv';

const { env } = process;
config({ path: pathResolve(__dirname, `./env/.env.${env.NODE_ENV}`) });

const Config =  {
  environment: env.NODE_ENV,
  host: env.HOST,
  port: Number(env.PORT),
  mongoConnectionString: env.MONGO_CONNECTION_STRING,
  userName: env.USER_NAME,
  password: env.PASSWORD,
}

const errorTypes = {
  db: { statusCode: 500, name: 'Internal Server Error', message: 'database error' },
  validation: { statusCode: 400, name: 'Bad Request', message: 'validation error' },
  auth: { statusCode: 401, name: 'Unauthorized', message: 'auth error' },
  forbidden: { statusCode: 403, name: 'Forbidden', message: 'forbidden content' },
  notFound: { statusCode: 404, name: 'Not Found', message: 'content not found' },
  entity: { statusCode: 422, name: 'Unprocessable Entity', message: 'entity error' }
};

export const Constants = {
  config: Config,
  errorTypes: errorTypes,
  get errorMap() {
    return {
      ValidateError: this.errorTypes.validation,
      ValidationError: this.errorTypes.validation,
      CastError: this.errorTypes.db
    };
  }
};