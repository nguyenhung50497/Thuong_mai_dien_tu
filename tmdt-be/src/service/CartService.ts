import {Cart} from "../model/cart";
import {AppDataSource} from "../data-source";

class CartService {
    private cartRepository;

    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    detailCart = async (idCart, idShop) => {
        let sql = `SELECT *
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN product p on cd.idProduct = p.idProduct
                   WHERE c.idCart = ${idCart}
                     AND p.idShop = ${idShop}`;
        let cart = await this.cartRepository.query(sql);
        return cart;
    };
    searchByPhone = async (id, phone, limit, offset) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName,
                          c.idUser
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE au.phoneAddress LIKE '%${phone}%'
                     AND p.idShop = ${id}
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName
                       LIMIT ${limit}
                   OFFSET ${offset}
        `;
        let carts = await this.cartRepository.query(sql);
        sql = `SELECT COUNT(c.idCart) dem
               FROM cart c
                        JOIN cart_detail cd on c.idCart = cd.idCart
                        JOIN address_user au on c.idAddressUser = au.idAddress
                        JOIN product p on cd.idProduct = p.idProduct
               WHERE au.phoneAddress LIKE '%${phone}%'
                 AND p.idShop = ${id}`
        let count = await this.cartRepository.query(sql);
        let totalPage = Math.ceil(+count[0].dem / limit);
        if (!carts) {
            return null;
        }
        return {carts: carts, totalPage: totalPage}
    };
    searchByName = async (id, name, limit, offset) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName,
                          c.idUser
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND u.fullName LIKE '%${name}%'
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName
                       LIMIT ${limit}
                   OFFSET ${offset}`;
        let carts = await this.cartRepository.query(sql);
        sql = `SELECT COUNT(c.idCart) dem
               FROM cart c
                        JOIN cart_detail cd on c.idCart = cd.idCart
                        JOIN address_user au on c.idAddressUser = au.idAddress
                        JOIN product p on cd.idProduct = p.idProduct
                        JOIN user u on c.idUser = u.idUser
               WHERE p.idShop = ${id}
                 AND u.fullName LIKE '%${name}%'`
        let count = await this.cartRepository.query(sql);
        let totalPage = Math.ceil(+count[0].dem / limit);
        if (!carts) {
            return null;
        }
        return {carts: carts, totalPage: totalPage}
    };
    searchByIdCart = async (idShop, idCart, limit, offset) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName,
                          c.idUser
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${idShop}
                     AND c.idCart = ${idCart}
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName
                       LIMIT ${limit}
                   OFFSET ${offset}`;
        let carts = await this.cartRepository.query(sql);
        sql = `SELECT COUNT(c.idCart) dem
               FROM cart c
                        JOIN cart_detail cd on c.idCart = cd.idCart
                        JOIN address_user au on c.idAddressUser = au.idAddress
                        JOIN product p on cd.idProduct = p.idProduct
               WHERE p.idShop = ${idShop}
                 AND c.idCart = ${idCart}`
        let count = await this.cartRepository.query(sql);
        let totalPage = Math.ceil(+count[0].dem / limit);
        if (!carts) {
            return null;
        }
        return {carts: carts, totalPage: totalPage}
    };
    searchByStatus = async (id, statusCart, limit, offset) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName,
                          c.idUser
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND c.statusCart = "${statusCart}"
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName LIMIT ${limit}
                   OFFSET ${offset}`;
        let carts = await this.cartRepository.query(sql);
        sql = `SELECT COUNT(c.idCart) dem
               FROM cart c
                        JOIN cart_detail cd on c.idCart = cd.idCart
                        JOIN address_user au on c.idAddressUser = au.idAddress
                        JOIN product p on cd.idProduct = p.idProduct
               WHERE p.idShop = ${id}
                 AND c.statusCart = "${statusCart}"`
        let count = await this.cartRepository.query(sql);
        let totalPage = Math.ceil(+count[0].dem / limit);
        if (!carts) {
            return null;
        }
        return {carts: carts, totalPage: totalPage, tong: +count[0].dem}
    };
    searchByCategory = async (id, category, limit, offset) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName,
                          c.idUser
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                            JOIN category c2 on p.idProduct = c2.idCategory
                   WHERE p.idShop = ${id}
                     AND c2.nameCategory LIKE '%${category}%'
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName
                       LIMIT ${limit}
                   OFFSET ${offset}`;
        let carts = await this.cartRepository.query(sql);
        sql = `SELECT COUNT(c.idCart) dem
               FROM cart c
                        JOIN cart_detail cd on c.idCart = cd.idCart
                        JOIN address_user au on c.idAddressUser = au.idAddress
                        JOIN product p on cd.idProduct = p.idProduct
                        JOIN category c2 on p.idProduct = c2.idCategory
               WHERE p.idShop = ${id}
                 AND c2.nameCategory LIKE '%${category}%'`
        let count = await this.cartRepository.query(sql);
        let totalPage = Math.ceil(+count[0].dem / limit);
        if (!carts) {
            return null;
        }
        return {carts: carts, totalPage: totalPage}
    };
    getAllCart = async (id, limit, offset) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName,
                          c.idUser
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND c.statusCart != 'chưa thanh toán'
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart, idAddressUser,
                       u.fullName, c.idUser LIMIT ${limit}
                   OFFSET ${offset}`;
        let carts = await this.cartRepository.query(sql);
        sql = `SELECT COUNT(c.idCart) dem
               FROM cart c
                        JOIN cart_detail cd on c.idCart = cd.idCart
                        JOIN address_user au on c.idAddressUser = au.idAddress
                        JOIN product p on cd.idProduct = p.idProduct
               WHERE p.idShop = ${id}
                 AND c.statusCart != 'chưa thanh toán'`;
        let count = await this.cartRepository.query(sql);
        let totalPage = Math.ceil(+count[0].dem / limit);
        if (!carts) {
            return null;
        }
        return {carts: carts, totalPage: totalPage, tong: +count[0].dem}
    };
    saveCart = async (cart) => {
        return this.cartRepository.save(cart);
    };
    orderStatusConfirm = async (idCart, day) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart});
        if (!cart) {
            return null;
        } else {
            await this.cartRepository.update(
                {idCart: idCart},
                {statusCart: "chờ xác nhận", timePayCart: day}
            );
            return "chờ xác nhận";
        }
    };
    orderStatusSending = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart});
        if (!cart) {
            return null;
        } else {
            let order = await this.cartRepository.update(
                {idCart: idCart},
                {statusCart: "đang xử lý"}
            );
            return "đang xử lý";
        }
    };
    orderStatusComplete = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart});
        if (!cart) {
            return null;
        } else {
            let order = await this.cartRepository.update(
                {idCart: idCart},
                {statusCart: "hoàn thành"}
            );
            return "hoàn thành";
        }
    };
    orderStatusRefunds = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart});
        if (!cart) {
            return null;
        } else {
            await this.cartRepository.update(
                {idCart: idCart},
                {statusCart: "hủy đơn"}
            );
            return "hủy đơn";
        }
    };
    removeCart = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart});
        if (!cart) {
            return null;
        } else {
            await this.cartRepository.delete({idCart: idCart});
            return "delete";
        }
    };
    findByIdUser = async (idUser) => {
        //   let sql = `select * from cart where idUser = ${idUser} and statusCart = "Chưa thanh toán"`
        let cart = await this.cartRepository.findOneBy({
            idUser: idUser,
            statusCart: "Chưa thanh toán",
        });
        if (!cart) {
            return null;
        }
        return cart;
    };
    findByIdUserDone = async (idUser) => {
        //   let sql = `select * from cart where idUser = ${idUser} and statusCart = "Chưa thanh toán"`
        let cart = await this.cartRepository.findOneBy({
            idUser: idUser,
            statusCart: "đang xử lý",
        });
        if (!cart) {
            return null;
        }
        return cart;
    };
    update = async (cart) => {
        let oldCart = await this.cartRepository.findOneBy({
            idCart: cart.idCart,
        });
        if (!oldCart) {
            return null;
        }
       oldCart.idAddressUser = cart.idAddress;
       return await this.cartRepository.update({ idCart: cart.idCart }, oldCart);
    };
   findById = async (id) => {
      let sql = `select * from cart ct join cart_detail cd on ct.idCart = cd.idCart join product p on cd.idProduct = p.idProduct where ct.idCart = ${id}`;
      let carts = await this.cartRepository.query(sql);
      if (!carts) {
         return null;
      }
      return carts;
   };

   countCartDetail = async (idCart, status) => {
      let sql = `select count(*) c from product p 
      join shop s on p.idShop = s.idShop 
      join category c on p.idCategory = c.idCategory 
      join cart_detail cd on p.idProduct = cd.idProduct
      join cart ct on cd.idCart = ct.idCart
      join user u on ct.idUser = u.idUser 
      where ct.statusCart = "${status}" and u.idUser = ${idCart}`;
      let carts = await this.cartRepository.query(sql);
      if (!carts) {
         return null;
      }
      return carts[0].c;
   };
}

export default new CartService();
