
const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

const PORT = config.app.port || 4000;
connectDB();


app.listen(PORT,() => {
    console.log(`server is runing at http://localhost:${PORT}`);
});