import { Router } from "express";
import ProductManager from "../dao/mongo/productManagerMongo.js";

const router = Router();
const productManager = new ProductManager();
const notFound = { error: "Product not found" };

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   forbidden: 403
   not found: 404
   internal server error: 500
    */

router.get("/", async (req, res) => {
  const products = await productManager.getAll();
  res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getById(pid);
  !product ? res.status(404).json(notFound) : res.status(200).json(product);
});

router.post("/", async (req, res) => {
  const product = req.body;
  const addedProduct = await productManager.addProduct(product);
  !addedProduct
    ? res.status(400).json({ error: "No se pudo agregar el producto" })
    : res.status(201).json(product);
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const modification = req.body;
  const modifiedProduct = await productManager.updateProduct(pid, modification);
  !modifiedProduct
    ? res.status(400).json({ error: `No se pudo modificar el producto` })
    : res.status(200).json(modifiedProduct);
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const removedProduct = await productManager.deleteById(parseInt(pid));
  !removedProduct
    ? res.status(404).json(notFound)
    : res.status(200).json(removedProduct);
});

router.delete("/", async (req, res) => {
  const removedProducts = await productManager.deleteAll();
  !removedProducts
    ? res.status(404).json({ error: "No se pudo eliminar los productos" })
    : res.status(200).json(removedProducts);
});

export default router;
