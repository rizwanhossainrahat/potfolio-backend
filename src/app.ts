import compression from "compression";
import cors from "cors";
import express from "express";
import { userRoutes } from "./app/modules/user/user.route";
import { authRouter } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import expressSession from "express-session"

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

app.get("/", (_req, res) => {
  res.send("Protfolio server is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;