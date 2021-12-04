const express = require("express");
const app = express();

app.use(express.json());

const productRoute = require("./routes/product");
const companyRoute = require("./routes/company");
const sellerRoute = require("./routes/seller");

app.use("/", productRoute);
app.use("/", companyRoute);
app.use("/", sellerRoute);

app.listen(3000, () => {
    console.log("Listening at port 3000")
});
app.get('/', (req, res) => {
    res.send({ message: "api is working.." })
});