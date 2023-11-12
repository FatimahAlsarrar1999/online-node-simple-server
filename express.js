import express from 'express'

const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());


const PORT = "8080";

let products = [
    {
      id: 1,
      name: "Laptop",
      description: "High-performance laptop for all your needs.",
      price: `300 ${"SR"} `,
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest smartphone with advanced features.",
      price: `1000 ${"SR"} `,
    },
  ];

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
  
  //get all the products
  app.get("/products", (req, res) => {
      try {
        res.send(products);
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });
  
  //get product by id
  app.get("/products/:id([0-9]+)", (req, res) => {
      try {
        const id = req.params.id;
        const product = products.find((product) => product.id == id);
        if (!product) {
          res.status(404).send({ success: false, message: `product of id ${id} was not found` });
          return;
        }
        res.status(200).send({
          success: true,
          message: "product was found",
          product: product,
        });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });
  
  //Add one product
  app.post("/products", (req, res) => {
    try {
      const {name,price} = req.body;
      const newProduct = {
        id: new Date().getMilliseconds().toString(),
        name: name,
        price: price,
      };
      products.push(newProduct);
  
      res.status(200).send({
        success: true,
        message: "product was created",
        payload: products
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });
  
  
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  });