const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const books = require('./src/routes/books');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "0.0.1",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "RamMohan",
                url: "https://ram222mohan.com",
                email: "ram222mohan@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
        tags: [
            {
                name: 'Books',
                description: 'API to manage your books',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    bearerFormat: 'JWT',
                    scheme: 'bearer',
                    type: 'http',
                },
                basicAuth: {
                    type: 'http',
                    scheme: 'basic'
                }
            },
        },
        basePath: '/',
    },
    apis: ["./src/routes/*.js"]
};

const route = fileName => `./src/routes/${fileName}.js`;
const apis = [route('books')];

const specs = swaggerJsdoc({ ...options });

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use('/books', books);
app.use(
    "/api-docs",
    swaggerUi.serve,
    // swaggerUi.setup(specs),
    swaggerUi.setup(specs, { explorer: true })
);
app.get('/', (req, res, next) => res.redirect('api-docs'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))