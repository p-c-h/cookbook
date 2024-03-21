import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { IngredientSchema, RecipeSchema } from "./../client/lib/types";

import mongoose from "mongoose";

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  })
);

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Nie rozumiem, czemu to jest potrzebne, ale na tym etapie to nieistotne.
mongoose.set("strictQuery", false);

// Czeka az nastąpi połączenie z bazą danych.
// Przy błędnym URL po jakimś czasie w konsoli pojawi się błąd.

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_URL as string);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Incoming request");
  next();
});

app.get("/foo", async (req, res, next) => {
  try {
    const user = new User({
      username: "Kamil",
      password: "Slimak",
    });
    await user.save();
    res.send("Sukces");
  } catch (err) {
    return next(err);
  }
});

app.get("/categories", (req, res) => {
  res.send(["Śniadnie", "Obiad", "Kolacja"]);
});

app.get("/recipes/1", (req, res) => {
  res.send({
    name: "Falafel",
    category: "Śniadanie",
    ingredients: [
      { original: "apple", substitutes: ["gruszka", "malina"] },
      {
        original: "cebula",
        substitutes: ["dymka", "cebula sproszkowana"],
      },
    ],
    note: "Bardzo lubię ten przepis",
  });
});

app.post("/recipes/new", (req, res) => {
  const result = RecipeSchema.safeParse(req.body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }
  res.send(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
});

app.post("/rm2", (req, res) => {
  const result = IngredientSchema.safeParse(req.body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    console.log(zodErrors);
  }
  res.send(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
