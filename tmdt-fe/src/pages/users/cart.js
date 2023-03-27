import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
   deleteCartDetails,
   editCartDetails,
   getCartDetailsByStatus,
} from "../../service/cartDetailService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import swal from "sweetalert";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { addFeedback } from "../../service/feedbackService";
import { Rating } from "react-simple-star-rating";
import {
   getCartByIdUser,
   getCartByIdUserDone,
   payCart,
   updateCart,
} from "../../service/cartService";
import { getAllAddress } from "../../service/addressUser";
import {addNotification} from "../../service/notificationService";

const SignupSchema = Yup.object().shape({
   reviews: Yup.string()
      .min(50, "Nhập tối thiểu 50 kí tự")
      .max(200, "Quá Dài")
      .required("Vui lòng điền vào mục này"),
});
export default function Cart() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [status, setStatus] = useState("chưa thanh toán");
   const [star, setStar] = useState(0);
   const formatCurrency = (price) => {
      var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
      var priceWithCommas = price.toLocaleString();
      var arParts = String(priceWithCommas).split(DecimalSeparator);
      var intPart = arParts[0];
      var decPart = arParts.length > 1 ? arParts[1] : "";
      return intPart;
   };
   const handleRating = (rate) => {
      setStar(rate);
   };
   const [addressCart, setAddressCart] = useState(0);
   const user = useSelector((state) => {
      if (state.users.users) {
         return state.users.users;
      }
   });
   const address = useSelector((state) => {
      if (state !== undefined) {
         return state.addresses.listAddress;
      }
   });
   const cart = useSelector((state) => {
      if (state.carts.cart) {
         return state.carts.cart;
      }
   });
   const cartDone = useSelector((state) => {
      if (state.carts.cartDone) {
         return state.carts.cartDone;
      }
   });
   const cartDetails = useSelector((state) => {
      if (state.cartDetails.cartDetails) {
         return state.cartDetails.cartDetails;
      }
   });
   const count = useSelector((state) => {
      if (state.cartDetails.count) {
         return state.cartDetails.count;
      }
   });
   let sum = 0;
   if (cartDetails) {
      for (let i of cartDetails) {
         if (i.statusCart === "chưa thanh toán") {
            sum += i.priceInCart * i.quantityCart;
         }
      }
   }
   const handleFeedback = async (values) => {
      let data = { ...values };
      data.assessment = star;
      data.idUser = user.idUser;
      let data1 = {contentNotification: 'feedback', idSender: user.idUser, idReceiver: 0, idProduct: data.idProduct, idCart: 0}
      dispatch(addNotification(data1))
      dispatch(addFeedback(data)).then((check) => {
         if (check.payload === "success") {
            swal("Gửi đánh giá thành công");
            window.location.reload();
         } else if (check.payload === undefined) {
            swal("Bạn đã gửi đánh giá cho sản phẩm này rồi");
            window.location.reload();
         }
      });
   };
   useEffect(() => {
      dispatch(getCartByIdUser(user.idUser));
   }, []);
   useEffect(() => {
      dispatch(getCartByIdUserDone(user.idUser));
   }, []);
   useEffect(() => {
      dispatch(getCartDetailsByStatus("chưa thanh toán"));
   }, []);
   useEffect(() => {
      dispatch(getAllAddress(user.idUser)).then((e) => {
         setAddressCart(e.payload[0].idAddress);
      });
   }, []);
   console.log(cartDetails)
   return (
      <div className="row">
         <div className="col-12">
            <Navbar />
         </div>
         <div className="col-12" style={{ marginTop: "130px" }}>
            <div className="row">
               <div className="col-2"></div>
               <div className="col-8">
                  <div className="col-12 bg-light mb-2">
                     <div className="row">
                        <div className="col-12">
                           <div className="row mb-3 mt-2 pl-3 text-center">
                              <div className="col-3">
                                 {status === "chưa thanh toán" ? (
                                    <a
                                       className="btn"
                                       style={{
                                          color: "#ee4d2d",
                                          fontWeight: "bold",
                                       }}
                                       onClick={() => {
                                          setStatus("chưa thanh toán");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "chưa thanh toán"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Chưa thanh toán({count && count})
                                    </a>
                                 ) : (
                                    <a
                                       className="btn"
                                       onClick={() => {
                                          setStatus("chưa thanh toán");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "chưa thanh toán"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Chưa thanh toán
                                    </a>
                                 )}
                              </div>
                              <div className="col-3">
                                 {status === "chờ xác nhận" ? (
                                    <a
                                       className="btn"
                                       style={{
                                          color: "#ee4d2d",
                                          fontWeight: "bold",
                                       }}
                                       onClick={() => {
                                          setStatus("chờ xác nhận");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "chờ xác nhận"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Chờ xác nhận({count !== 0 && count})
                                    </a>
                                 ) : (
                                    <a
                                       className="btn"
                                       onClick={() => {
                                          setStatus("chờ xác nhận");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "chờ xác nhận"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Chờ xác nhận
                                    </a>
                                 )}
                              </div>
                              <div className="col-3">
                                 {status === "đang xử lý" ? (
                                    <a
                                       className="btn"
                                       style={{
                                          color: "#ee4d2d",
                                          fontWeight: "bold",
                                       }}
                                       onClick={() => {
                                          setStatus("đang xử lý");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "đang xử lý"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Đang giao hàng({count !== 0 && count})
                                    </a>
                                 ) : (
                                    <a
                                       className="btn"
                                       onClick={() => {
                                          setStatus("đang xử lý");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "đang xử lý"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Đang giao hàng
                                    </a>
                                 )}
                              </div>
                              <div className="col-3">
                                 {status === "hoàn thành" ? (
                                    <a
                                       className="btn"
                                       style={{
                                          color: "#ee4d2d",
                                          fontWeight: "bold",
                                       }}
                                       onClick={() => {
                                          setStatus("hoàn thành");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "hoàn thành"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Đã giao({count !== 0 && count})
                                    </a>
                                 ) : (
                                    <a
                                       className="btn"
                                       onClick={() => {
                                          setStatus("hoàn thành");
                                          dispatch(
                                             getCartDetailsByStatus(
                                                "hoàn thành"
                                             )
                                          );
                                          navigate("/cart");
                                       }}>
                                       Đã giao
                                    </a>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-12 bg-light mb-2">
                     <div className="row">
                        <div className="col-12">
                           <div
                              className="row mb-3 mt-2 pl-3"
                              style={{ fontWeight: "bold" }}>
                              <div className="col-4">Sản Phẩm</div>
                              <div className="col-2 text-center">Danh Mục</div>
                              <div className="col-2 text-center">Đơn Giá</div>
                              <div className="col-1 text-center">Số Lượng</div>
                              <div className="col-2 text-center">Số Tiền</div>
                              <div className="col-1 text-center">Thoa Tác</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {cartDetails &&
                     cartDetails.map((item, index) => (
                        <>
                           <div className="col-12 bg-light mb-2">
                              <div className="row">
                                 <div className="col-12 m-2">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       fill="currentColor"
                                       class="bi bi-shop-window"
                                       viewBox="0 0 16 16">
                                       <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    <span className="ml-2">
                                       {item.nameShop}
                                    </span>
                                 </div>
                                 <div className="col-12">
                                    <div className="row mb-3 mt-2 pl-3">
                                       <div className="col-4">
                                          <Link
                                             to={`/product-detail/${item.idProduct}`}
                                             style={{
                                                textDecoration: "none",
                                                color: "black",
                                             }}>
                                             <img
                                                src={item.image}
                                                alt=""
                                                style={{
                                                   width: "100px",
                                                }}
                                             />
                                             <span className="ml-3">
                                                {item.nameProduct}
                                             </span>
                                          </Link>
                                       </div>
                                       <div className="col-2 text-center">
                                          <span>{item.nameCategory}</span>
                                       </div>
                                       <div className="col-2 text-center">
                                          <span
                                             style={{
                                                fontSize: "16px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          <span>
                                             {item.priceInCart &&
                                                formatCurrency(
                                                   item.priceInCart
                                                )}
                                          </span>
                                       </div>
                                       <div className="col-1">
                                          {item.statusCart ===
                                             "chưa thanh toán" && (
                                             <input
                                                type="number"
                                                placeholder={item.quantityCart}
                                                style={{
                                                   width: "70px",
                                                   textAlign: "center",
                                                }}
                                                onKeyUp={(e) => {
                                                   if (e.target.value) {
                                                      dispatch(
                                                         editCartDetails({
                                                            idCartDetail:
                                                               item.idCartDetail,
                                                            idCart: item.idCart,
                                                            idProduct:
                                                               item.idProduct,
                                                            priceInCart:
                                                               item.priceInCart,
                                                            timeCartDetail:
                                                               item.timeCartDetail,
                                                            quantityCart:
                                                               +e.target.value,
                                                         })
                                                      ).then(() => {
                                                         dispatch(
                                                            getCartDetailsByStatus(
                                                               "chưa thanh toán"
                                                            )
                                                         ).then(() => {
                                                            navigate("/cart");
                                                         });
                                                      });
                                                   }
                                                }}
                                             />
                                          )}
                                          {item.statusCart !==
                                             "chưa thanh toán" && (
                                             <p
                                                style={{
                                                   textAlign: "center",
                                                   width: "90px",
                                                }}>
                                                {item.quantityCart}
                                             </p>
                                          )}
                                       </div>
                                       <div className="col-2 text-danger text-center">
                                          <span
                                             style={{
                                                fontSize: "16px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          <span>
                                             {item.priceInCart &&
                                                formatCurrency(
                                                   item.priceInCart *
                                                      item.quantityCart
                                                )}
                                          </span>
                                       </div>
                                       <div className="col-1 text-center">
                                          {item.statusCart !== "hoàn thành" && (
                                             <span
                                                className="btn"
                                                onClick={() => {
                                                   swal({
                                                      title: "Bạn có chắc chắn?",
                                                      text: "Bạn sẽ huỷ sản phẩm đã chọn!",
                                                      icon: "warning",
                                                      buttons: true,
                                                      dangerMode: true,
                                                   }).then((willDelete) => {
                                                      if (willDelete) {
                                                         dispatch(
                                                            deleteCartDetails(
                                                               item.idCartDetail
                                                            )
                                                         ).then(() => {
                                                            dispatch(
                                                               getCartDetailsByStatus(
                                                                  "chưa hoàn thành"
                                                               )
                                                            ).then(() => {
                                                               navigate(
                                                                  "/cart"
                                                               );
                                                            });
                                                         });
                                                         swal(
                                                            "Huỷ thành công!",
                                                            {
                                                               icon: "success",
                                                            }
                                                         );
                                                      } else {
                                                         swal("Đã huỷ!");
                                                      }
                                                   });
                                                }}>
                                                Huỷ
                                             </span>
                                          )}
                                          {item.statusCart === "hoàn thành" && (
                                             <>
                                                <button
                                                   type="button"
                                                   className="btn btn"
                                                   data-toggle="modal"
                                                   data-target={
                                                      "#exampleModal" +
                                                      item.idProduct
                                                   }
                                                   style={{
                                                      marginTop: "-20px",
                                                      color: "rgb(238, 77, 45)",
                                                   }}>
                                                   Đánh giá
                                                </button>

                                                <div
                                                   className="modal fade"
                                                   id={
                                                      "exampleModal" +
                                                      item.idProduct
                                                   }
                                                   tabindex="-1"
                                                   aria-labelledby="exampleModalLabel"
                                                   aria-hidden="true">
                                                   <div className="modal-dialog modal-dialog-centered modal-lg">
                                                      <div className="modal-content">
                                                         <div className="modal-header">
                                                            <h5
                                                               className="modal-title"
                                                               id="exampleModalLabel">
                                                               Đánh Giá Sản Phẩm
                                                            </h5>
                                                         </div>
                                                         <Formik
                                                            initialValues={{
                                                               assessment: "",
                                                               reviews: "",
                                                               idProduct:
                                                                  item.idProduct,
                                                               idUser: "",
                                                            }}
                                                            validationSchema={
                                                               SignupSchema
                                                            }
                                                            onSubmit={(
                                                               values
                                                            ) => {
                                                               handleFeedback(
                                                                  values
                                                               ).then();
                                                            }}>
                                                            <Form>
                                                               <div className="modal-body">
                                                                  <div className="row">
                                                                     <div className="col-12">
                                                                        <div className="row">
                                                                           <div className="col-4">
                                                                              <p
                                                                                 style={{
                                                                                    fontSize:
                                                                                       "18px",
                                                                                    marginTop:
                                                                                       "8px",
                                                                                 }}>
                                                                                 Chất
                                                                                 lượng
                                                                                 sản
                                                                                 phẩm
                                                                              </p>
                                                                           </div>
                                                                           <div
                                                                              className="col-4"
                                                                              style={{
                                                                                 marginTop:
                                                                                    "-50px",
                                                                                 marginLeft:
                                                                                    "-100px",
                                                                              }}>
                                                                              <div className="wrapper5">
                                                                                 <Rating
                                                                                    onClick={
                                                                                       handleRating
                                                                                    }
                                                                                 />
                                                                              </div>
                                                                           </div>
                                                                           <div
                                                                              className="col-4"
                                                                              style={{
                                                                                 marginTop:
                                                                                    "6px",
                                                                                 fontSize:
                                                                                    "20px",
                                                                                 color: "rgb(238, 77, 45)",
                                                                              }}>
                                                                              <p>
                                                                                 {star ==
                                                                                 5 ? (
                                                                                    <>
                                                                                       Tuyệt
                                                                                       vời
                                                                                    </>
                                                                                 ) : star ==
                                                                                   4 ? (
                                                                                    <>
                                                                                       Tốt
                                                                                    </>
                                                                                 ) : star ==
                                                                                   3 ? (
                                                                                    <>
                                                                                       Bình
                                                                                       thường
                                                                                    </>
                                                                                 ) : star ==
                                                                                   2 ? (
                                                                                    <>
                                                                                       Chưa
                                                                                       tốt
                                                                                    </>
                                                                                 ) : star ==
                                                                                   1 ? (
                                                                                    <>
                                                                                       Tệ
                                                                                    </>
                                                                                 ) : (
                                                                                    <>

                                                                                    </>
                                                                                 )}
                                                                              </p>
                                                                           </div>
                                                                        </div>
                                                                     </div>
                                                                     <div className="col-12">
                                                                        <label
                                                                           htmlFor="exampleFormControlTextarea1"
                                                                           style={{
                                                                              color: "gray",
                                                                           }}>
                                                                           Hãy
                                                                           chia
                                                                           sẻ
                                                                           những
                                                                           điều
                                                                           bạn
                                                                           thích
                                                                           về
                                                                           sản
                                                                           phẩm
                                                                           này
                                                                           với
                                                                           những
                                                                           người
                                                                           khác
                                                                        </label>
                                                                        <Field
                                                                           as={
                                                                              "textarea"
                                                                           }
                                                                           className="form-control"
                                                                           id="exampleFormControlTextarea1"
                                                                           name={
                                                                              "reviews"
                                                                           }
                                                                           rows="3"></Field>
                                                                     </div>
                                                                     <div className="col-12">
                                                                        <div
                                                                           style={{
                                                                              color: "red",
                                                                           }}>
                                                                           <ErrorMessage
                                                                              name={
                                                                                 "reviews"
                                                                              }
                                                                           />
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                               <div className="modal-footer">
                                                                  <button
                                                                     type="button"
                                                                     className="btn btn-secondary"
                                                                     data-dismiss="modal">
                                                                     Close
                                                                  </button>
                                                                  <button
                                                                     type="submit"
                                                                     className="btn btn"
                                                                     style={{
                                                                        backgroundColor:
                                                                           "rgb(238, 77, 45)",
                                                                        color: "white",
                                                                     }}>
                                                                     Hoàn thành
                                                                  </button>
                                                               </div>
                                                            </Form>
                                                         </Formik>
                                                      </div>
                                                   </div>
                                                </div>
                                             </>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </>
                     ))}
                  {status === "chưa thanh toán" && cartDetails.length > 0 && (
                     <div
                        className="col-12 bg-light"
                        style={{ height: "80px" }}>
                        <div className="row p-3">
                           <div className="col-6 pt-3 pl-5">
                              <div>
                                 {address.length > 0 && (
                                    <select
                                       onChange={(e) => {
                                          setAddressCart(e.target.value);
                                       }}>
                                       {address.map((item, key) => (
                                          <>
                                             <option value={item.idAddress}>
                                                {item.province} -{" "}
                                                {item.district} -{" "}
                                                {item.descriptionAddress}
                                             </option>
                                          </>
                                       ))}
                                    </select>
                                 )}
                              </div>
                           </div>
                           <div className="col-6">
                              <div className="row">
                                 <div
                                    className="col-8 pt-2"
                                    style={{ fontSize: "24px" }}>
                                    Tổng Thanh Toán:{" "}
                                    <span
                                       style={{
                                          fontSize: "20px",
                                          textDecoration: "underline",
                                          color: "red",
                                       }}>
                                       đ
                                    </span>{" "}
                                    <span
                                       style={{
                                          fontSize: "24px",
                                          color: "red",
                                       }}>
                                       {sum != 0 && formatCurrency(sum)}
                                       {(sum = 0 && sum)}
                                    </span>
                                 </div>
                                 <div className="col-4">
                                    <button
                                       className="muaHang w-100"
                                       onClick={() => {
                                          if (addressCart !== 0) {
                                             swal("Thanh toán thành công!");
                                             setStatus("chờ xác nhận");
                                             dispatch(
                                                payCart({
                                                   idCart: cart.idCart,
                                                   idAddress: addressCart,
                                                })
                                             ).then(() => {
                                                dispatch(
                                                   getCartDetailsByStatus(
                                                      "chờ xác nhận"
                                                   )
                                                ).then(() => {
                                                   navigate("/cart");
                                                });
                                             });
                                          } else {
                                             navigate(
                                                `/account/address/${user.idUser}`
                                             );
                                             swal(
                                                "Bạn chưa có địa chỉ, hãy tạo địa chỉ nhận hàng!"
                                             );
                                          }
                                       }}>
                                       Thanh Toán
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
                  {status === "đang xử lý" && cartDetails.length > 0 && (
                     <div
                        className="col-12 bg-light"
                        style={{ height: "80px" }}>
                        <div className="row p-3">
                           <div className="col-6"></div>
                           <div className="col-6">
                              <div className="row">
                                 <div className="col-8 pt-2"></div>
                                 <div className="col-4">
                                    <button
                                       className="muaHang w-100"
                                       onClick={() => {
                                          swal("Thanh toán thành công!");
                                          dispatch(
                                             updateCart([
                                                {
                                                   idCart: cartDone.idCart,
                                                   statusCart: "hoàn thành",
                                                },
                                                user.idUser,
                                             ])
                                          ).then(() => {
                                             dispatch(
                                                getCartDetailsByStatus(
                                                   "hoàn thành"
                                                )
                                             ).then(() => {
                                                navigate("/cart");
                                             });
                                          });
                                       }}>
                                       Đã nhận hàng
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
               <div className="col-2"></div>
            </div>
         </div>
         <div className="col-12">
            <Footer />
         </div>
      </div>
   );
}
