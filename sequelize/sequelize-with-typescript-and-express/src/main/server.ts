import express from "express";
import db from "../drivers/database/sequelize";

const app = express();

app.use("/teste", (req, res) => res.json({ ok: true }));

db.sequelize
.sync()
.then(() => console.log("connected to db"))
.catch(() => {
    throw "error";
});

app.listen(5000, () => console.log('server at running in port 5000'));