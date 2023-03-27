import categoryService from "../service/CategoryService";
import { Request, Response } from "express";
import productService from "../service/ProductService";

class ProductController {
   private productService;
   private categoryService;

   constructor() {
      this.productService = productService;
      this.categoryService = categoryService;
   }

   getAllProduct = async (req: Request, res: Response) => {
      try {
         let limit = 18;
         let offset = 0;
         let page = 1;
         if (req.query.page) {
            page = +req.query.page;
            offset = (+page - 1) * limit;
         }
         let products = await productService.getAllProduct(limit, offset);
         let totalPage = await productService.count(limit);
         return res.status(201).json({
            products: products,
            currentPage: page,
            totalPage: totalPage,
         });
      } catch (err) {
         res.status(500).json(err.message);
      }
   };
   createProduct = async (req: Request, res: Response) => {
      try {
         let products = await productService.save(req.body);
         return res.status(200).json(products);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   editProduct = async (req: Request, res: Response) => {
      try {
         let idProduct = req.params.id;
         let idUser = req["decoded"].idUser;
         let check = await this.productService.checkUser(idUser, idProduct);
         if (check === true) {
            let products = await this.productService.update(
               idProduct,
               req.body
            );
            return res.status(200).json(products);
         } else {
            return res.status(401).json("invalid");
         }
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   deleteProduct = async (req: Request, res: Response) => {
      try {
         let idProduct = req.params.id;
         let idUser = req["decoded"].idUser;
         let check = await this.productService.checkUser(idUser, idProduct);
         if (check || req["decoded"].role === "admin") {
            let products = await this.productService.delete(idProduct);
            return res.status(200).json(products);
         } else {
            return res.status(401).json("invalid");
         }
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   findByIdProduct = async (req: Request, res: Response) => {
      try {
         let idProduct = req.params.id;
         let products = await productService.findById(idProduct);
         return res.status(200).json(products);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   findCategory = async (req: Request, res: Response) => {
      try {
         let categories = await categoryService.getAllCategory();
         return res.status(200).json(categories);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   getAll = async (req: Request, res: Response) => {
      try {
         let product = await productService.getAll();
         res.status(200).json(product);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   search = async (req: Request, res: Response) => {
      try {
         let limit = 20;
         let offset = 0;
         let page = 1;
         if (req.query.page) {
            page = +req.query.page;
            offset = (+page - 1) * limit;
         }
         let products = await productService.search(req, res, limit, offset);
         return res.status(201).json({
            products: products.products,
            currentPage: page,
            totalPage: products.totalPage,
         });
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   findProductByIdShop = async (req: Request, res: Response) => {
      try {
         let limit = 15;
         let offset = 0;
         let page = 1;
         if (req.query.page) {
            page = +req.query.page;
            offset = (+page - 1) * limit;
         }
         let idProduct = req.params.id;
         let products = await productService.findByIdShop(
            idProduct,
            limit,
            offset
         );
         return res.status(201).json({
            products: products.products,
            currentPage: page,
            totalPage: products.totalPage,
            count: products.count
         });
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
}

export default new ProductController();
