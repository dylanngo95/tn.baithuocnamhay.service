import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import { ErrorHandler } from './ErrorHandler';
import { RegisterRoutes } from '../../build/routes';
import { Logger } from './Logger';
import '../controllers';
import { Constants } from './Constants';

export class Server {
  public app: express.Express = express();
  private readonly port: number = Constants.config.port;

  constructor() {
    this.app.use(this.allowCors);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev', { skip: () => !Logger.shouldLog }));
    RegisterRoutes(this.app);
    this.app.use(ErrorHandler.handleError);

    const swaggerUrl = Constants.config.environment === 'production' ? `${Constants.config.host}/swagger/swagger.json` : `${Constants.config.host}:${this.port}/swagger/swagger.json`;
    const options = {
      explorer : true,
      swaggerUrl: swaggerUrl
    };
    
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options));
    this.app.use(express.static(require('path').join(__dirname, '..', '..', 'build')));
  }

  public async listen(port: number = this.port) {
    process.on('uncaughtException', this.criticalErrorHandler);
    process.on('unhandledRejection', this.criticalErrorHandler);
    const listen = this.app.listen(port);

    Logger.info(`Server running environment: ${Constants.config.environment} with port: ${port}`);
    Logger.info(`Go to ${Constants.config.host}:${port}`);
    return listen;
  }

  private criticalErrorHandler(...args) {
    Logger.error('Critical Error...', ...args);
    process.exit(1);
  }

  private allowCors(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, x-access-token'      
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  }

}
