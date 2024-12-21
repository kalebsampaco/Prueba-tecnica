import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión gistCards',
            version: '1.0.0',
            description: 'Una API para gestionar giftcards',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./src/routes/*.ts','./src/controllers/*.ts'], // Ruta a tus controladores
};

const specs = swaggerJsdoc(options);

module.exports = specs;