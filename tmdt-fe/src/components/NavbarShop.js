import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import { showProfile } from "../service/userService";

export default function NavbarShop() {
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
   return (
      <>
         <div className="row mb-4">
            <div
               className="col-12 pt-1"
               style={{ backgroundColor: "rgb(238,77,45)", height: "37px" }}>
               <div className="row">
                  <div className="col-2"></div>
                  <div
                     className="col-8"
                     style={{ height: "120px", color: "white" }}>
                     <div className="row">
                        <div className="col-12" style={{ height: "30px" }}>
                           <div className="row">
                              <div className="col-6">
                                 <small style={{ marginRight: "10px" }}>
                                    {" "}
                                    <Link
                                       to={"/"}
                                       style={{
                                          textDecoration: "none",
                                          color: "white",
                                       }}>
                                       Trang Chủ
                                    </Link>{" "}
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
                                             className="dropdown-menu col"
                                             style={{
                                                backgroundColor:
                                                   "rgb(238,77,45)",
                                                border: "none",
                                                marginTop: "-10px",
                                             }}>
                                             <button className="nut_dropdown">
                                                <img
                                                   className="mr-1"
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
                                                   to={"/account"}
                                                   className="btn"
                                                   type={"submit"}>
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
                                                   type={"submit"}
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
                     </div>
                  </div>
                  <div className="col-2"></div>
               </div>
            </div>
         </div>
      </>
   );
}
