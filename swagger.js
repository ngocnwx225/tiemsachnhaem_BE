const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book E-commerce API',
      version: '1.0.0',
      description: 'API documentation for Book E-commerce application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        Admin: {
          type: 'object',
          properties: {
            adminName: {
              type: 'string',
              description: 'Admin username'
            },
            password: {
              type: 'string',
              description: 'Admin password'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Product name'
            },
            description: {
              type: 'string',
              description: 'Product description'
            },
            price: {
              type: 'number',
              description: 'Product price'
            },
            stock: {
              type: 'number',
              description: 'Product stock quantity'
            },
            catalogId: {
              type: 'string',
              description: 'Catalog ID'
            }
          }
        },
        Order: {
          type: 'object',
          properties: {
            customerId: {
              type: 'string',
              description: 'Customer ID'
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string'
                  },
                  quantity: {
                    type: 'number'
                  }
                }
              }
            },
            totalAmount: {
              type: 'number',
              description: 'Total order amount'
            },
            status: {
              type: 'string',
              description: 'Order status'
            }
          }
        },
        Customer: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Customer username'
            },
            email: {
              type: 'string',
              description: 'Customer email'
            },
            password: {
              type: 'string',
              description: 'Customer password'
            }
          }
        },
        Catalog: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Catalog name'
            },
            description: {
              type: 'string',
              description: 'Catalog description'
            }
          }
        },
        Review: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID'
            },
            customerId: {
              type: 'string',
              description: 'Customer ID'
            },
            rating: {
              type: 'number',
              description: 'Rating (1-5)'
            },
            comment: {
              type: 'string',
              description: 'Review comment'
            }
          }
        },
        Coupon: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Coupon code'
            },
            discount: {
              type: 'number',
              description: 'Discount amount'
            },
            validUntil: {
              type: 'string',
              format: 'date-time',
              description: 'Coupon validity date'
            }
          }
        },
        Invoice: {
          type: 'object',
          properties: {
            orderId: {
              type: 'string',
              description: 'Order ID'
            },
            amount: {
              type: 'number',
              description: 'Invoice amount'
            },
            status: {
              type: 'string',
              description: 'Invoice status'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs; 