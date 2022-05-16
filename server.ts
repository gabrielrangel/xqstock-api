import { BadRequest } from "@api/Error/Http/BadRequest";
import { IHttpError } from "@api/Error/Http/type";
import express, { Express, NextFunction, Request, Response } from "express";
import getMetadataBySymbol from "@api/Controller/stock/metadata/getMetadataBySymbol";
import getQuotesBySymbol from "@api/Controller/stock/timeseries/intraday/getQuotesBySymbol";
import { register } from "@api/Controller/token/register";
import jwtAuth from "@api/Middleware/jwtAuth.ts/jwtAuth";
import cors from "cors";
import searchMetadataByKeyword from "@api/Controller/stock/metadata/searchMetadataByKeyword";
import getQuotesBySymbolList from "@api/Controller/stock/timeseries/intraday/getQuotesBySymbolList";
import newSession from "@api/Controller/session/new";
import getSession from "@api/Controller/session/get";
import NotFound from "@api/Error/Http/NotFound";
import addBookmark from "@api/Controller/session/addBookmark";
import removeBookmark from "@api/Controller/session/removeBookmark";

require("express-async-errors");

const app: Express = express();
const port = 3000;

// Middleware

app.disable("etag");
app.use(express.json({ type: "application/json" }));
app.use(cors());
app.use(jwtAuth);

// index

app.get("/api", (_: Request, res: Response) => {
  res.json({ message: "xqstock api" });
});

// Authentication

app.post("/token/register/", async (req: Request, res: Response) => {
  const { email } = req.body as { email: string | undefined };

  if (!email) {
    throw BadRequest("E-mail address is required for register");
  }

  const data = await register(email);

  res.status(200).send({ data });
});

// Session

app.post("/api/session/new", async (req: Request, res: Response) => {
  const session = await newSession();

  res.status(200).send({ session });
});

app.get("/api/session/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const session = await getSession(id ?? "");

  if (session === null) {
    throw NotFound(`Not found session with id ${id}`);
  }

  res.status(200).send({ session });
});

app.put(
  "/api/session/:id/bookmarks/add/:symbol",
  async (req: Request, res: Response) => {
    const { id, symbol } = req.params;

    await addBookmark(id, symbol);

    res
      .status(200)
      .send({ message: `Symbol ${symbol} add as bookmark to session ${id}` });
  }
);

app.delete(
  "/api/session/:id/bookmarks/delete/:symbol",
  async (req: Request, res: Response) => {
    const { id, symbol } = req.params;

    await removeBookmark(id, symbol);

    res.status(200).send({
      message: `Symbol ${symbol} bookmark removed from session ${id}`,
    });
  }
);

// Stock Metadata

app.get("/api/stock/metadata/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const data = await getMetadataBySymbol(symbol);
  res.status(200).json({ data });
});

app.get(
  "/api/stock/metadata/search/:keyword",
  async (req: Request, res: Response) => {
    const { keyword } = req.params;
    const data = await searchMetadataByKeyword(keyword);
    res.status(200).json({ data });
  }
);

// Stock Timeseries

app.post(
  "/api/stock/timeseries/intraday",
  async (req: Request, res: Response) => {
    const { symbol, startDate, endDate } = req.body;

    if (!symbol) {
      throw BadRequest("Missing stock symbol");
    }
    const data = await getQuotesBySymbolList(
      Array.isArray(symbol) ? symbol : [symbol],
      startDate,
      endDate
    );
    res.status(200).json({ data, symbol });
  }
);

app.get(
  "/api/stock/timeseries/intraday/:symbol",
  async (req: Request, res: Response) => {
    const { symbol } = req.params;
    const { startDate, endDate } = req.query;
    const data = await getQuotesBySymbol(
      symbol,
      Array.isArray(startDate) ? startDate[0] : startDate,
      Array.isArray(endDate) ? endDate[0] : endDate
    );
    res.status(200).json({ data, symbol });
  }
);

// Error Handling

app.use(
  (
    error: IHttpError | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error?.name === "Http Exception") {
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
