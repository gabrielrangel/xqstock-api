import { IHttpError } from "./Error/Http/type";
import express, { Express, NextFunction, Request, Response } from "express";
import getMetadataBySymbol from "./Controller/stock/metadata/getMetadataBySymbol";
import getQuotesBySymbol from "./Controller/stock/timeseries/intraday/getQuotesBySymbol";

require("express-async-errors");

const app: Express = express();
const port = 3000;

app.get("/api", (_: Request, res: Response) => {
  res.json({ message: "xqstock api" });
});

app.get("/api/stock/metadata/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const data = await getMetadataBySymbol(symbol);
  res.status(200).json({ data });
});

app.get(
  "/api/stock/timeseries/intraday/:symbol",
  async (req: Request, res: Response) => {
    const { symbol } = req.params;
    const data = await getQuotesBySymbol(symbol);
    res.status(200).json({ data, symbol });
  }
);

app.use(
  (error: IHttpError, _req: Request, res: Response, next: NextFunction) => {
    if (error.name === "Http Exception") {
      return res.status(error.code).send({ error });
    }

    next(error);
  }
);

app.use((error: Error, _req: Request, res: Response, _: NextFunction) => {
  console.error(error);
  return res.status(500).send({ error });
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
