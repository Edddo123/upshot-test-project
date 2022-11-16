const express = require("express");
const app = express();
const walletRouter = require("./routes/wallet.router");
const job = require("../importer/index");
app.use(express.json());

job.start();

app.use(walletRouter);

app.listen(3000);
