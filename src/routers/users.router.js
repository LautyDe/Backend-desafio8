import { Router } from "express";
import UsersManager from "../db/dao/mongo/usersManagerMongo.js";

const router = Router();
const usersManager = new UsersManager();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userOk = await usersManager.loginUser(email, password);
  if (userOk) {
    req.session["email"] = email;
    req.session["password"] = password;
    req.session["logged"] = true;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session["admin"] = true;
    } else {
      req.session["admin"] = false;
    }
    res.redirect("/home");
  } else {
    res.redirect("/loginError");
  }
});

router.post("/register", async (req, res) => {
  const newUser = req.body;
  const userValidator = await usersManager.createUser(newUser);
  if (userValidator) {
    res.redirect("/");
  } else {
    res.redirect("/registerError");
  }
});

router.get("/test", (req, res) => {
  console.log("session", req.session);
  res.send("Probando");
});

router.get("/logout", (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error.message);
      res.json({ message: error });
    } else {
      res.redirect("/");
    }
  });
});

export default router;
