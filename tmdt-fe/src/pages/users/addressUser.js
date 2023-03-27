import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistricts, getProvinces } from "../../service/addressService";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import {
   createAddress,
   deleteAddress,
   editAddress,
   getAllAddress,
} from "../../service/addressUser";
import swal from "sweetalert";

export default function AddressUser() {
   const [province, setProvince] = useState("");
   const [district, setDistrict] = useState("");
   const { id } = useParams();
   const dispatch = useDispatch();
   const provinces = useSelector((state) => {
      return state.address.provinces;
   });
   const districts = useSelector((state) => {
      return state.address.districts;
   });
   const address = useSelector((state) => {
      if (state !== undefined) {
         return state.addresses.listAddress;
      }
   });
   const handleProvince = (value) => {
      for (let i of provinces) {
         if (i.province_name == value) {
            dispatch(getDistricts(i.province_id));
         }
      }
   };
   const handleEditAddress = async (values) => {
      await dispatch(editAddress(values)).then((check) => {
         if (check.payload === "success") {
            swal("Thêm địa chỉ mới thành công!");
            window.location.reload();
         }
      });
   };
   const handleAddress = async (values) => {
      let data = { ...values };
      data.province = province;
      data.district = district;
      data.idUser = id;
      await dispatch(createAddress(data)).then((check) => {
         if (check.payload === "success") {
            swal("Thêm địa chỉ mới thành công!");
            window.location.reload();
         }
      });
   };
   const handleDeleteAddress = async (values) => {
      await dispatch(deleteAddress(values)).then((check) => {
         if (check.payload === "success") {
            dispatch(getAllAddress(id)).then(() => {});
         }
      });
   };
   useEffect(() => {
      dispatch(getProvinces());
   }, []);
   useEffect(() => {
      dispatch(getAllAddress(id));
   }, []);

   return (
      <>
         <div className="row">
            <div className="col-12" style={{ width: "400px", height: "550px" }}>
               <div className="row">
                  <div
                     className="col-12"
                     style={{ width: "400px", height: "80px" }}>
                     <div className="row">
                        <div
                           className="col-6"
                           style={{ paddingTop: "26px", paddingLeft: "30px" }}>
                           <h5>Địa chỉ của tôi</h5>
                        </div>
                        <div
                           className="col-6"
                           style={{
                              paddingTop: "20px",
                              paddingLeft: "280px",
                           }}>
                           <button
                              type={"button"}
                              className="btn btn"
                              data-toggle="modal"
                              data-target="#staticBackdrop"
                              style={{
                                 width: "172px",
                                 height: "40px",
                                 backgroundColor: "rgb(238, 77, 45)",
                                 color: "white",
                                 border: "none",
                              }}>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 fill="currentColor"
                                 className="bi bi-plus-lg"
                                 viewBox="0 0 16 16"
                                 style={{
                                    marginBottom: "3px",
                                    color: "white",
                                 }}>
                                 <path
                                    fill-rule="evenodd"
                                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                 />
                              </svg>
                              Thêm địa chỉ mới
                           </button>
                           <Formik
                              initialValues={{
                                 idUser: "",
                                 receiver: "",
                                 phoneAddress: "",
                                 province: "",
                                 district: "",
                                 descriptionAddress: "",
                                 typeAddress: "",
                              }}
                              onSubmit={(values) => {
                                 handleAddress(values).then();
                              }}>
                              <Form>
                                 <div
                                    className="modal fade"
                                    id="staticBackdrop"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    tabIndex="-1"
                                    aria-labelledby="staticBackdropLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                       <div className="modal-content">
                                          <div className="modal-body">
                                             <div className="row">
                                                <div className="col-12">
                                                   <h4
                                                      className="modal-title"
                                                      id="exampleModalLabel">
                                                      Địa chỉ mới
                                                   </h4>
                                                </div>
                                                <div
                                                   className="col-12"
                                                   style={{
                                                      marginTop: "22px",
                                                      marginBottom: "20px",
                                                   }}>
                                                   <div className="row">
                                                      <div
                                                         className="col-6"
                                                         style={{
                                                            width: "100%",
                                                            height: "40px",
                                                         }}>
                                                         <Field
                                                            name={"receiver"}
                                                            type="text"
                                                            style={{
                                                               width: "95%",
                                                               height: "35px",
                                                               marginLeft:
                                                                  "10px",
                                                            }}
                                                            placeholder={
                                                               "Họ và tên"
                                                            }
                                                         />
                                                      </div>
                                                      <div
                                                         className="col-6"
                                                         style={{
                                                            width: "100%",
                                                            height: "40px",
                                                         }}>
                                                         <Field
                                                            name={
                                                               "phoneAddress"
                                                            }
                                                            type="text"
                                                            style={{
                                                               width: "95%",
                                                               height: "35px",
                                                            }}
                                                            placeholder={
                                                               "Số điện thoại"
                                                            }
                                                         />
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="col-12">
                                                   <div className="row">
                                                      <div
                                                         className="col-6"
                                                         style={{
                                                            marginTop: "-30px",
                                                            marginLeft: "-52px",
                                                         }}>
                                                         <div className="selectdiv">
                                                            <label>
                                                               <select
                                                                  onChange={(
                                                                     e
                                                                  ) => {
                                                                     handleProvince(
                                                                        e.target
                                                                           .value
                                                                     );
                                                                     setProvince(
                                                                        e.target
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
                                                            marginTop: "-30px",
                                                            marginLeft: "17px",
                                                         }}>
                                                         <div className="selectdiv1">
                                                            <label>
                                                               <select
                                                                  onChange={(
                                                                     e
                                                                  ) => {
                                                                     setDistrict(
                                                                        e.target
                                                                           .value
                                                                     );
                                                                  }}>
                                                                  <option value="">
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
                                                         "descriptionAddress"
                                                      }
                                                      style={{
                                                         width: "446px",
                                                         height: "60px",
                                                         marginTop: "-50px",
                                                         marginLeft: "10px",
                                                      }}
                                                      placeholder={
                                                         "Địa chỉ cụ thể"
                                                      }
                                                   />
                                                </div>
                                                <div
                                                   className="col-12"
                                                   style={{
                                                      marginTop: "30px",
                                                      marginLeft: "10px",
                                                   }}>
                                                   <p>Loại địa chỉ :</p>
                                                </div>
                                                <div
                                                   className="col-12"
                                                   style={{
                                                      marginTop: "10px",
                                                      marginLeft: "10px",
                                                   }}>
                                                   <div className="row">
                                                      <div className="clo-6">
                                                         <div className="wrapper">
                                                            <Field
                                                               type="radio"
                                                               name="typeAddress"
                                                               id="option-1"
                                                               value={
                                                                  "văn phòng"
                                                               }
                                                            />
                                                            <Field
                                                               type="radio"
                                                               name="typeAddress"
                                                               id="option-2"
                                                               value={
                                                                  "nhà riêng"
                                                               }
                                                            />
                                                            <label
                                                               htmlFor="option-1"
                                                               className="option option-1">
                                                               <div className="dot"></div>
                                                               <span>
                                                                  Văn phòng
                                                               </span>
                                                            </label>
                                                            <label
                                                               htmlFor="option-2"
                                                               className="option option-2">
                                                               <div className="dot"></div>
                                                               <span>
                                                                  Nhà riêng
                                                               </span>
                                                            </label>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="modal-footer">
                                             <button
                                                type="button"
                                                className="closeModal"
                                                data-dismiss="modal">
                                                {" "}
                                                Trở lại
                                             </button>
                                             <button
                                                type="submit"
                                                className="addModal">
                                                Hoàn thành
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </Form>
                           </Formik>
                        </div>
                     </div>
                  </div>
                  <div
                     className="col-12"
                     style={{
                        backgroundColor: "rgb(231, 229, 229)",
                        height: "1px",
                        width: "100%",
                        paddingTop: "-10px",
                     }}></div>
                  <div
                     className="col-11"
                     style={{ marginTop: "10px", marginLeft: "15px" }}>
                     <h5>Địa chỉ</h5>
                  </div>
                  <div
                     className="col-11"
                     style={{
                        marginTop: "10px",
                        height: "400px",
                        marginLeft: "15px",
                     }}>
                     {address !== undefined &&
                        address.map((item) => (
                           <>
                              <div className="row">
                                 <div className="col-6">
                                    <div className="row">
                                       <div className="col-12">
                                          <p>
                                             {item.fullName} |{" "}
                                             {item.phoneAddress}
                                          </p>
                                       </div>
                                       <div
                                          className="col-12"
                                          style={{
                                             marginTop: "-15px",
                                             color: "gray",
                                          }}>
                                          <p>{item.descriptionAddress}</p>
                                       </div>
                                       <div
                                          className="col-12"
                                          style={{
                                             marginTop: "-15px",
                                             color: "gray",
                                          }}>
                                          <p>
                                             {item.district}, {item.province}
                                          </p>
                                       </div>
                                       <div
                                          className="col-12"
                                          style={{
                                             marginTop: "-15px",
                                             color: "gray",
                                          }}>
                                          <div
                                             style={{
                                                border:
                                                   "1px rgb(238, 77, 45) solid",
                                                width: "80px",
                                                textAlign: "center",
                                                color: "rgb(238, 77, 45)",
                                             }}>
                                             <small>{item.typeAddress}</small>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-6">
                                    <div className="row">
                                       <div className="col-12">
                                          <div className="row">
                                             <div
                                                className="col-10"
                                                style={{ textAlign: "right" }}>
                                                <button
                                                   type="button"
                                                   class="btn btn-primary"
                                                   data-toggle="modal"
                                                   data-target={
                                                      "#exampleModal" +
                                                      item.idAddress
                                                   }>
                                                   Edit
                                                </button>
                                                <Formik
                                                   initialValues={item}
                                                   enableReinitialize={true}
                                                   onSubmit={(values) => {
                                                      handleEditAddress(
                                                         values
                                                      ).then();
                                                   }}>
                                                   <Form>
                                                      <div
                                                         class="modal fade"
                                                         id={
                                                            "exampleModal" +
                                                            item.idAddress
                                                         }
                                                         tabindex="-1"
                                                         role="dialog"
                                                         aria-labelledby="exampleModalLabel"
                                                         aria-hidden="true">
                                                         <div
                                                            class="modal-dialog"
                                                            role="document">
                                                            <div class="modal-content">
                                                               <div class="modal-header">
                                                                  <h5
                                                                     class="modal-title"
                                                                     id="exampleModalLabel">
                                                                     Edit địa
                                                                     chỉ
                                                                  </h5>
                                                                  <button
                                                                     type="button"
                                                                     class="close"
                                                                     data-dismiss="modal"
                                                                     aria-label="Close">
                                                                     <span aria-hidden="true">
                                                                        &times;
                                                                     </span>
                                                                  </button>
                                                               </div>
                                                               <div class="modal-body">
                                                                  <div
                                                                     className="col-12"
                                                                     style={{
                                                                        marginTop:
                                                                           "22px",
                                                                        marginBottom:
                                                                           "20px",
                                                                     }}>
                                                                     <div className="row">
                                                                        <div
                                                                           className="col-6"
                                                                           style={{
                                                                              width: "100%",
                                                                              height:
                                                                                 "40px",
                                                                           }}>
                                                                           <Field
                                                                              name={
                                                                                 "fullName"
                                                                              }
                                                                              type="text"
                                                                              style={{
                                                                                 width: "95%",
                                                                                 height:
                                                                                    "35px",
                                                                                 marginLeft:
                                                                                    "10px",
                                                                              }}
                                                                              placeholder={
                                                                                 "Họ và tên"
                                                                              }
                                                                           />
                                                                        </div>
                                                                        <div
                                                                           className="col-6"
                                                                           style={{
                                                                              width: "100%",
                                                                              height:
                                                                                 "40px",
                                                                           }}>
                                                                           <Field
                                                                              name={
                                                                                 "phoneAddress"
                                                                              }
                                                                              type="text"
                                                                              style={{
                                                                                 width: "95%",
                                                                                 height:
                                                                                    "35px",
                                                                              }}
                                                                              placeholder={
                                                                                 "Số điện thoại"
                                                                              }
                                                                           />
                                                                        </div>
                                                                     </div>
                                                                  </div>
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
                                                                                       {
                                                                                          item.province
                                                                                       }
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
                                                                                       {
                                                                                          item.district
                                                                                       }
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
                                                                           "descriptionAddress"
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
                                                                  <div
                                                                     className="col-12"
                                                                     style={{
                                                                        marginTop:
                                                                           "30px",
                                                                        textAlign:
                                                                           "left",
                                                                     }}>
                                                                     <p>
                                                                        Loại địa
                                                                        chỉ :
                                                                     </p>
                                                                  </div>
                                                                  <div
                                                                     className="col-12"
                                                                     style={{
                                                                        marginTop:
                                                                           "10px",
                                                                        marginLeft:
                                                                           "10px",
                                                                     }}>
                                                                     <div className="row">
                                                                        <div className="clo-6">
                                                                           <div className="wrapper">
                                                                              <Field
                                                                                 type="radio"
                                                                                 name="typeAddress"
                                                                                 id="option-1"
                                                                                 value={
                                                                                    "văn phòng"
                                                                                 }
                                                                              />
                                                                              <Field
                                                                                 type="radio"
                                                                                 name="typeAddress"
                                                                                 id="option-2"
                                                                                 value={
                                                                                    "nhà riêng"
                                                                                 }
                                                                              />
                                                                              <label
                                                                                 htmlFor="option-1"
                                                                                 className="option option-1">
                                                                                 <div className="dot"></div>
                                                                                 <span>
                                                                                    Văn
                                                                                    phòng
                                                                                 </span>
                                                                              </label>
                                                                              <label
                                                                                 htmlFor="option-2"
                                                                                 className="option option-2">
                                                                                 <div className="dot"></div>
                                                                                 <span>
                                                                                    Nhà
                                                                                    riêng
                                                                                 </span>
                                                                              </label>
                                                                           </div>
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                               <div class="modal-footer">
                                                                  <button
                                                                     type="button"
                                                                     class="btn btn-secondary"
                                                                     data-dismiss="modal">
                                                                     Close
                                                                  </button>
                                                                  <button
                                                                     type="submit"
                                                                     class="btn btn-primary">
                                                                     Save
                                                                     changes
                                                                  </button>
                                                               </div>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </Form>
                                                </Formik>
                                             </div>
                                             <div
                                                className="col-2"
                                                style={{ textAlign: "right" }}>
                                                <button
                                                   type={"button"}
                                                   style={{
                                                      backgroundColor: "red",
                                                      color: "white",
                                                      border: "none",
                                                      width: "50px",
                                                      height: "38px",
                                                      borderRadius: "5px",
                                                   }}
                                                   onClick={() => {
                                                      swal({
                                                         title: "Bạn chắc muốn xóa chứ ?",
                                                         text: "Khi xác nhận xóa bạn sẽ không thể quay lại được dữ liệu này nữa !",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                      }).then((willDelete) => {
                                                         if (willDelete) {
                                                            swal(
                                                               "Xóa thành công",
                                                               {
                                                                  icon: "success",
                                                               }
                                                            ).then(() => {
                                                               handleDeleteAddress(
                                                                  item.idAddress
                                                               ).then();
                                                            });
                                                         } else {
                                                            swal(
                                                               "Hủy quá trình xóa"
                                                            );
                                                         }
                                                      });
                                                   }}>
                                                   Xóa
                                                </button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </>
                        ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
