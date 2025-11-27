// run multiple instances of Node.js that can distribute workloads 
import cluster from 'cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';

import express from 'express';
import cors from "cors";
import { config } from './core/config';
import { userRouter } from './users/infraestructure/routes/User_routes';
import { authRouter } from './auth/infraestructure/routes/Auth_routes';
import { filterRouter } from './filters/infraestructure/routes/Filter_routes';

const numCPUs = availableParallelism();
const app = express();
const PORT = Number(config.PORT_SERVER) || 4000;

// middlewares
app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

// resources
app.use("/users", userRouter);
app.use("/filters", filterRouter);
app.use("/auth", authRouter);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  app.listen(PORT,() => { console.log("Server running on http://localhost:" + PORT )});
  console.log(`Worker ${process.pid} started`);
}