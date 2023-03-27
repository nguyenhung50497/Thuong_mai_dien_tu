import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../upload/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransport } from "../../service/transportService";
import { date } from "yup";
import { createShop, editShop, findByIdShop } from "../../service/shopService";
import swal from "sweetalert";
import { getDistricts, getProvinces } from "../../service/addressService";
import Login from "../auth/login";

export default function EditShop() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [province, setProvince] = useState("");
   const [district, setDistrict] = useState("");
   const [file1, setFile] = useState("");
   const [url1, setUrl] = useState("");
   const [percent, setPercent] = useState(0);
   const [check, setCheck] = useState("1");
   const [shop, setShop] = useState();
   const [transportShop, setTransportShop] = useState(2);
   const handleUpload = (event) => {
      setFile(event.target.files[0]);
      const storageRef = ref(storage, `/files/${file1.name}`);
      const uploadTask1 = uploadBytesResumable(storageRef, file1);
      uploadTask1.on(
         "state_changed",
         (snapshot) => {
            const percent = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
         },
         (err) => console.log(err),
         () => {
            getDownloadURL(uploadTask1.snapshot.ref).then((url) => {
               setUrl(url);
            });
         }
      );
   };
   const profile = useSelector((state) => {
      if (state !== undefined) {
         return state.users.user.user;
      }
   });
   const transport = useSelector((state) => {
      if (state !== undefined) {
         return state.transports.transports;
      }
   });
   const informationShop = (values) => {
      let data = { ...values };
      data.imageShop = url1;
      if (profile !== undefined) {
         if (profile.phoneUser === "") {
            swal("bạn phải thêm số điện thoại cho shop");
         } else {
            data.phoneShop = profile.phoneUser;
            data.emailShop = profile.emailUser;
            if (district !== "" && province !== "") {
            data.addressShop =
               data.descriptionShop + "-" + district + "-" + province;
            }
            setShop(data);
            setCheck("2");
         }
      }
   };
   const addTransport = (values) => {
      setTransportShop(values);
   };

   const handleShop = () => {
      let data = { ...shop };
      if (profile !== undefined) {
         data.idUser = profile.idUser;
      }
      data.idTransport = transportShop;
      dispatch(editShop(data)).then((check) => {
         if (check.payload === "success") {
            swal("Chỉnh sửa cửa hàng thành công");
            navigate(`/shopInterface/${id}`);
         }
      });
   };
   const provinces = useSelector((state) => {
      return state.address.provinces;
   });
   const districts = useSelector((state) => {
      return state.address.districts;
   });
   const shopProfile = useSelector((state) => {
      if (state !== undefined) {
         return state.shops.shop;
      }
   });

   const handleProvince = (value) => {
      for (let i of provinces) {
         if (i.province_name == value) {
            dispatch(getDistricts(i.province_id));
         }
      }
   };
   useEffect(() => {
      dispatch(getProvinces());
   }, []);
   useEffect(() => {
      dispatch(getAllTransport());
   }, []);
   useEffect(() => {
      dispatch(findByIdShop(id)).then((e) => {
         setUrl(e.payload.imageShop);
      });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);
   return (
      <>
         <div className="row">
            <div className="col-12">
               <div className="row">
                  {check === "1" ? (
                     <>
                        <div
                           className="col-12"
                           style={{ marginTop: "20px", marginLeft: "20px" }}>
                           <h5>Tạo cửa hàng của bạn</h5>
                        </div>
                        <div className="col-12" style={{ marginLeft: "20px" }}>
                           <small>Cài đặt thông tin cửa hàng</small>
                        </div>
                        <div className="col-12">
                           <hr />
                        </div>
                        <Formik
                           initialValues={{
                              idShop: shopProfile.idShop,
                              nameShop: shopProfile.nameShop,
                              addressShop: shopProfile.addressShop,
                              emailShop: shopProfile.emailShop,
                              phoneShop: shopProfile.phoneShop,
                              descriptionShop: shopProfile.descriptionShop,
                              imageShop: shopProfile.imageShop,
                              idTransport: shopProfile.idTransport,
                              idUser: shopProfile.idUser,
                           }}
                           enableReinitialize={true}
                           onSubmit={(values) => {
                              informationShop(values);
                           }}>
                           <Form>
                              <div className="col-12">
                                 <div className="row">
                                    <div
                                       className="col-2"
                                       style={{
                                          height: "420px",
                                          textAlign: "right",
                                       }}>
                                       <div className="row">
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "35px" }}>
                                             <p>Tên shop</p>
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "35px" }}>
                                             <p>Địa chỉ lấy hàng :</p>
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "30px" }}>
                                             <p>Email</p>
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "30px" }}>
                                             <p>Số điện thoại</p>
                                          </div>
                                       </div>
                                    </div>
                                    <div
                                       className="col-7"
                                       style={{
                                          height: "420px",
                                          textAlign: "left",
                                       }}>
                                       <div className="row">
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "30px" }}>
                                             <Field
                                                type="text"
                                                name={"nameShop"}
                                                style={{
                                                   width: "100%",
                                                   height: "40px",
                                                   borderRadius: "10px",
                                                }}
                                             />
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{
                                                marginTop: "30px",
                                             }}>
                                             <div className="row">
                                                <div
                                                   className="col-7 pl-1 pt-2 pb-2 ml-3"
                                                   style={{
                                                      border: "2px solid black",
                                                      borderRadius: "10px",
                                                   }}>
                                                   <span>
                                                      {province == "" &&
                                                      district == ""
                                                         ? shopProfile.addressShop
                                                         : district + "-" + province}
                                                   </span>
                                                </div>
                                                <div className="col-4">
                                                   <button
                                                      type="button"
                                                      className="btn btn-danger ml-5"
                                                      data-toggle="modal"
                                                      data-target={
                                                         "#exampleModal"
                                                      }>
                                                      Sửa địa chỉ
                                                   </button>
                                                   <div
                                                      className="modal fade"
                                                      id={"exampleModal"}
                                                      tabIndex="-1"
                                                      role="dialog"
                                                      aria-labelledby="exampleModalLabel"
                                                      aria-hidden="true">
                                                      <div
                                                         className="modal-dialog"
                                                         role="document">
                                                         <div className="modal-content">
                                                            <div className="modal-header">
                                                               <h5
                                                                  className="modal-title"
                                                                  id="exampleModalLabel">
                                                                  Thêm địa chỉ
                                                                  cho shop
                                                               </h5>
                                                               <button
                                                                  type="button"
                                                                  className="close"
                                                                  data-dismiss="modal"
                                                                  aria-label="Close">
                                                                  <span aria-hidden="true">
                                                                     &times;
                                                                  </span>
                                                               </button>
                                                            </div>
                                                            <div className="modal-body">
                                                               <div className="col-12">
                                                                  <div className="row">
                                                                     <div
                                                                        className="col-6"
                                                                        style={{
                                                                           marginTop:
                                                                              "-30px",
                                                                           marginLeft:
                                                                              "-52px",
                                                                        }}>
                                                                        <div className="selectdiv">
                                                                           <label>
                                                                              <select
                                                                                 onChange={(
                                                                                    e
                                                                                 ) => {
                                                                                    handleProvince(
                                                                                       e
                                                                                          .target
                                                                                          .value
                                                                                    );
                                                                                    setProvince(
                                                                                       e
                                                                                          .target
                                                                                          .value
                                                                                    );
                                                                                 }}>
                                                                                 <option
                                                                                    value=""
                                                                                    selected>
                                                                                    Chọn
                                                                                    Tỉnh/Thành
                                                                                    Phố
                                                                                 </option>
                                                                                 {provinces &&
                                                                                    provinces.map(
                                                                                       (
                                                                                          item,
                                                                                          key
                                                                                       ) => (
                                                                                          <>
                                                                                             <option
                                                                                                value={
                                                                                                   item.province_name
                                                                                                }>
                                                                                                {
                                                                                                   item.province_name
                                                                                                }
                                                                                             </option>
                                                                                          </>
                                                                                       )
                                                                                    )}
                                                                              </select>
                                                                           </label>
                                                                        </div>
                                                                     </div>
                                                                     <div
                                                                        className="col-6"
                                                                        style={{
                                                                           marginTop:
                                                                              "-30px",
                                                                           marginLeft:
                                                                              "-5px",
                                                                        }}>
                                                                        <div className="selectdiv1">
                                                                           <label>
                                                                              <select
                                                                                 onChange={(
                                                                                    e
                                                                                 ) => {
                                                                                    setDistrict(
                                                                                       e
                                                                                          .target
                                                                                          .value
                                                                                    );
                                                                                 }}>
                                                                                 <option
                                                                                    value=""
                                                                                    selected>
                                                                                    Chọn
                                                                                    Quận/Huyện
                                                                                 </option>
                                                                                 {districts &&
                                                                                    districts.map(
                                                                                       (
                                                                                          item,
                                                                                          key
                                                                                       ) => (
                                                                                          <>
                                                                                             <option
                                                                                                value={
                                                                                                   item.district_name
                                                                                                }>
                                                                                                {
                                                                                                   item.district_name
                                                                                                }
                                                                                             </option>
                                                                                          </>
                                                                                       )
                                                                                    )}
                                                                              </select>
                                                                           </label>
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                               <div className="col-12">
                                                                  <Field
                                                                     type="text"
                                                                     name={
                                                                        "descriptionShop"
                                                                     }
                                                                     style={{
                                                                        width: "430px",
                                                                        height:
                                                                           "60px",
                                                                        marginTop:
                                                                           "-50px",
                                                                        marginLeft:
                                                                           "5px",
                                                                     }}
                                                                     placeholder={
                                                                        "Địa chỉ cụ thể"
                                                                     }
                                                                  />
                                                               </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                               <button
                                                                  type="button"
                                                                  className="btn btn-secondary"
                                                                  data-dismiss="modal">
                                                                  Đóng
                                                               </button>
                                                               <button
                                                                  type="button"
                                                                  data-dismiss="modal"
                                                                  className="btn btn-primary">
                                                                  Lưu
                                                               </button>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "35px" }}>
                                             <Field
                                                type="gmail"
                                                name={"emailShop"}
                                                style={{
                                                   width: "100%",
                                                   height: "40px",
                                                   borderRadius: "10px",
                                                }}
                                                readOnly={true}
                                             />
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "30px" }}>
                                             <Field
                                                type="text"
                                                name={"phoneShop"}
                                                style={{
                                                   width: "100%",
                                                   height: "40px",
                                                   borderRadius: "10px",
                                                }}
                                                readOnly={true}
                                             />
                                             <small>
                                                Nếu muốn đổi số điện thoại và
                                                email, bạn vui lòng chỉnh sửa
                                                tại{" "}
                                                <Link
                                                   to={"/account"}
                                                   style={{
                                                      textDecoration: "none",
                                                   }}>
                                                   "Hồ sơ của tôi"
                                                </Link>{" "}
                                                ở trang chủ HNH sau khi hoàn tất
                                                quá trình đăng ký
                                             </small>
                                          </div>
                                          <div
                                             className="col-12"
                                             style={{ marginTop: "30px" }}>
                                             <button
                                                type={"submit"}
                                                style={{
                                                   width: "70px",
                                                   height: "40px",
                                                   backgroundColor:
                                                      "rgb(238,77,45)",
                                                   color: "white",
                                                   border: "none",
                                                   borderRadius: "5px",
                                                }}>
                                                Lưu
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-3">
                                       <div
                                          className="col-12"
                                          style={{
                                             marginLeft: "20px",
                                             marginTop: "50px",
                                          }}>
                                          <img
                                             src={url1}
                                             alt=""
                                             width={"100px"}
                                             height={"100px"}
                                             style={{ borderRadius: "100%" }}
                                          />
                                       </div>
                                       <div className="col-12">
                                          <span
                                             className="btn btn btn-file"
                                             style={{
                                                backgroundColor: "white",
                                                border: "1px darkgray solid",
                                                marginLeft: "20px",
                                                marginTop: "10px",
                                             }}>
                                             Chọn ảnh
                                             <input
                                                type="file"
                                                onMouseOut={handleUpload}
                                             />
                                          </span>
                                       </div>
                                       <div
                                          className="col-12"
                                          style={{
                                             marginLeft: "-10px",
                                             marginTop: "10px",
                                          }}>
                                          <small>
                                             Dụng lượng file tối đa 1 MB Định
                                             dạng:.JPEG, .PNG
                                          </small>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </Form>
                        </Formik>
                     </>
                  ) : check === "2" ? (
                     <>
                        <div
                           className="col-12"
                           style={{ marginTop: "20px", marginLeft: "20px" }}>
                           <h5>Đơn vị vận chuyển</h5>
                        </div>
                        <div className="col-12" style={{ marginLeft: "20px" }}>
                           <small>
                              Chọn đơn vị vận chuyển phù hợp cho shop của bạn
                           </small>
                        </div>
                        <div className="col-12">
                           <hr />
                        </div>
                        <div className="col-12" style={{ marginTop: "10px" }}>
                           <div className="row">
                              <div
                                 className="col-6"
                                 style={{
                                    paddingLeft: "200px",
                                    color: "rgb(238,77,45)",
                                 }}>
                                 <h2>Đơn vị vận chuyển</h2>
                              </div>
                           </div>
                        </div>
                        {transport !== undefined &&
                           transport.map((item) => (
                              <>
                                 <div
                                    className="col-12"
                                    style={{ marginTop: "10px" }}>
                                    <div className="row">
                                       <div
                                          className="col-6"
                                          style={{ paddingLeft: "200px" }}>
                                          <h4>{item.nameTransport}</h4>
                                       </div>
                                       <div
                                          className="col-6"
                                          style={{ textAlign: "center" }}>
                                          <div className="check-box">
                                             {item.idTransport ===
                                             shopProfile.idTransport ? (
                                                <input
                                                   type="checkbox"
                                                   onClick={() =>
                                                      addTransport(
                                                         item.idTransport
                                                      )
                                                   }
                                                   checked
                                                />
                                             ) : (
                                                <input
                                                   type="checkbox"
                                                   onClick={() =>
                                                      addTransport(
                                                         item.idTransport
                                                      )
                                                   }
                                                />
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </>
                           ))}
                        <div
                           className="col-12"
                           style={{ marginTop: "30px", paddingLeft: "450px" }}>
                           <button
                              type={"submit"}
                              onClick={handleShop}
                              style={{
                                 width: "100px",
                                 height: "60px",
                                 backgroundColor: "rgb(238,77,45)",
                                 color: "white",
                                 border: "none",
                                 borderRadius: "5px",
                              }}>
                              Hoàn thành
                           </button>
                        </div>
                     </>
                  ) : (
                     <></>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}
