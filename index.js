const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();

app.use(express.json()); //the reason for this is that express does not have a built-in body parser, so we need to install it separately.
app.use(express.urlencoded({ extended: true })); //parse application/x-www-form-urlencoded . this is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); //products coz more than 1 produtc
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//find product , any one product by id
app.get("/api/product/:id", async (req, res) => {
  //products ko product lr diye semantic  ck liye
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    //error is a variable
    res.status(500).json({ message: error.message });
  }
});

//update a product
app.put("/api/product/:id", async (req, res) => {
  try {
    const Product = Product.findByIdAndUpdate(req.params.id, req.body); //update it with the new req.body

    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(req.params.id); //find the updated product by id
    res.status(200).json(updatedProduct);

    //here u need to ensure that the oridcyt is eindeed uodated and existinh
    res.status(200).json(updatedProduct);

    res.status(200).json(obj);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//delete a product  DELETE API
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World ok");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body); //is create a function of mongoose? yes
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://anushreep937:2j4DaJ8ffJM5ou8v@cluster0.ha3wqdb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });
