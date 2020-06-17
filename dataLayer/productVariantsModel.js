const client = require("./client");

const productVariants = {
  read: async () => {
    return (await client.query('SELECT * from "productVariants"')).rows;
  },
  create: async ({ color, size, image, price, avail, productId }) => {
    const SQL = `INSERT INTO "productVariants"(color, size, image, price, avail, "productId") values($1, $2, $3, $4, $5, $6) returning *`;
    return (
      await client.query(SQL, [color, size, image, price, avail, productId])
    ).rows[0];
  },
};

module.exports = productVariants;
