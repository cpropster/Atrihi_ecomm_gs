const client = require("./client");

const products = {
  read: async () => {
    return (await client.query("SELECT * from products")).rows;
  },
  create: async ({ name, brand, description }) => {
    const SQL = `INSERT INTO products(name, brand, description) values($1, $2, $3) returning *`;
    return (await client.query(SQL, [name, brand, description])).rows[0];
  },
};

module.exports = products;
