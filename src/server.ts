const mongoose = require('mongoose');
const dotenv = require('dotenv');

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import express from 'express'
import { UsersRoute, EventsRoute } from './routes';
import { Router, Request, Response} from 'express';
import { Connection } from 'mongoose';


dotenv.config({ path: './config.env' });

const app = express();
const route = Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//SWAGGER
const options = {
    swaggerOptions: {
        persistAuthorization: true,
        showRequestHeaders: false,
    },
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API For My App',
        },
        servers: [{ url: 'http://localhost:3333/api/v1/' }],
    },
    apis: ['./**/*.ts'],
};
const specs = swaggerJsDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

//MongoDB
const DB = (process.env.DATABASE as string).replace('<PASSWORD>', (process.env.DATABASE_PASSWORD as string))
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((con: Connection) => {
    console.log('DB Connection Successful! ☎️')
})

const baseRoute = '/api/v1';

app.use(baseRoute, UsersRoute);
app.use(baseRoute, EventsRoute);

app.listen(3333, () => console.log('Server Running on Port 3333... 🤖'))






