import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

let initialized = false;
let initPromise: Promise<any> | null = null;

async function getApp() {
  if (!initialized) {
    if (!initPromise) {
      initPromise = registerRoutes(app).then(() => {
        initialized = true;
      });
    }
    await initPromise;
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const expressApp = await getApp();
  return expressApp(req, res);
}
