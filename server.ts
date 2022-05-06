import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import getMetadataBySymbol from "./Controller/stock/metadata/getMetadataBySymbol";

dotenv.config();

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/stock/metadata/:symbol", (req: Request, res: Response) => {
  const { symbol } = req.params;
  const data = getMetadataBySymbol(symbol);
  res.status(200).json({ data });
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
