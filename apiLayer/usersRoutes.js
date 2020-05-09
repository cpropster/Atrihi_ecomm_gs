const express = require("express");
const db = require("../dataLayer");
const jwt = require("jwt-simple");
const models = db.models;

const usersRouter = express.Router();

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

usersRouter.use((req, res, next) => {
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

usersRouter.post("/api/auth", (req, res, next) => {
  db.authenticate(req.body)
    .then((token) => res.send({ token }))
    .catch(() => {
      const error = Error("not authorized");
      error.status = 401;
      next(error);
    });
});

usersRouter.get("/api/auth", isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

usersRouter.post("/api/users", async (req, res, next) => {
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

usersRouter.put("/api/users/:id", async (req, res, next) => {
  try {
    const user = await models.users.update(req.body);
    delete user.password;
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

Object.keys(models).forEach((key) => {
  usersRouter.get(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key]
      .read({ user: req.user })
      .then((items) => res.send(items))
      .catch(next);
  });
  usersRouter.post(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key]
      .create(req.body)
      .then((items) => res.send(items))
      .catch(next);
  });
});
module.exports = { usersRouter };
