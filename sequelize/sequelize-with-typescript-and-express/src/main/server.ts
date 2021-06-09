import db from "src/drivers/database/sequelize";
import app from "./app";

const port = Number(process.env.PORT) || 8080;

db.sequelize.sync()
  .then(() => console.log("connected to db"))
  .catch(() => {
    throw "error";
  });

app.listen(port, () => console.log(`Server is running at port ${port}`));