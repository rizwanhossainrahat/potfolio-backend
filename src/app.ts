import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.route";
import { authRouter } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import { projectRouter } from "./app/modules/project/project.route";
import { blogRouter } from "./app/modules/blog/blog.route";

const app=express()

app.use(expressSession({
    secret:process.env.EXPRESS_SESSION_SECRET as string,
    resave:false,
    saveUninitialized:false
}))

//middleware
app.use(cors());
app.use(compression()); 
app.use(cookieParser())
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1",userRoutes)
app.use("/api/v1",authRouter)
app.use("/api/v1",projectRouter)
app.use("/api/v1",blogRouter)

app.get("/", (_req, res) => {
  res.send("Protfolio server is running");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;