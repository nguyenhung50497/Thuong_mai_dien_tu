import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../model/product";

class ProductService {
   private productRepository;

   constructor() {
      this.productRepository = AppDataSource.getRepository(Product);
   }

   getAllProduct = async (limit, offset) => {
      let listProduct = [];
      for (let i = 1; i < 12; i++) {
         let sql = `select * from product p join shop s on p.idShop = s.idShop join category c on p.idCategory = c.idCategory join user u on s.idUser = u.idUser where p.idCategory = ${i} order by p.sold desc LIMIT ${3}`;
         let product = await this.productRepository.query(sql);
         listProduct.push(...product);
      }
      listProduct = listProduct.slice(offset, offset + limit)
      if (!listProduct) {
         return "No products found";
      }
      return listProduct;
   };

   save = async (product) => {
      let time = new Date().toLocaleDateString();
      product.timePost = time;
      return this.productRepository.save(product);
   };

   findById = async (idProduct) => {
      let sql = `select * from product p join shop s on p.idShop = s.idShop join category c on p.idCategory = c.idCategory join user u on s.idUser = u.idUser where p.idProduct = ${idProduct}`;
      let product = await this.productRepository.query(sql);
      if (!product) {
         return null;
      }
      return product[0];
   };

   findByIdShop = async (idShop, limit, offset) => {
      let sql = `select * from product p join shop s on p.idShop = s.idShop join category c on p.idCategory = c.idCategory join user u on s.idUser = u.idUser where p.idShop = ${idShop} order by idProduct LIMIT ${limit} OFFSET ${offset}`;
      let products = await this.productRepository.query(sql);
      sql = `select COUNT(idProduct) c from product p join shop s on p.idShop = s.idShop join user u on s.idUser = u.idUser where p.idShop = ${idShop}`;
      let count = await this.productRepository.query(sql);
      let totalPage = Math.ceil(+count[0].c / limit);
      if (!products) {
         return null;
      }
      return { products: products, totalPage: totalPage, count: +count[0].c };
   };

   update = async (idProduct, newProduct) => {
      let product = await this.productRepository.findOneBy({
         idProduct: idProduct,
      });
      if (!product) {
         return null;
      }
      return this.productRepository.update(
         { idProduct: idProduct },
         newProduct
      );
   };

   delete = async (idProduct) => {
      let products = await this.productRepository.findOneBy({
         idProduct: idProduct,
      });
      if (!products) {
         return null;
      }
      return this.productRepository.delete({ idProduct: idProduct });
   };

   count = async (limit) => {
      let listProduct = [];
      for (let i = 1; i < 12; i++) {
         let sql = `select * from product p join shop s on p.idShop = s.idShop join category c on p.idCategory = c.idCategory join user u on s.idUser = u.idUser where p.idCategory = ${i} order by p.sold desc LIMIT ${3}`;
         let product = await this.productRepository.query(sql);
         listProduct.push(...product);
      }
      let totalPage = Math.ceil(+listProduct.length / limit);
      return totalPage;
   };

   checkUser = async (idUser, idProduct) => {
      let sql = `select u.idUser from product p join shop s on p.idShop = s.idShop join user u on s.idUser = u.idUser where p.idProduct = ${idProduct}`;
      let checkIdUser = await this.productRepository.query(sql);
      if (checkIdUser[0].idUser === idUser) {
         return true;
      } else {
         return false;
      }
   };
   getAll = async () => {
      let sql = `select idProduct, nameProduct, price, image, addressShop, nameCategory
                   from product p
                            join category c on p.idCategory = c.idCategory
                            join shop s on p.idShop = s.idShop
                            join user u on s.idUser = u.idUser
                   order by idProduct DESC`;
      let product = await this.productRepository.query(sql);
      return product;
   };
   search = async (req: Request, res: Response, limit, offset) => {
      let sql;
      if (req.query.sort !== undefined && req.query.sort === "discount") {
         sql = `from product p
                            join category c on p.idCategory = c.idCategory
                            join shop s on p.idShop = s.idShop
                            join user u on s.idUser = u.idUser
                            join voucher v on p.idProduct = v.idProduct
                   where (1 = 1)`;
      } else {
         sql = `
                  from product p
                            join category c on p.idCategory = c.idCategory
                            join shop s on p.idShop = s.idShop
                            join user u on s.idUser = u.idUser
                   where (1 = 1) `;
      }

      if (req.query.nameProduct !== undefined) {
         sql += `and nameProduct like '%${req.query.nameProduct}%'`;
      }
      if (req.query.idProduct !== undefined) {
         sql += `and p.idProduct like '%${req.query.idProduct}%'`;
      }
      if (
         req.query.minPrice !== undefined &&
         req.query.maxPrice !== undefined
      ) {
         sql += `and price between '${req.query.minPrice}' AND '${req.query.maxPrice}' `;
      } else if (
         req.query.minPrice !== undefined &&
         req.query.maxPrice === undefined
      ) {
         sql += `and price between '${req.query.minPrice}' AND '1000000000000000000' `;
      } else if (
         req.query.minPrice === undefined &&
         req.query.maxPrice !== undefined
      ) {
         sql += `and price between '0' AND '${req.query.maxPrice}'`;
      }
      if (
         req.query.addressShop !== undefined &&
         typeof req.query.addressShop === "string"
      ) {
         sql += `and addressShop like '%${req.query.addressShop}%'`;
      }
      if (
         req.query.addressShop !== undefined &&
         typeof req.query.addressShop === "object"
      ) {
         sql += `and (addressShop like '%${req.query.addressShop[0]}%'`;
         for (let i = 1; i < req.query.addressShop.length; i++) {
            sql += ` or addressShop like '%${req.query.addressShop[i]}%'`;
         }
         sql += `)`;
      }
      if (req.query.nameCategory !== undefined) {
         sql += `and nameCategory like '%${req.query.nameCategory}%'`;
      }
      if (req.query.keyword !== undefined) {
         sql += `and ( nameProduct like '%${req.query.keyword}%' or addressShop like '%${req.query.keyword}%' or nameCategory like '%${req.query.keyword}%')`;
      }
      let count = await this.productRepository.query(
         "select COUNT(p.idProduct) x " + sql
      );
      let totalPage = Math.ceil(+count[0].x / limit);
      if (req.query.sort !== undefined) {
         if (req.query.sort === "newest") {
            sql += `order by p.idProduct DESC`;
         }
         if (req.query.sort === "oldest") {
            sql += `order by p.idProduct ASC`;
         }
         if (req.query.sort === "highestPrice") {
            sql += `order by price DESC`;
         }
         if (req.query.sort === "lowestPrice") {
            sql += `order by price ASC`;
         }
      }
      sql += ` LIMIT ${limit} OFFSET ${offset}`;
      console.log(sql);
      let products = await this.productRepository.query("select * " + sql);
      if (!products) {
         return null;
      }
      return { products: products, totalPage: totalPage };
   };

   soldUp = async (id, number) => {
      let product = await this.productRepository.findOneBy({
         idProduct: id,
      });
      if (!product) {
         return null;
      }
      return this.productRepository.update(
         { idProduct: id },
         { quantity: product.quantity - number, sold: product.sold + number }
      );
   };

   soldDown = async (id, number) => {
      let product = await this.productRepository.findOneBy({
         idProduct: id,
      });
      if (!product) {
         return null;
      }
      return this.productRepository.update(
         { idProduct: id },
         { quantity: product.quantity + number, sold: product.sold - number }
      );
   };
}

export default new ProductService();
