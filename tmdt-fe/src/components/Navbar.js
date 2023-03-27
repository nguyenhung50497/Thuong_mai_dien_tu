import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import { showProfile } from "../service/userService";
import { search } from "../service/productService";
import { Field, Form, Formik } from "formik";
import { getCartDetailsByUser } from "../service/cartDetailService";
import {
   editNotification,
   getNotificationsByReceiver,
} from "../service/notificationService";

export default function Navbar() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector((state) => {
      if (state !== undefined) {
         return state.users.users;
      }
   });
   const profile = useSelector((state) => {
      if (state !== undefined) {
         return state.users.user.user;
      }
   });

   const [queryValue, setQueryValue] = useState({
      keyword: [""],
   });
   const existUrl = useSelector((state) => {
      return state.products.existUrl;
   });
   const [queryStringAPI, setQueryStringAPI] = useState("");
   const handleSubmit = async (values) => {
      if (values.keyword !== "") {
         queryValue.keyword[0] = values.keyword;
         setQueryValue({
            keyword: queryValue.keyword,
         });
      }
      if (values.keyword === "") {
         setQueryValue({
            keyword: [""],
         });
      }
   };
   const existSearchParams = new URLSearchParams(existUrl);
   let key = [];
   let value = [];
   for (const [key1, value1] of existSearchParams.entries()) {
      key.push(key1);
      value.push(value1);
   }
   const searchParams = new URLSearchParams();
   useEffect(() => {
      // if(queryValue.keyword[0] !== '') {
      //     searchParams.append('keyword', queryValue.keyword[0])
      // }
      // const queryString = searchParams.toString();
      let queryString = "";
      if (existUrl === "") {
         if (queryValue.keyword[0] !== "") {
            searchParams.append("keyword", queryValue.keyword[0]);
         }
         queryString += searchParams.toString();
      }
      if (existUrl !== "") {
         if (key.length === 1) {
            if (queryValue.keyword[0] !== "") {
               searchParams.append("keyword", queryValue.keyword[0]);
            }
            queryString += searchParams.toString();
         } else {
            if (queryValue.keyword[0] !== "") {
               searchParams.append("keyword", queryValue.keyword[0]);
            }

            for (let i = 1; i < key.length; i++) {
               searchParams.append(key[i], value[i]);
            }
            queryString += searchParams.toString();
         }
      }
      if (queryString) {
         setQueryStringAPI(queryString);
         navigate("/search?" + queryString, { state: queryString });
      }

      if (!queryString && existUrl !== "") {
         setQueryStringAPI(queryString);
         navigate("/search");
      }
      // if (!queryString && existUrl === '')  {
      //     setQueryStringAPI(queryString)
      //     navigate('/')
      // }
   }, [queryValue.keyword[0]]);
   useEffect(() => {
      dispatch(search([queryStringAPI, 1]));
   }, [queryStringAPI]);

   useEffect(() => {
      if (user === null) {
      } else {
         dispatch(showProfile(user.idUser));
      }
   }, []);
   const logOut = () => {
      localStorage.clear();
      googleLogout();
      navigate("/");
      window.location.reload();
   };
   const cartDetails = useSelector((state) => {
      if (state.cartDetails.cart) {
         return state.cartDetails.cart;
      }
   });
   const notifications = useSelector((state) => {
      if (state.notifications.notifications !== undefined) {
         return state.notifications.notifications;
      }
   });
   let total = 0;
   for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].statusNotification === "chuadoc") {
         total++;
      }
   }
   let sum = 0;
   if (cartDetails) {
      for (let i of cartDetails) {
         if (i.statusCart === "chưa thanh toán") {
            sum++;
         }
      }
   }
   const handleStatusNotification = (values) => {
      dispatch(editNotification(values)).then(() => {
         window.location.reload();
      });
   };
   useEffect(() => {
      if (user) {
         dispatch(getNotificationsByReceiver(user.idUser));
         dispatch(getCartDetailsByUser(user.idUser));
      }
   }, [user]);
   return (
      <>
         <div
            className="row m-0 w-100 mb-2"
            style={{ position: "fixed", zIndex: "1" }}>
            <div
               className="col-12"
               style={{ backgroundColor: "rgb(238,77,45)", height: "120px" }}>
               <div className="row">
                  <div className="col-2"></div>
                  <div
                     className="col-8"
                     style={{ height: "120px", color: "white" }}>
                     <div className="row">
                        <div className="col-12" style={{ height: "30px" }}>
                           <div className="row">
                              <div className="col-6">
                                 <div className="col-12">
                                    <div className="row">
                                       <div className="col-6">
                                          <small
                                             style={{ marginRight: "10px" }}>
                                             {" "}
                                             Tải ứng dụng | Kết nối{" "}
                                          </small>{" "}
                                          <small
                                             style={{ marginRight: "10px" }}
                                             title={"facebook"}>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-facebook"
                                                viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                             </svg>
                                          </small>{" "}
                                          <small
                                             style={{ marginRight: "10px" }}
                                             title={"instagram"}>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-instagram"
                                                viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                             </svg>
                                          </small>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 className="col-6"
                                 style={{ textAlign: "right" }}>
                                 <div className="row">
                                    <small
                                       className="col-6"
                                       style={{ marginLeft: "150px" }}
                                       title={"hỗ trợ"}>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          className="bi bi-question-circle"
                                          viewBox="0 0 16 16">
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                       </svg>
                                       <small style={{ marginRight: "10px" }}>
                                          {" "}
                                          Hỗ trợ
                                       </small>
                                    </small>
                                    {user !== undefined && user === null ? (
                                       <>
                                          <Link
                                             to={"/login"}
                                             style={{
                                                marginRight: "10px",
                                                color: "white",
                                             }}>
                                             Đăng nhập
                                          </Link>{" "}
                                          |{" "}
                                          <Link
                                             to={"/register"}
                                             style={{
                                                paddingLeft: "10px",
                                                color: "white",
                                             }}>
                                             Đăng ký
                                          </Link>
                                       </>
                                    ) : (
                                       <>
                                          <div
                                             className="dropdown-menu"
                                             style={{
                                                backgroundColor:
                                                   "rgb(238,77,45)",
                                                border: "none",
                                                marginTop: "-10px",
                                             }}>
                                             <button className="nut_dropdown">
                                                <img
                                                   src={
                                                      profile !== undefined &&
                                                      profile.avatar
                                                   }
                                                   alt=""
                                                   width={"20px"}
                                                   height={"20px"}
                                                   style={{
                                                      borderRadius: "100%",
                                                   }}
                                                />
                                                <small>
                                                   {profile !== undefined &&
                                                      profile.fullName}
                                                </small>
                                             </button>
                                             <div className="noidung_dropdown">
                                                <Link
                                                   className="btn"
                                                   onClick={() => {
                                                      navigate("/account");
                                                      window.location.reload();
                                                   }}>
                                                   Tài khoản của tôi
                                                </Link>
                                                <a
                                                   className="btn"
                                                   onClick={() => {
                                                      navigate("/cart");
                                                   }}>
                                                   Giỏ hàng
                                                </a>
                                                <a
                                                   className="btn"
                                                   onClick={() => logOut()}>
                                                   Đăng xuất
                                                </a>
                                             </div>
                                          </div>
                                       </>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-12" style={{ height: "90px" }}>
                           <div className="row">
                              <div
                                 className="col-2"
                                 style={{ height: "90px", marginLeft: "15px" }}>
                                 <Link
                                    style={{
                                       color: "white",
                                       textDecoration: "none",
                                    }}
                                    onClick={() => {
                                       navigate("/");
                                       window.location.reload();
                                    }}>
                                    <div className="row">
                                       <div style={{ marginTop: "21px" }}>
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="40"
                                             height="40"
                                             fill="currentColor"
                                             className="bi bi-bag-heart-fill"
                                             viewBox="0 0 16 16">
                                             <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                          </svg>
                                       </div>
                                       <div
                                          style={{
                                             fontSize: "35px",
                                             marginLeft: "5px",
                                             marginTop: "21px",
                                          }}>
                                          <p>
                                             <b>HNH</b>
                                          </p>
                                       </div>
                                    </div>
                                 </Link>
                              </div>
                              <div className="col-7">
                                 <div className="row">
                                    <div className="col-12">
                                       <Formik
                                          initialValues={{ keyword: [""] }}
                                          onSubmit={handleSubmit}>
                                          <Form>
                                             <div
                                                className="input-group mb-3"
                                                style={{
                                                   border: "3px white solid",
                                                   marginTop: "21px",
                                                }}>
                                                <Field
                                                   type="text"
                                                   className="form-control"
                                                   name="keyword"
                                                   placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                                                   aria-label="Recipient's username"
                                                   aria-describedby="button-addon2"
                                                   style={{
                                                      border: "none",
                                                      width: "500px",
                                                   }}
                                                />
                                                <div className="input-group-append">
                                                   <button
                                                      className="btn btn-outline-secondary"
                                                      type="submit"
                                                      id="button-addon2"
                                                      style={{
                                                         color: "white",
                                                      }}>
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20"
                                                         height="20"
                                                         fill="currentColor"
                                                         className="bi bi-search"
                                                         viewBox="0 0 16 16">
                                                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                      </svg>
                                                   </button>
                                                </div>
                                             </div>
                                          </Form>
                                       </Formik>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 className="col-1"
                                 style={{ marginLeft: "50px" }}>
                                 <div
                                    title={"giỏ hàng"}
                                    style={{
                                       color: "#008cff",
                                       height: "40px",
                                       left: "45%",
                                       position: "absolute",
                                       top: "25%",
                                       width: "30%",
                                    }}>
                                    <a
                                       className="btn text-light"
                                       onClick={() => {
                                          navigate("/cart");
                                       }}>
                                       <div
                                          className="badge-block"
                                          style={{ marginLeft: "-20px" }}>
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="30"
                                             height="30"
                                             fill="currentColor"
                                             className="bi bi-cart"
                                             viewBox="0 0 16 16">
                                             <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                          </svg>
                                          <span className="e-badge e-badge-light e-badge-overlap e-badge-notification text-danger">
                                             {sum && sum}
                                          </span>
                                       </div>
                                    </a>
                                 </div>
                              </div>
                              <div
                                 className="col-1"
                                 style={{
                                    marginTop: "28px",
                                    marginLeft: "40px",
                                 }}>
                                 <div className="dropdown-menu1">
                                    <span className="e-badge e-badge-light e-badge-overlap e-badge-notification text-danger">
                                       {total}
                                    </span>
                                    <button
                                       className="nut_dropdown1"
                                       style={{
                                          border: "none",
                                          background: "none",
                                          color: "white",
                                       }}>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="30"
                                          height="30"
                                          fill="currentColor"
                                          className="bi bi-bell"
                                          viewBox="0 0 16 16">
                                          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                       </svg>
                                    </button>
                                    <div className="noidung_dropdown1">
                                       {notifications &&
                                          notifications.map((item) => (
                                             <>
                                                {item.contentNotification ===
                                                "waiting" ? (
                                                   <>
                                                      {item.statusNotification ===
                                                      "chuadoc" ? (
                                                         <>
                                                            <span
                                                               className="btn"
                                                               onClick={() =>
                                                                  handleStatusNotification(
                                                                     item.idNotification
                                                                  )
                                                               }>
                                                               Đơn hàng{" "}
                                                               {item.idCart} của
                                                               bạn đã được xác
                                                               nhận
                                                            </span>
                                                         </>
                                                      ) : (
                                                         <>
                                                            <span
                                                               className="btn"
                                                               style={{
                                                                  color: "#8f8f8f",
                                                               }}>
                                                               Đơn hàng{" "}
                                                               {item.idCart} của
                                                               bạn đã được xác
                                                               nhận
                                                            </span>
                                                         </>
                                                      )}
                                                   </>
                                                ) : item.contentNotification ===
                                                  "delete" ? (
                                                   <>
                                                      {item.statusNotification ===
                                                      "chuadoc" ? (
                                                         <>
                                                            <span
                                                               className="btn"
                                                               onClick={() =>
                                                                  handleStatusNotification(
                                                                     item.idNotification
                                                                  )
                                                               }>
                                                               Đơn hàng{" "}
                                                               {item.idCart} của
                                                               bạn đã bị hủy
                                                            </span>
                                                         </>
                                                      ) : (
                                                         <>
                                                            <span
                                                               className="btn"
                                                               style={{
                                                                  color: "#8f8f8f",
                                                               }}>
                                                               Đơn hàng{" "}
                                                               {item.idCart} của
                                                               bạn đã bị hủy
                                                            </span>
                                                         </>
                                                      )}
                                                   </>
                                                ) : item.contentNotification ===
                                                  "feedback" ? (
                                                   <>
                                                      {item.statusNotification ===
                                                      "chuadoc" ? (
                                                         <>
                                                            <span
                                                               className="btn"
                                                               onClick={() =>
                                                                  handleStatusNotification(
                                                                     item.idNotification
                                                                  )
                                                               }>
                                                               Sản phẩm id{" "}
                                                               {item.idProduct}{" "}
                                                               của bạn vừa được
                                                               đánh giá
                                                            </span>
                                                         </>
                                                      ) : (
                                                         <>
                                                            <span
                                                               className="btn"
                                                               style={{
                                                                  color: "#8f8f8f",
                                                               }}>
                                                               Sản phẩm id{" "}
                                                               {item.idProduct}{" "}
                                                               của bạn vừa được
                                                               đánh giá
                                                            </span>
                                                         </>
                                                      )}
                                                   </>
                                                ) : (
                                                   <></>
                                                )}
                                             </>
                                          ))}
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
         </div>
      </>
   );
}
