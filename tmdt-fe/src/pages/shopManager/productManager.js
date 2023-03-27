import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import {
   deleteProduct,
   getProductByIdShop,
} from "../../service/productService";
import { Formik, Form, Field } from "formik";
import {
   createVoucher,
   deleteVoucher,
   editVoucher,
   getAllVouchers,
} from "../../service/voucherService";

export default function ProductManager() {
   const { id } = useParams();
   const [page, setPage] = useSearchParams();
   const page1 = page.get("page") || 1;
   const [check, setCheck] = useState(0);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const products = useSelector((state) => {
      return state.products.products.products;
   });
   const count = useSelector((state) => {
      return state.products.products.count;
   });
   const loading = useSelector((state) => state.products.loading);
   const totalPages = useSelector((state) => {
      if (state.products.products !== undefined) {
         return state.products.products.totalPage;
      }
   });
   const vouchers = useSelector((state) => {
      if (state.vouchers.vouchers) {
         return state.vouchers.vouchers;
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
   const handleAddVoucher = (values) => {
      let dayStart = new Date(values.dayStart);
      let dayEnd = new Date(values.dayEnd);
      if (dayStart >= dayEnd) {
         swal({
            title: "Thời gian bắt đầu không hợp lệ",
            icon: "error",
            button: "Đóng",
         });
      } else {
         dispatch(createVoucher(values)).then((e) => {
            if (e.payload === "Không hợp lệ") {
               swal({
                  title: "Thời gian bắt đầu không hợp lệ",
                  icon: "error",
                  button: "Đóng",
               });
            } else {
               swal({
                  title: "Thành công!",
                  text: "Tạo voucher thành công",
                  icon: "success",
                  button: "Đóng",
               });
            }
         });
      }
   };
   const handleEditVoucher = (values) => {
      let dayStart = new Date(values.dayStart);
      let dayEnd = new Date(values.dayEnd);
      if (dayStart >= dayEnd) {
         swal({
            title: "Thời gian bắt đầu không hợp lệ",
            icon: "error",
            button: "Đóng",
         });
         dispatch(getAllVouchers());
      } else {
         dispatch(editVoucher(values)).then((e) => {
            if (e.payload === "Không hợp lệ") {
               swal({
                  title: "Thời gian bắt đầu không hợp lệ",
                  icon: "error",
                  button: "Đóng",
               });
            } else {
               swal({
                  title: "Thành công!",
                  text: "Cập nhật voucher thành công",
                  icon: "success",
                  button: "Đóng",
               });
            }
         });
      }
   };
   useEffect(() => {
      dispatch(getProductByIdShop({ idShop: id, page: 1 }));
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);
   useEffect(() => {
      dispatch(getAllVouchers());
   }, []);
   return (
      <>
         {products && (
            <>
               <div
                  className="col-8 p-3 pl-5 bg-light"
                  style={{ marginLeft: "-1px" }}>
                  <div
                     style={{
                        height: "70px",
                        borderBottom: "1px solid rgb(231, 229, 229)",
                     }}>
                     <div
                        className="mt-2 ml-4"
                        style={{ float: "left", width: "20%" }}>
                        <h2>{count} Sản Phẩm</h2>
                     </div>
                     <div
                        className="mr-3"
                        style={{ float: "right", width: "20%" }}>
                        <Link
                           to={`/create-product/${id}`}
                           style={{ textDecoration: "none" }}>
                           <button className="add-product pl-3 pr-3">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="30"
                                 height="30"
                                 fill="currentColor"
                                 class="bi bi-plus"
                                 viewBox="0 0 16 16">
                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                              Thêm Sản Phẩm Mới
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div className="mt-5 row">
                     <div className="col-12 w-100">
                        <table className="table">
                           <thead className="thead-light">
                              <tr>
                                 <th>#</th>
                                 <th>Sản Phẩm</th>
                                 <th>Danh Mục</th>
                                 <th>Giá</th>
                                 <th>Số Lượng</th>
                                 <th>Đã Bán</th>
                                 <th>Thao Tác</th>
                              </tr>
                           </thead>
                           <tbody>
                              {products.map((item, key) => (
                                 <>
                                    <tr>
                                       <td style={{ width: "1%" }}>
                                          {key + 1}
                                       </td>
                                       <td style={{ width: "40%" }}>
                                          <div className="row">
                                             <div className="col-4 pl-5">
                                                <img
                                                   src={item.image}
                                                   alt=""
                                                   style={{
                                                      width: "80px",
                                                      height: "80px",
                                                      borderRadius: "10%",
                                                   }}
                                                />
                                             </div>
                                             <div className="col-8 text-left">
                                                <p
                                                   className="d-block ml-2 mb-1 mt-1 text-dark"
                                                   style={{
                                                      fontSize: "15px",
                                                   }}>
                                                   {item.nameProduct}
                                                </p>
                                                {vouchers &&
                                                   vouchers.map((it, key) => (
                                                      <div className="col-12">
                                                         {it.idProduct ===
                                                            item.idProduct && (
                                                            <>
                                                               <span
                                                                  style={{
                                                                     fontSize:
                                                                        "14px",
                                                                     color: "red",
                                                                  }}>
                                                                  {
                                                                     it.valueVoucher
                                                                  }
                                                                  %{" "}
                                                               </span>
                                                               <span
                                                                  style={{
                                                                     fontSize:
                                                                        "12px",
                                                                  }}>
                                                                  Từ{" "}
                                                               </span>
                                                               <span
                                                                  style={{
                                                                     fontSize:
                                                                        "14px",
                                                                     color: "orange",
                                                                  }}>
                                                                  {it.dayStart}
                                                               </span>
                                                               <span
                                                                  style={{
                                                                     fontSize:
                                                                        "12px",
                                                                  }}>
                                                                  {" "}
                                                                  Đến{" "}
                                                               </span>
                                                               <span
                                                                  style={{
                                                                     fontSize:
                                                                        "14px",
                                                                     color: "orange",
                                                                  }}>
                                                                  {it.dayEnd}{" "}
                                                               </span>
                                                               <span
                                                                  className="btn p-0 m-0"
                                                                  style={{
                                                                     color: "gray",
                                                                  }}
                                                                  onClick={() => {
                                                                     swal({
                                                                        title: "Bạn có chắc chắn?",
                                                                        text: "Xoá khuyến mại này",
                                                                        icon: "warning",
                                                                        buttons: true,
                                                                        dangerMode: true,
                                                                     }).then(
                                                                        (
                                                                           willDelete
                                                                        ) => {
                                                                           if (
                                                                              willDelete
                                                                           ) {
                                                                              dispatch(
                                                                                 deleteVoucher(
                                                                                    it.idVoucher
                                                                                 )
                                                                              ).then(
                                                                                 () => {
                                                                                    navigate(
                                                                                       `/shop-manager/${id}`
                                                                                    );
                                                                                 }
                                                                              );
                                                                              swal(
                                                                                 "Khuyến mại đã được xoá!",
                                                                                 {
                                                                                    icon: "success",
                                                                                 }
                                                                              );
                                                                           } else {
                                                                              swal(
                                                                                 "Đã huỷ xoá!"
                                                                              );
                                                                           }
                                                                        }
                                                                     );
                                                                  }}>
                                                                  <svg
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     width="14"
                                                                     height="14"
                                                                     fill="currentColor"
                                                                     class="bi bi-x-square"
                                                                     viewBox="0 0 16 16"
                                                                     style={{
                                                                        marginTop:
                                                                           "-6px",
                                                                     }}>
                                                                     <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                     <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                  </svg>
                                                               </span>
                                                               <span
                                                                  className="btn p-0 m-0"
                                                                  data-toggle="modal"
                                                                  data-target={
                                                                     "#editVoucher" +
                                                                     it.idVoucher
                                                                  }
                                                                  style={{
                                                                     color: "green",
                                                                  }}>
                                                                  <svg
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     width="14"
                                                                     height="14"
                                                                     fill="currentColor"
                                                                     class="bi bi-pencil-square"
                                                                     viewBox="0 0 16 16"
                                                                     style={{
                                                                        marginTop:
                                                                           "-6px",
                                                                     }}>
                                                                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                     <path
                                                                        fill-rule="evenodd"
                                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                                     />
                                                                  </svg>
                                                               </span>

                                                               <div
                                                                  class="modal fade"
                                                                  id={
                                                                     "editVoucher" +
                                                                     it.idVoucher
                                                                  }
                                                                  tabindex="-1"
                                                                  aria-labelledby="exampleModalLabel"
                                                                  aria-hidden="true">
                                                                  <div class="modal-dialog modal-lg">
                                                                     <div class="modal-content">
                                                                        <Formik
                                                                           initialValues={{
                                                                              idVoucher:
                                                                                 it.idVoucher,
                                                                              valueVoucher:
                                                                                 it.valueVoucher,
                                                                              dayStart:
                                                                                 it.dayStart,
                                                                              dayEnd:
                                                                                 it.dayEnd,
                                                                              idProduct:
                                                                                 it.idProduct,
                                                                           }}
                                                                           onSubmit={(
                                                                              values
                                                                           ) => {
                                                                              handleEditVoucher(
                                                                                 values
                                                                              );
                                                                           }}
                                                                           enableReinitialize={
                                                                              true
                                                                           }>
                                                                           <Form>
                                                                              <div class="modal-header">
                                                                                 <h5
                                                                                    class="modal-title"
                                                                                    id="exampleModalLabel"
                                                                                    style={{
                                                                                       color: "orange",
                                                                                       fontSize:
                                                                                          "36px",
                                                                                    }}>
                                                                                    {
                                                                                       item.nameProduct
                                                                                    }
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
                                                                                 <div class="form-group">
                                                                                    <div className="row">
                                                                                       <div className="col-4"></div>
                                                                                       <div className="col-4">
                                                                                          <div class="input-group">
                                                                                             <div class="input-group-prepend">
                                                                                                <div class="input-group-text">
                                                                                                   Giá
                                                                                                   hiện
                                                                                                   tại
                                                                                                </div>
                                                                                             </div>
                                                                                             <p
                                                                                                type="text"
                                                                                                class="form-control text-danger"
                                                                                                id="inlineFormInputGroupUsername">
                                                                                                <span
                                                                                                   style={{
                                                                                                      fontSize:
                                                                                                         "12px",
                                                                                                      textDecoration:
                                                                                                         "underline",
                                                                                                   }}>
                                                                                                   đ
                                                                                                </span>{" "}
                                                                                                <span>
                                                                                                   {item.price &&
                                                                                                      formatCurrency(
                                                                                                         item.price
                                                                                                      )}
                                                                                                </span>
                                                                                             </p>
                                                                                          </div>
                                                                                       </div>
                                                                                       <div className="col-4"></div>
                                                                                    </div>
                                                                                    <div className="row mt-3">
                                                                                       <div className="col-2"></div>
                                                                                       <div className="col-8">
                                                                                          <div class="input-group">
                                                                                             <div class="input-group-prepend">
                                                                                                <div class="input-group-text">
                                                                                                   Giá
                                                                                                   trị
                                                                                                   voucher
                                                                                                </div>
                                                                                             </div>
                                                                                             <Field
                                                                                                type="number"
                                                                                                name={
                                                                                                   "valueVoucher"
                                                                                                }
                                                                                                class="form-control"
                                                                                                id="valueVoucher"
                                                                                             />
                                                                                             <div class="input-group-append">
                                                                                                <div class="input-group-text">
                                                                                                   %
                                                                                                </div>
                                                                                             </div>
                                                                                          </div>
                                                                                       </div>
                                                                                       <div className="col-2"></div>
                                                                                    </div>
                                                                                    <div className="row mt-3">
                                                                                       <div class="col-6 my-1">
                                                                                          <div class="input-group">
                                                                                             <div class="input-group-prepend">
                                                                                                <div class="input-group-text">
                                                                                                   Ngày
                                                                                                   bắt
                                                                                                   đầu
                                                                                                </div>
                                                                                             </div>
                                                                                             <Field
                                                                                                type="date"
                                                                                                name={
                                                                                                   "dayStart"
                                                                                                }
                                                                                                class="form-control"
                                                                                                id="inlineFormInputGroupUsername"
                                                                                             />
                                                                                          </div>
                                                                                       </div>
                                                                                       <div class="col-6 my-1">
                                                                                          <div class="input-group">
                                                                                             <div class="input-group-prepend">
                                                                                                <div class="input-group-text">
                                                                                                   Ngày
                                                                                                   kết
                                                                                                   thúc
                                                                                                </div>
                                                                                             </div>
                                                                                             <Field
                                                                                                type="date"
                                                                                                name={
                                                                                                   "dayEnd"
                                                                                                }
                                                                                                class="form-control"
                                                                                                id="inlineFormInputGroupUsername"
                                                                                             />
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
                                                                                    Đóng
                                                                                 </button>
                                                                                 <button
                                                                                    type="submit"
                                                                                    class="btn btn-danger">
                                                                                    Cập
                                                                                    nhật
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
                                                   ))}
                                             </div>
                                          </div>
                                       </td>
                                       <td
                                          style={{
                                             width: "11%",
                                             textAlign: "left",
                                          }}>
                                          {item.nameCategory}
                                       </td>
                                       <td
                                          className="text-danger"
                                          style={{ width: "15%" }}>
                                          <span
                                             style={{
                                                fontSize: "12px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          {item.price &&
                                             formatCurrency(item.price)}
                                       </td>
                                       <td style={{ width: "8%" }}>
                                          {item.quantity < 1000 && (
                                             <>{item.quantity}</>
                                          )}
                                          {item.quantity >= 1000 && (
                                             <>
                                                {(item.quantity / 1000).toFixed(
                                                   1
                                                )}
                                                k
                                             </>
                                          )}
                                       </td>
                                       <td style={{ width: "7%" }}>
                                          {item.sold < 1000 && <>{item.sold}</>}
                                          {item.sold >= 1000 && (
                                             <>
                                                {(item.sold / 1000).toFixed(1)}k
                                             </>
                                          )}
                                       </td>
                                       <th style={{ width: "14%" }}>
                                          <div className="row mt-1">
                                             <div className="col-5 p-0">
                                                <span
                                                   className="btn p-0"
                                                   style={{
                                                      textDecoration: "none",
                                                      color: "blue",
                                                      fontWeight: "bold",
                                                   }}
                                                   onClick={() => {
                                                      navigate(
                                                         `/edit-product/${item.idProduct}`
                                                      );
                                                      window.scrollTo({
                                                         top: 255,
                                                         left: 0,
                                                         behavior: "smooth",
                                                      });
                                                   }}>
                                                   Cập nhật
                                                </span>
                                             </div>
                                             <div className="col-5 p-0">
                                                <span
                                                   className="btn text-danger p-0"
                                                   style={{
                                                      fontWeight: "bold",
                                                   }}
                                                   onClick={() => {
                                                      swal({
                                                         title: "Bạn có chắc chắn?",
                                                         text: "Xoá sản phẩm này",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                      }).then((willDelete) => {
                                                         if (willDelete) {
                                                            dispatch(
                                                               deleteProduct(
                                                                  item.idProduct
                                                               )
                                                            ).then(() => {
                                                               dispatch(
                                                                  getProductByIdShop(
                                                                     {
                                                                        idShop:
                                                                           id,
                                                                        page: 1,
                                                                     }
                                                                  )
                                                               ).then(() => {
                                                                  navigate(
                                                                     `/shop-manager/${id}`
                                                                  );
                                                               });
                                                            });
                                                            swal(
                                                               "Sản phẩm đã được xoá!",
                                                               {
                                                                  icon: "success",
                                                               }
                                                            );
                                                         } else {
                                                            swal("Đã huỷ xoá!");
                                                         }
                                                      });
                                                   }}>
                                                   Xoá
                                                </span>
                                             </div>
                                             <div
                                                className="col-5 p-0 "
                                                style={{
                                                   marginTop: "6px",
                                                }}>
                                                <span
                                                   className="text-success p-0"
                                                   onClick={() => {
                                                      navigate(
                                                         `/product-detail/${item.idProduct}`
                                                      );
                                                   }}>
                                                   Chi tiết
                                                </span>
                                             </div>
                                             <div className="col-5 p-0 mt-1">
                                                <span
                                                   className="btn p-0"
                                                   data-toggle="modal"
                                                   data-target={
                                                      "#addVoucher" +
                                                      item.idProduct
                                                   }
                                                   style={{
                                                      color: "orange",
                                                      fontWeight: "bold",
                                                   }}>
                                                   Thêm KM
                                                </span>
                                                <div
                                                   class="modal fade"
                                                   id={
                                                      "addVoucher" +
                                                      item.idProduct
                                                   }
                                                   tabindex="-1"
                                                   aria-labelledby="exampleModalLabel"
                                                   aria-hidden="true">
                                                   <div class="modal-dialog modal-lg">
                                                      <div class="modal-content">
                                                         <Formik
                                                            initialValues={{
                                                               valueVoucher: "",
                                                               dayStart: "",
                                                               dayEnd: "",
                                                               idProduct:
                                                                  item.idProduct,
                                                            }}
                                                            onSubmit={(
                                                               values
                                                            ) => {
                                                               handleAddVoucher(
                                                                  values
                                                               );
                                                            }}>
                                                            <Form>
                                                               <div class="modal-header">
                                                                  <h5
                                                                     class="modal-title"
                                                                     id="exampleModalLabel"
                                                                     style={{
                                                                        color: "orange",
                                                                        fontSize:
                                                                           "36px",
                                                                     }}>
                                                                     {
                                                                        item.nameProduct
                                                                     }
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
                                                                  <div class="form-group">
                                                                     <div className="row">
                                                                        <div className="col-4"></div>
                                                                        <div className="col-4">
                                                                           <div class="input-group">
                                                                              <div class="input-group-prepend">
                                                                                 <div class="input-group-text">
                                                                                    Giá
                                                                                    hiện
                                                                                    tại
                                                                                 </div>
                                                                              </div>
                                                                              <p
                                                                                 type="text"
                                                                                 class="form-control text-danger"
                                                                                 id="inlineFormInputGroupUsername">
                                                                                 <span
                                                                                    style={{
                                                                                       fontSize:
                                                                                          "12px",
                                                                                       textDecoration:
                                                                                          "underline",
                                                                                    }}>
                                                                                    đ
                                                                                 </span>{" "}
                                                                                 <span>
                                                                                    {item.price &&
                                                                                       formatCurrency(
                                                                                          item.price
                                                                                       )}
                                                                                 </span>
                                                                              </p>
                                                                           </div>
                                                                        </div>
                                                                        <div className="col-4"></div>
                                                                     </div>
                                                                     <div className="row mt-3">
                                                                        <div className="col-2"></div>
                                                                        <div className="col-8">
                                                                           <div class="input-group">
                                                                              <div class="input-group-prepend">
                                                                                 <div class="input-group-text">
                                                                                    Giá
                                                                                    trị
                                                                                    voucher
                                                                                 </div>
                                                                              </div>
                                                                              <Field
                                                                                 type="number"
                                                                                 name={
                                                                                    "valueVoucher"
                                                                                 }
                                                                                 class="form-control"
                                                                                 id="valueVoucher"
                                                                              />
                                                                              <div class="input-group-append">
                                                                                 <div class="input-group-text">
                                                                                    %
                                                                                 </div>
                                                                              </div>
                                                                           </div>
                                                                        </div>
                                                                        <div className="col-2"></div>
                                                                     </div>
                                                                     <div className="row mt-3">
                                                                        <div class="col-6 my-1">
                                                                           <div class="input-group">
                                                                              <div class="input-group-prepend">
                                                                                 <div class="input-group-text">
                                                                                    Ngày
                                                                                    bắt
                                                                                    đầu
                                                                                 </div>
                                                                              </div>
                                                                              <Field
                                                                                 type="date"
                                                                                 name={
                                                                                    "dayStart"
                                                                                 }
                                                                                 class="form-control"
                                                                                 id="inlineFormInputGroupUsername"
                                                                              />
                                                                           </div>
                                                                        </div>
                                                                        <div class="col-6 my-1">
                                                                           <div class="input-group">
                                                                              <div class="input-group-prepend">
                                                                                 <div class="input-group-text">
                                                                                    Ngày
                                                                                    kết
                                                                                    thúc
                                                                                 </div>
                                                                              </div>
                                                                              <Field
                                                                                 type="date"
                                                                                 name={
                                                                                    "dayEnd"
                                                                                 }
                                                                                 class="form-control"
                                                                                 id="inlineFormInputGroupUsername"
                                                                              />
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
                                                                     Đóng
                                                                  </button>
                                                                  <button
                                                                     type="submit"
                                                                     class="btn btn-danger">
                                                                     Thêm
                                                                  </button>
                                                               </div>
                                                            </Form>
                                                         </Formik>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </th>
                                    </tr>
                                 </>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div className="col-2"></div>
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
                                          `/shop-manager/${id}?page=` +
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
                                          `/shop-manager/${id}?page=` +
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
            </>
         )}
      </>
   );
}
