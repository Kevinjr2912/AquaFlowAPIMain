import express, { Request, Response } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { config } from './core/config';
import { userRouter } from './users/infraestructure/routes/User_routes';

const app = express();
const PORT = config.PORT_SERVER;

// middlewares
app.use(express.json());
app.use(cookieParser());

// domains for cors
const allowedDomains = config.AVAILABLE_DOMAINS
  ? config.AVAILABLE_DOMAINS.split(',').map(domain => domain.trim())
  : [];

console.log("Allowed domains")
console.log(allowedDomains)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get("/", (res: Response, req: Request) => {
  res.send("JAJA")
})

// resources
app.use("/users", userRouter);

app.listen(PORT,() => { console.log("Server running on http://localhost:" + PORT )});