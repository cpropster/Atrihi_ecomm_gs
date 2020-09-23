const client = require("./client");
const faker = require("faker");

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = require("./modelsIndex");
const { products, productVariants, users, orders, lineItems } = models;

const {
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  createAddress,
  updateProductAvail,
  readAddresses,
} = require("./userMethods");

const sync = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE CHECK (char_length(username) > 0),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER'
  );
  CREATE TABLE IF NOT EXISTS products(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    description VARCHAR(999) NOT NULL,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp(); 
  
  CREATE TABLE IF NOT EXISTS "productVariants"(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    color VARCHAR(999) NOT NULL,
    size VARCHAR(100) NOT NULL,
    image VARCHAR(999) NOT NULL,
    price DECIMAL NOT NULL,
    avail INTEGER,
    "productId" UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL
  );
  CREATE TABLE IF NOT EXISTS orders(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id) NOT NULL,
    status VARCHAR(10) DEFAULT 'CART',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS "lineItems"(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "orderId" UUID REFERENCES orders(id) NOT NULL,
    "productId" UUID REFERENCES products(id) NOT NULL,
    quantity INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS addresses(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id) NOT NULL,
    address VARCHAR(100) NOT NULL
  );
  `;
  try {
    await client.query(sql);
  } catch (error) {
    console.log(error);
  }

  const _users = {
    lucy: {
      username: "aiko",
      firstName: "Aiko",
      lastName: "Wong",
      password: "Hello123",
      role: "ADMIN",
    },
  };

  const _products = {
    // foo: {
    //   name: "Polo",
    //   brand: "Polo Ralph Lauren",
    //   description: "Standard Ralph Lauren Polo",
    // },
    // bar: {
    //   name: "V-Neck",
    //   brand: "Tommy Hilfiger",
    //   description: "standard v neck",
    // },
    // que: {
    //   name: "round neck",
    //   brand: "Tommy Hilfiger",
    //   description: "round neck",
    // },
    // qeu: {
    //   name: "sweater",
    //   brand: "Tommy Hilfiger",
    //   description: "sweater",
    // },
    // get: {
    //   name: "hoody",
    //   brand: "Polo Ralph Lauren",
    //   description: "hoody",
    // },
  };

  // Get data from faker

  const [foo, bar, que, qeu] = await Promise.all(
    Object.values(_products).map((product) => products.create(product))
  );

  // const [lucy] = await Promise.all(
  //   Object.values(_users).map((user) => users.create(user))
  // );

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  return {
    users: userMap,
  };
};

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  createAddress,
  readAddresses,
  updateProductAvail,
};
