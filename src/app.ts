import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/midleware/globalErrorHandler';
import notFound from './app/midleware/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//Not Found
app.use(notFound);

// Error Handler
app.use(globalErrorHandler);

export default app;
