const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./dataLayer");
const jwt = require("jwt-simple");
const models = db.models;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

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
  console.log("inside of the auth post ", req.body);
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

Object.keys(models).forEach((key) => {
  app.get(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key]
      .read({ user: req.user })
      .then((items) => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key]
      .create(req.body)
      .then((items) => res.send(items))
      .catch(next);
  });
});

// const request = mailjet.post("send", { version: "v3.1" }).request({
//   Messages: [
//     {
//       From: {
//         Email: "cpropster@gmail.com",
//         Name: "chrys",
//       },
//       To: [
//         {
//           Email: "cpropster@gmail.com",
//           Name: "chrys",
//         },
//       ],
//       Subject: "Greetings from Mailjet.",
//       TextPart: "My first Mailjet email",
//       HTMLPart:
//         "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       CustomID: "AppGettingStartedTest",
//     },
//   ],
// });
// request
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.log(err.statusCode);
//   });

module.exports = { app, isLoggedIn, isAdmin };
