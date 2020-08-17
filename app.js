if (!process.env.IS_PRODUCTION) {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./dataLayer");
const jwt = require("jwt-simple");
const nodemailer = require("nodemailer");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
const models = db.models;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

const transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

app.post("/api/send", (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const content = `name: ${name} \n email: ${email} \n message: ${message} `;

  const mail = {
    from: name,
    to: "atrihi.contact@gmail.com",
    subject: "New Message From Contact Form",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail",
      });
    } else {
      res.json({
        msg: "success",
      });
    }
  });
});

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    const error = Error("not authorized");
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(Error("not authorized"));
  }
  next();
};

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  db.findUserFromToken(token)
    .then((auth) => {
      req.user = auth;
      next();
    })
    .catch((ex) => {
      const error = Error("not authorized");
      error.status = 401;
      next(error);
    });
});

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth", (req, res, next) => {
  db.authenticate(req.body)
    .then((token) => res.send({ token }))
    .catch(() => {
      const error = Error("not authorized");
      error.status = 401;
      next(error);
    });
});

app.get("/api/auth", isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

app.post("/api/users", async (req, res, next) => {
  try {
    const user = await db.models.users.create({ ...req.body, role: "USER" });
    const token = jwt.encode({ id: user.id }, process.env.JWT);
    delete user.password;
    //need the delete for security purposes
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

app.put("/api/users/:id", async (req, res, next) => {
  try {
    const user = await models.users.update(req.body);
    delete user.password;
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

app.get("/api/getCart", (req, res, next) => {
  db.getCart(req.user.id)
    .then((cart) => res.send(cart))
    .catch(next);
});

app.get("/api/getOrders", (req, res, next) => {
  db.getOrders(req.user.id)
    .then((orders) => res.send(orders))
    .catch(next);
});

app.post("/api/createOrder", (req, res, next) => {
  db.createOrder(req.user.id)
    .then((order) => res.send(order))
    .catch(next);
});

app.get("/api/getLineItems", (req, res, next) => {
  db.getLineItems(req.user.id)
    .then((lineItems) => res.send(lineItems))
    .catch(next);
});

app.post("/api/addToCart", (req, res, next) => {
  // see db/userMethods.js
  db.addToCart({
    userId: req.user.id,
    productId: req.body.productId,
    quantity: req.body.quantity,
  })
    .then((lineItem) => {
      res.send(lineItem);
    })
    .catch(next);
});

app.delete("/api/removeFromCart/:id", (req, res, next) => {
  db.removeFromCart({ userId: req.user.id, lineItemId: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.put("/api/products", (req, res, next) => {
  db.updateProductAvail({ id: req.body.id, avail: req.body.avail })
    .then((products) => res.send(products))
    .catch(next);
});

Object.keys(models).forEach((key) => {
  app.get(`/api/${key}`, (req, res, next) => {
    models[key]
      .read({ user: req.user })
      .then((items) => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, (req, res, next) => {
    models[key]
      .create(req.body)
      .then((items) => res.send(items))
      .catch(next);
  });
});

module.exports = { app, isLoggedIn, isAdmin };
