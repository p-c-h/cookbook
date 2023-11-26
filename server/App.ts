import express from "express";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use((req, res, next) => {
  console.log("Incoming request");
  next();
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

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
