import { BadRequest } from "@api/Error/Http/BadRequest";
import { IHttpError } from "@api/Error/Http/type";
import express, { Express, NextFunction, Request, Response } from "express";
import getMetadataBySymbol from "@api/Controller/stock/metadata/getMetadataBySymbol";
import getQuotesBySymbol from "@api/Controller/stock/timeseries/intraday/getQuotesBySymbol";
import bodyParser from "body-parser";
import { register } from "@api/Controller/token/register";
import jwtAuth from "@api/Middleware/jwtAuth.ts/jwtAuth";
import cors from "cors";
import searchMetadataByKeyword from "@api/Controller/stock/metadata/searchMetadataByKeyword";

require("express-async-errors");

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(jwtAuth);

app.get("/api", (_: Request, res: Response) => {
  res.json({ message: "xqstock api" });
});

app.get("/api/stock/metadata/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const data = await getMetadataBySymbol(symbol);
  res.status(200).json({ data });
});

app.get("/api/stock/metadata/search/:keyword", async (req: Request, res: Response) => {
  const { keyword } = req.params;
  const data = await searchMetadataByKeyword(keyword);
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

app.post("/token/register/", async (req: Request, res: Response) => {
  const { email } = req.body as { email: string | undefined };

  if (!email) {
    throw BadRequest("E-mail address is required for register");
  }

  const data = await register(email);

  res.status(200).send({ data });
});

app.use(
  (
    { name, ...error }: IHttpError,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (name === "Http Exception") {
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
