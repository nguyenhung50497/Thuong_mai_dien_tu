import {
   Link,
   Outlet,
   useNavigate,
   useParams,
   useSearchParams,
} from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {findByIdShop, findByIdUserShop} from "../../service/shopService";
import Footer from "../../components/Footer";
import { getProductByIdShop } from "../../service/productService";

export default function ShopInterface() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [page, setPage] = useSearchParams();
   const page1 = page.get("page") || 1;
   const [check, setCheck] = useState(0);
   const idUser = useSelector((state) => {
      if (state !== undefined) {
         return state.users.users.idUser;
      }
   });
   const shop = useSelector((state) => {
      if (state !== undefined) {
         return state.shops.shop;
      }
   });
   const products = useSelector((state) => {
      return state.products.products.products;
   });
   const loading = useSelector((state) => state.products.loading);
   const totalPages = useSelector((state) => {
      if (state.products.products !== undefined) {
         return state.products.products.totalPage;
      }
   });
   const formatCurrency = (price) => {
      var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
      var priceWithCommas = price.toLocaleString();
      var arParts = String(priceWithCommas).split(DecimalSeparator);
      var intPart = arParts[0];
      var decPart = arParts.length > 1 ? arParts[1] : "";
      return intPart;
   };
   useEffect(() => {
      dispatch(findByIdShop(id));
      window.scrollTo({top: 0, left: 0, behavior: "smooth"})
   }, []);
   useEffect(() => {
      dispatch(getProductByIdShop({ idShop: id, page: 1 }));
   }, []);
   return (
      <>
         <div className="row">
            <div className="col-12">
               <Navbar />
            </div>
            <div className="col-12" style={{ marginTop: "120px" }}>
               <div className="row">
                  <div
                     className="col-12"
                     style={{ backgroundColor: "white", height: "250px" }}>
                     <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8" style={{ height: "250px" }}>
                           <div className="row">
                              <div
                                 className="col-4"
                                 style={{
                                    backgroundImage: `url(https://down-ws-vn.img.susercontent.com/e03048a5576062894717bb1ab92241f2)`,
                                    backgroundRepeat: "no-repeat",
                                    height: "150px",
                                    marginTop: "50px",
                                    borderRadius: "10px",
                                 }}>
                                 <div className="col-12">
                                    <div className="row">
                                       <div
                                          className="col-2"
                                          style={{
                                             marginTop: "14px",
                                             paddingLeft: "24px",
                                          }}>
                                          <img
                                             src={shop && shop.imageShop}
                                             alt=""
                                             width={"72px"}
                                             height={"72px"}
                                             style={{
                                                borderRadius: "100%",
                                                border: "2px gray solid",
                                             }}
                                          />
                                       </div>
                                       <div className="col-8">
                                          <div className="row">
                                             <div
                                                className="col-12"
                                                style={{
                                                   fontSize: "25px",
                                                   color: "white",
                                                   paddingLeft: "34px",
                                                   paddingTop: "15px",
                                                }}>
                                                <p>
                                                   <b>
                                                      {shop && shop.nameShop}
                                                   </b>
                                                </p>
                                             </div>
                                             <div
                                                className="col-12"
                                                style={{
                                                   color: "white",
                                                   paddingLeft: "34px",
                                                   marginTop: "-15px",
                                                   fontSize: "12px",
                                                }}>
                                                <p>
                                                   <b>
                                                      Địa chỉ:{" "}
                                                      {shop && shop.addressShop}
                                                   </b>
                                                </p>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 {shop && shop.idUser !== idUser ? (
                                    <>
                                       <div className="col-12">
                                          <div className="row">
                                             <div className="col-6">
                                                <button
                                                   type={"submit"}
                                                   className={"shopInterface"}>
                                                   Theo dõi
                                                </button>
                                             </div>
                                             <div className="col-6">
                                                <button
                                                   type={"submit"}
                                                   className={"shopInterface"}>
                                                   Chat
                                                </button>
                                             </div>
                                          </div>
                                       </div>
                                    </>
                                 ) : (
                                    <>
                                       <div className="col-12">
                                          <div className="row">
                                             <div className="col-6">
                                                <Link to={`/account/edit-shop/${id}`}>
                                                   <button
                                                      className={
                                                         "shopInterface"
                                                      }
                                                      type={"submit"}>
                                                      Chỉnh sửa shop
                                                   </button>
                                                </Link>
                                             </div>
                                             <div className="col-6">
                                                <Link
                                                   to={"/shop-manager/" + id}>
                                                   <button
                                                      type={"button"}
                                                      className={
                                                         "shopInterface"
                                                      }>
                                                      Quản lý shop
                                                   </button>
                                                </Link>
                                             </div>
                                          </div>
                                       </div>
                                    </>
                                 )}
                              </div>
                              <div
                                 className="col-8"
                                 style={{
                                    height: "150px",
                                    marginTop: "50px",
                                 }}>
                                 <div className="col-12">
                                    <div className="col-12">
                                       <div className="row">
                                          <div className="col-6">
                                             <div
                                                className="col-12"
                                                style={{ marginTop: "10px" }}>
                                                <div className="row">
                                                   <div className="col-10">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="16"
                                                         height="16"
                                                         fill="currentColor"
                                                         className="bi bi-shop-window"
                                                         viewBox="0 0 16 16"
                                                         style={{
                                                            marginTop: "-9px",
                                                            marginRight: "10px",
                                                         }}>
                                                         <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                                                      </svg>
                                                      Sản phẩm :
                                                   </div>
                                                   <div
                                                      className="col-2"
                                                      style={{
                                                         marginLeft: "-200px",
                                                         color: "rgb(238,77,45)",
                                                      }}>
                                                      {products && products.length}
                                                   </div>
                                                </div>
                                             </div>
                                             <div
                                                className="col-12"
                                                style={{ marginTop: "30px" }}>
                                                <div className="row">
                                                   <div className="col-10">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20"
                                                         height="20"
                                                         fill="currentColor"
                                                         className="bi bi-person-fill-add"
                                                         viewBox="0 0 16 16"
                                                         style={{
                                                            marginTop: "-9px",
                                                            marginRight: "10px",
                                                         }}>
                                                         <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                         <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                      </svg>
                                                      Theo dõi:
                                                   </div>
                                                   <div
                                                      className="col-2"
                                                      style={{
                                                         marginLeft: "-210px",
                                                         color: "rgb(238,77,45)",
                                                      }}>
                                                      195
                                                   </div>
                                                </div>
                                             </div>
                                             <div
                                                className="col-12"
                                                style={{ marginTop: "30px" }}>
                                                <div className="row">
                                                   <div className="col-11">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="16"
                                                         height="16"
                                                         fill="currentColor"
                                                         className="bi bi-chat-left-dots"
                                                         viewBox="0 0 16 16"
                                                         style={{
                                                            marginRight: "10px",
                                                         }}>
                                                         <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                         <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                      </svg>
                                                      Tỉ lệ phản hồi:
                                                   </div>
                                                   <div
                                                      className="col-1"
                                                      style={{
                                                         marginLeft: "-210px",
                                                         color: "rgb(238,77,45)",
                                                      }}>
                                                      {" "}
                                                      195
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-6">
                                             <div
                                                className="col-12"
                                                style={{ marginTop: "10px" }}>
                                                <div className="row">
                                                   <div className="col-10">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20"
                                                         height="20"
                                                         fill="currentColor"
                                                         className="bi bi-people-fill"
                                                         viewBox="0 0 16 16"
                                                         style={{
                                                            marginTop: "-5px",
                                                            marginRight: "10px",
                                                         }}>
                                                         <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                      </svg>
                                                      Người theo dõi :
                                                   </div>
                                                   <div
                                                      className="col-2"
                                                      style={{
                                                         marginLeft: "-160px",
                                                         color: "rgb(238,77,45)",
                                                      }}>
                                                      195k
                                                   </div>
                                                </div>
                                             </div>
                                             <div
                                                className="col-12"
                                                style={{ marginTop: "30px" }}>
                                                <div className="row">
                                                   <div className="col-10">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20"
                                                         height="20"
                                                         fill="currentColor"
                                                         className="bi bi-star"
                                                         viewBox="0 0 16 16"
                                                         style={{
                                                            marginTop: "-9px",
                                                            marginRight: "10px",
                                                         }}>
                                                         <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                      </svg>
                                                      Theo dõi:
                                                   </div>
                                                   <div
                                                      className="col-2"
                                                      style={{
                                                         marginLeft: "-210px",
                                                         color: "rgb(238,77,45)",
                                                      }}>
                                                      195
                                                   </div>
                                                </div>
                                             </div>
                                             <div
                                                className="col-12"
                                                style={{ marginTop: "30px" }}>
                                                <div className="row">
                                                   <div className="col-9">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20"
                                                         height="20"
                                                         fill="currentColor"
                                                         className="bi bi-person-fill-check"
                                                         viewBox="0 0 16 16"
                                                         style={{
                                                            marginTop: "-5px",
                                                            marginRight: "10px",
                                                         }}>
                                                         <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                         <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                      </svg>
                                                      Tham gia:
                                                   </div>
                                                   <div
                                                      className="col-3"
                                                      style={{
                                                         marginLeft: "-170px",
                                                         color: "rgb(238,77,45)",
                                                      }}>
                                                      1 năm
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-2"></div>
                     </div>
                  </div>
                  <div className="col-12"></div>
               </div>
            </div>
         </div>
         <div className="row mt-2">
            <div className="col-2"></div>
            <div className="col-8">
               <div
                  className="col-12 bg-light pt-3 text-center"
                  style={{
                     border: "1px solid rgb(231, 229, 229)",
                     height: "60px",
                     fontSize: "20px",
                  }}>
                  <strong className="text-danger">Sản Phẩm</strong>
               </div>
               <div className="row m-0 p-0">
                  {products &&
                     products.map((item, key) => (
                        <>
                           <div
                              key={key}
                              className="col-lg-2 col-md-4 col-sm-6 p-1 card-product">
                              <div>
                                 <div
                                    className="bg-light shadow-sm"
                                    style={{
                                       height: "300px",
                                    }}>
                                    <Link
                                       to={`/product-detail/${item.idProduct}`}
                                       style={{
                                          textDecoration: "none",
                                       }}>
                                       <img
                                          className="img-fluid"
                                          src={item.image}
                                          style={{
                                             height: "200px",
                                             width: "100%",
                                          }}
                                          alt=""
                                       />
                                    </Link>
                                    <div>
                                       <div style={{ height: "50px" }}>
                                          <p
                                             className="d-block ml-2 mb-1 mt-1 text-dark"
                                             style={{
                                                fontSize: "13px",
                                             }}>
                                             {item.nameProduct}
                                          </p>
                                       </div>
                                       <div>
                                          <div
                                             className="text-danger ml-1"
                                             style={{
                                                float: "left",
                                             }}>
                                             <span
                                                className="text-danger"
                                                style={{
                                                   fontSize: "12px",
                                                   textDecoration: "underline",
                                                }}>
                                                đ
                                             </span>{" "}
                                             {item.price &&
                                                formatCurrency(item.price)}
                                          </div>
                                          <div
                                             className="text-secondary mr-1 mt-1"
                                             style={{
                                                float: "right",
                                                fontSize: "13px",
                                             }}>
                                             {item.sold < 1000 && (
                                                <>Đã bán: {item.sold}</>
                                             )}
                                             {item.sold >= 1000 && (
                                                <>
                                                   Đã bán:{" "}
                                                   {(item.sold / 1000).toFixed(
                                                      1
                                                   )}
                                                   k
                                                </>
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </>
                     ))}
               </div>
               <div className="col-12 mt-3">
                  <nav aria-label="Page navigation example">
                     <ul className="pagination justify-content-center">
                        <li className="page-item">
                           {page1 == 1 ? (
                              <>
                                 <div className="page-link">
                                    <span
                                       aria-hidden="true"
                                       style={{
                                          color: "black",
                                       }}>
                                       &laquo;
                                    </span>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <button
                                    className="page-link"
                                    onClick={() => {
                                       dispatch(
                                          getProductByIdShop({
                                             idShop: id,
                                             page: page1 - 1,
                                          })
                                       );
                                       navigate(
                                          `/shopInterface/${id}?page=` +
                                             (page1 - 1)
                                       );
                                       window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                       });
                                    }}>
                                    {" "}
                                    <span aria-hidden="true">&laquo;</span>
                                 </button>
                              </>
                           )}
                        </li>
                        <li className="page-item">
                           <a className="page-link">
                              {page1}/{totalPages}
                           </a>
                        </li>
                        <li className="page-item">
                           {page1 == totalPages ? (
                              <>
                                 <div className="page-link">
                                    <span
                                       aria-hidden="true"
                                       style={{
                                          color: "black",
                                       }}>
                                       &raquo;
                                    </span>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <button
                                    className="page-link"
                                    onClick={() => {
                                       dispatch(
                                          getProductByIdShop({
                                             idShop: id,
                                             page: Number(page1) + 1,
                                          })
                                       );
                                       navigate(
                                          `/shopInterface/${id}?page=` +
                                             (Number(page1) + 1)
                                       );
                                       window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                       });
                                    }}>
                                    {" "}
                                    <span aria-hidden="true">&raquo;</span>
                                 </button>
                              </>
                           )}
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
            <div className="col-2"></div>
            <div className="col-12">
               <Footer></Footer>
            </div>
         </div>
      </>
   );
}
