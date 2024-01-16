import express from "express";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hell");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
