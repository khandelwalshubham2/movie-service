import express from "express";
import { delayResult, movies } from "./utils.js";

const PORT = 4001;
const app = express();

app.get("/movies", async (req, res) => {
  const result = await delayResult(movies);
  res.status(200).json({ status: "success", data: result });
});

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "ID must be a number" });
  }
  const result = movies.find((movie) => movie.id == id);

  const data = await delayResult(result);
  res.status(200).json({ status: "success", data });
});

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
