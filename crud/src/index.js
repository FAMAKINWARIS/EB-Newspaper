const app = require("./app");
const { connectDb } = require("./db/db");
connectDb()

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
