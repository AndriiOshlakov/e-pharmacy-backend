import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import pharmaciesRoutes from './routes/pharmaciesRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.use(pharmaciesRoutes);
app.use(reviewsRoutes);
app.use(productsRoutes);
app.use(userRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
