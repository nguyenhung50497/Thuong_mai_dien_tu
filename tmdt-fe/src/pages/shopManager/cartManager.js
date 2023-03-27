import {Link, Outlet, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllCartShop,
    getCartByStatus,
    getDetailCart, orderStatusRefunds, orderStatusSending, searchByCategory,
    searchByIdCart,
    searchByName,
    searchByPhone
} from "../../service/cartService";
import swal from "sweetalert";
import {getProducts} from "../../service/productService";
import userSlice from "../../redux/users/userSlice";
import {addNotification} from "../../service/notificationService";

export default function CartManager() {
    const [type, setType] = useState('Mã đơn hàng')
    const [statusCart, setStatusCart] = useState('')
    const [page, setPage] = useSearchParams();
    const [search, setSearch] = useState('')
    const page1 = page.get("page") || 1;
    let {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => {
        if (state !== undefined) {
            return state.carts.carts.carts
        }
    });
    const user = useSelector((state) => {
        if (state !== undefined) {
            return state.users.users.idUser
        }
    });
    const detailCart = useSelector((state) => {
        if (state !== undefined) {
            return state.carts.detailCart
        }
    });
    let total = 0
    for (let i = 0; i < detailCart.length; i++) {
        total += Number(detailCart[i].priceInCart) * Number(detailCart[i].quantityCart)
    }
    const totalPages = useSelector((state) => {
        if (state.carts.carts !== undefined) {
            return state.carts.carts.totalPage;
        }
    });
    const handleDetailCart = (values) => {
        let data = {
            idCart: values,
            idShop: id
        }
        dispatch(getDetailCart(data))
    }
    const handleSearch = (values) => {
        setSearch(values.valueInput)
        let data = {...values}
        data.idShop = id
        data.page = 1
        if (type === 'Tên khách hàng') {
            dispatch(searchByName(data))
        } else if (type === 'Số điện thoại') {
            dispatch(searchByPhone(data))
        } else if (type === "Mã đơn hàng") {
            dispatch(searchByIdCart(data))
        } else if (type === 'Loại hàng') {
            dispatch(searchByCategory(data))
        }
    }
    const formatCurrency = (price) => {
        let DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
        let priceWithCommas = price.toLocaleString();
        let arParts = String(priceWithCommas).split(DecimalSeparator);
        let intPart = arParts[0];
        var decPart = arParts.length > 1 ? arParts[1] : "";
        return intPart;
    };
    const handleOrderStatusSending = async (idCart,idUser) => {
        let data = {contentNotification: 'waiting', idSender: user, idReceiver: idUser, idCart: idCart}
        console.log(data);
       dispatch(addNotification(data))
       dispatch(orderStatusSending(idCart)).then(check => {
            if (check.payload === 'đang xử lý') {
                swal('Chuyển trạng thái thành công')
                window.location.reload()
            }
        })
    }
    const handleOrderStatusRefunds = async (idCart, idUser) => {
        let data = {contentNotification: 'delete', idSender: user, idReceiver: idUser, idCart: idCart}

        dispatch(orderStatusRefunds(idCart)).then(check => {
            if (check.payload === 'hủy đơn') {
                dispatch(addNotification(data))
                swal('Đã hủy đơn hàng thành công')
                window.location.reload()
            }
        })
    }
    useEffect(() => {
        if (statusCart !== '') {
            let data = {idShop: id, statusCart: statusCart, page: 1}
            dispatch(getCartByStatus(data))
        } else {
            dispatch(getAllCartShop({idShop: id, page: 1}))
        }
    }, [statusCart])
    return (
       <>
          <div className="col-10 bg-light">
             <div className="row">
                <div
                   className="col-12"
                   style={{ width: "100%", height: "700px" }}>
                   <div
                      className="col-12"
                      style={{
                         marginTop: "20px",
                         marginLeft: "25px",
                         marginBottom: "20px",
                         color: "rgb(238, 77, 45)",
                      }}>
                      <h4>Quản lý đơn hàng</h4>
                   </div>
                   <div
                      className="col-12"
                      style={{
                         backgroundColor: "rgb(231, 229, 229)",
                         height: "1px",
                         width: "100%",
                      }}></div>
                   <div
                      className="col-12"
                      style={{ paddingTop: "31px", height: "100px" }}>
                      <Formik
                         initialValues={{
                            idShop: "",
                            valueInput: "",
                            page: "",
                         }}
                         onSubmit={(values) => {
                            handleSearch(values);
                         }}>
                         <Form>
                            <div className="row">
                               <div
                                  className="col-10"
                                  style={{
                                     marginLeft: "250px",
                                     marginRight: "-200px",
                                  }}>
                                  <div className="input-group mb-3">
                                     <div className="input-group-prepend">
                                        <Field
                                           as={"select"}
                                           onChange={(e) =>
                                              setType(e.target.value)
                                           }
                                           className="custom-select"
                                           id="inputGroupSelect01"
                                           name={"select"}
                                           style={{
                                              border: "1px black solid",
                                              width: "200px",
                                           }}>
                                           <option value="Mã đơn hàng">
                                              Mã đơn hàng
                                           </option>
                                           <option value="Số điện thoại">
                                              Số điện thoại
                                           </option>
                                           <option value="Tên khách hàng">
                                              Tên khách hàng
                                           </option>
                                           <option value="Loại hàng">
                                              Loại sản phẩm
                                           </option>
                                        </Field>
                                     </div>
                                     <Field
                                        type="text"
                                        style={{ width: "600px" }}
                                        name={"valueInput"}
                                        placeholder={type}
                                     />
                                  </div>
                               </div>
                               <div
                                  className="col-2"
                                  style={{ marginLeft: "-300px" }}>
                                  <button
                                     type={"submit"}
                                     style={{
                                        backgroundColor: "rgb(238, 77, 45)",
                                        color: "white",
                                        width: "100px",
                                        height: "38px",
                                        border: "none",
                                     }}>
                                     Tìm kiếm
                                  </button>
                               </div>
                            </div>
                         </Form>
                      </Formik>
                   </div>
                   <div
                      className="col-12"
                      style={{
                         backgroundColor: "rgb(231, 229, 229)",
                         height: "1px",
                         width: "100%",
                      }}></div>
                   <div
                      className="col-12"
                      style={{ width: "100%", height: "80px" }}>
                      <div className="row">
                         <div
                            className="col-2"
                            style={{ marginTop: "12px", marginLeft: "5px" }}>
                            <a
                               type={"submit"}
                               className="notification"
                               style={{ textDecoration: "none" }}>
                               <span style={{ color: "rgb(238, 77, 45)" }}>
                                  <b>Trạng thái đơn</b>
                               </span>
                            </a>
                         </div>
                         <div
                            className="col-2"
                            style={{ marginTop: "12px", marginLeft: "-20px" }}>
                            {statusCart === "" ? (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span
                                        style={{ color: "rgb(238, 77, 45)" }}>
                                        Tất cả
                                     </span>
                                     <span className="badge">
                                        {carts && carts.length}
                                     </span>
                                  </a>
                               </>
                            ) : (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span>Tất cả</span>
                                     <span className="badge"></span>
                                  </a>
                               </>
                            )}
                         </div>
                         <div
                            className="col-2"
                            style={{ marginTop: "12px", marginLeft: "-100px" }}>
                            {statusCart === "chờ xác nhận" ? (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() =>
                                        setStatusCart("chờ xác nhận")
                                     }
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span
                                        style={{ color: "rgb(238, 77, 45)" }}>
                                        Chờ xác nhận
                                     </span>
                                     <span className="badge">
                                        {carts && carts.length}
                                     </span>
                                  </a>
                               </>
                            ) : (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() =>
                                        setStatusCart("chờ xác nhận")
                                     }
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span>Chờ xác nhận</span>
                                     <span className="badge"></span>
                                  </a>
                               </>
                            )}
                         </div>
                         <div
                            className="col-2"
                            style={{ marginTop: "12px", marginLeft: "-40px" }}>
                            {statusCart === "đang xử lý" ? (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("đang xử lý")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span
                                        style={{ color: "rgb(238, 77, 45)" }}>
                                        Đang giao hàng
                                     </span>
                                     <span className="badge">
                                        {carts && carts.length}
                                     </span>
                                  </a>
                               </>
                            ) : (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("đang xử lý")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span>Đang giao hàng</span>
                                     <span className="badge"></span>
                                  </a>
                               </>
                            )}
                         </div>
                         <div
                            className="col-2"
                            style={{ marginTop: "12px", marginLeft: "-20px" }}>
                            {statusCart === "hoàn thành" ? (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("hoàn thành")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span
                                        style={{ color: "rgb(238, 77, 45)" }}>
                                        Đã giao
                                     </span>
                                     <span className="badge">
                                        {carts && carts.length}
                                     </span>
                                  </a>
                               </>
                            ) : (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("hoàn thành")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span>Đã giao</span>
                                     <span className="badge"></span>
                                  </a>
                               </>
                            )}
                         </div>
                         <div
                            className="col-2"
                            style={{ marginTop: "12px", marginLeft: "-70px" }}>
                            {statusCart === "hủy đơn" ? (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("hủy đơn")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span
                                        style={{ color: "rgb(238, 77, 45)" }}>
                                        Đã hủy
                                     </span>
                                     <span className="badge">
                                        {carts && carts.length}
                                     </span>
                                  </a>
                               </>
                            ) : (
                               <>
                                  <a
                                     type={"submit"}
                                     onClick={() => setStatusCart("hủy đơn")}
                                     className="notification"
                                     style={{ textDecoration: "none" }}>
                                     <span>Đã hủy</span>
                                     <span className="badge"></span>
                                  </a>
                               </>
                            )}
                         </div>
                      </div>
                   </div>
                   <div
                      className="col-12"
                      style={{
                         backgroundColor: "rgb(231, 229, 229)",
                         height: "1px",
                         width: "100%",
                      }}></div>
                   <div className="col-12" style={{ marginLeft: "-5px" }}>
                      <table className="table table-borderless">
                         <thead>
                            <tr>
                               <th scope="col">Mã Đơn hàng</th>
                               <th scope="col">Trạng thái</th>
                               <th scope="col">Thời gian đặt</th>
                               <th scope="col">Người đặt</th>
                               <th scope="col">Số điện thoại</th>
                               <th scope="col">Địa chỉ</th>
                               <th scope="col"></th>
                            </tr>
                         </thead>
                         <tbody>
                            {carts !== undefined &&
                               carts.map((item) => (
                                  <>
                                     <tr>
                                        <th scope="row">{item.idCart}</th>
                                        {item.statusCart === "chờ xác nhận" ? (
                                           <>
                                              <td style={{ color: "#FF8C00" }}>
                                                 {item.statusCart}
                                              </td>
                                           </>
                                        ) : item.statusCart === "đang xử lý" ? (
                                           <>
                                              <td style={{ color: "black" }}>
                                                 {item.statusCart}
                                              </td>
                                           </>
                                        ) : item.statusCart === "hoàn thành" ? (
                                           <>
                                              <td style={{ color: "blue" }}>
                                                 {item.statusCart}
                                              </td>
                                           </>
                                        ) : (
                                           <>
                                              <td style={{ color: "red" }}>
                                                 {item.statusCart}
                                              </td>
                                           </>
                                        )}
                                        <td>{item.timePayCart}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.phoneAddress}</td>
                                        <td>
                                           {item.descriptionAddress}-
                                           {item.district}-{item.province}
                                        </td>
                                        <td>
                                           {item.statusCart ===
                                           "chờ xác nhận" ? (
                                              <>
                                                 <button
                                                    type={"submit"}
                                                    onClick={() =>
                                                       handleOrderStatusSending(
                                                          item.idCart,
                                                          item.idUser
                                                       )
                                                    }
                                                    style={{
                                                       background: "none",
                                                       color: "green",
                                                       width: "100px",
                                                       height: "20px",
                                                       border: "none",
                                                       textAlign: "center",
                                                    }}>
                                                    Xác nhận
                                                 </button>
                                              </>
                                           ) : (
                                              <></>
                                           )}
                                        </td>
                                        <td>
                                           {item.statusCart ===
                                           "chờ xác nhận" ? (
                                              <>
                                                 <button
                                                    style={{
                                                       background: "none",
                                                       color: "red",
                                                       width: "100px",
                                                       height: "20px",
                                                       border: "none",
                                                       textAlign: "center",
                                                    }}
                                                    type="button"
                                                    onClick={() =>
                                                       handleOrderStatusRefunds(
                                                          item.idCart,
                                                          item.idUser
                                                       )
                                                    }>
                                                    Hủy đơn
                                                 </button>
                                              </>
                                           ) : item.statusCart ===
                                             "đang xử lý" ? (
                                              <>
                                                 <button
                                                    style={{
                                                       background: "none",
                                                       color: "red",
                                                       width: "100px",
                                                       height: "20px",
                                                       border: "none",
                                                       textAlign: "center",
                                                    }}
                                                    type="button"
                                                    onClick={() =>
                                                       handleOrderStatusRefunds(
                                                          item.idCart,
                                                          item.idUser
                                                       )
                                                    }>
                                                    Hủy đơn
                                                 </button>
                                              </>
                                           ) : (
                                              <></>
                                           )}
                                        </td>
                                        <td>
                                           <button
                                              style={{
                                                 background: "none",
                                                 color: "blue",
                                                 width: "100px",
                                                 height: "20px",
                                                 border: "none",
                                                 textAlign: "center",
                                              }}
                                              type="button"
                                              data-toggle="modal"
                                              data-target={
                                                 "#exampleModal" + item.idCart
                                              }
                                              onClick={() =>
                                                 handleDetailCart(item.idCart)
                                              }>
                                              Chi tiết
                                           </button>
                                        </td>
                                     </tr>
                                     <div
                                        className="modal fade"
                                        id={"exampleModal" + item.idCart}
                                        tabIndex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                                           <div className="modal-content">
                                              <div className="modal-header">
                                                 <h5
                                                    className="modal-title"
                                                    id="exampleModalLabel">
                                                    Chi tiết đơn hàng mã
                                                    <p
                                                       style={{
                                                          color: "rgb(238, 77, 45)",
                                                       }}>
                                                       {item.idCart}
                                                    </p>
                                                 </h5>
                                                 <h5
                                                    style={{
                                                       marginLeft: "150px",
                                                    }}
                                                    className="modal-title"
                                                    id="exampleModalLabel">
                                                    Tổng giá trị đơn hàng
                                                    <p
                                                       style={{
                                                          color: "rgb(238, 77, 45)",
                                                       }}>
                                                       {total &&
                                                          formatCurrency(
                                                             total
                                                          )}{" "}
                                                       Đ
                                                    </p>
                                                 </h5>
                                                 <h5
                                                    style={{
                                                       marginLeft: "150px",
                                                    }}
                                                    className="modal-title"
                                                    id="exampleModalLabel">
                                                    Ngày đặt đơn đặt
                                                    <p
                                                       style={{
                                                          color: "rgb(238, 77, 45)",
                                                       }}>
                                                       {item.timePayCart}
                                                    </p>
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
                                                 <table className="table table-hover">
                                                    <thead>
                                                       <tr>
                                                          <th scope="col">
                                                             Mã sản phẩm
                                                          </th>
                                                          <th scope="col">
                                                             Tên sản phẩm
                                                          </th>
                                                          <th scope="col">
                                                             Giá
                                                          </th>
                                                          <th scope="col">
                                                             Số lượng mua
                                                          </th>
                                                          <th scope="col">
                                                             Tổng
                                                          </th>
                                                       </tr>
                                                    </thead>
                                                    <tbody>
                                                       {detailCart !==
                                                          undefined &&
                                                          detailCart.map(
                                                             (item) => (
                                                                <>
                                                                   <tr>
                                                                      <th scope="row">
                                                                         {
                                                                            item.idProduct
                                                                         }
                                                                      </th>
                                                                      <td>
                                                                         {
                                                                            item.nameProduct
                                                                         }
                                                                      </td>
                                                                      <td>
                                                                         {item.priceInCart &&
                                                                            formatCurrency(
                                                                               item.priceInCart
                                                                            )}{" "}
                                                                         Đ
                                                                      </td>
                                                                      <td>
                                                                         {
                                                                            item.quantityCart
                                                                         }
                                                                      </td>
                                                                      <td
                                                                         style={{
                                                                            color: "rgb(238, 77, 45)",
                                                                         }}>
                                                                         {Number(
                                                                            item.priceInCart
                                                                         ) *
                                                                            Number(
                                                                               item.quantityCart
                                                                            ) &&
                                                                            formatCurrency(
                                                                               Number(
                                                                                  item.priceInCart
                                                                               ) *
                                                                                  Number(
                                                                                     item.quantityCart
                                                                                  )
                                                                            )}{" "}
                                                                         Đ
                                                                      </td>
                                                                   </tr>
                                                                </>
                                                             )
                                                          )}
                                                    </tbody>
                                                 </table>
                                              </div>
                                              <div className="modal-footer">
                                                 <button
                                                    type="button"
                                                    className="btn btn"
                                                    data-dismiss="modal">
                                                    Close
                                                 </button>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </>
                               ))}
                         </tbody>
                      </table>
                   </div>
                </div>
                <div className="col-12 bg-light" style={{ width: "100%" }}>
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
                                        if (search !== "") {
                                           let data = {
                                              idShop: id,
                                              valueInput: search,
                                              page: page1 - 1,
                                           };
                                           if (type === "Tên khách hàng") {
                                              dispatch(searchByName(data));
                                           } else if (
                                              type === "Số điện thoại"
                                           ) {
                                              dispatch(searchByPhone(data));
                                           } else if (type === "Mã đơn hàng") {
                                              dispatch(searchByIdCart(data));
                                           } else if (type === "Loại hàng") {
                                              dispatch(searchByCategory(data));
                                           }
                                        } else {
                                           if (statusCart !== "") {
                                              let data = {
                                                 idShop: id,
                                                 statusCart: statusCart,
                                                 page: page1 - 1,
                                              };
                                              dispatch(getCartByStatus(data));
                                           } else {
                                              dispatch(
                                                 getAllCartShop({
                                                    idShop: id,
                                                    page: page1 - 1,
                                                 })
                                              );
                                           }
                                        }
                                        navigate(
                                           "/shop-manager/" +
                                              id +
                                              "/cart/" +
                                              id +
                                              "?page=" +
                                              (page1 - 1)
                                        );
                                        window.scrollTo({
                                           top: 900,
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
                                        if (search !== "") {
                                           let data = {
                                              idShop: id,
                                              valueInput: search,
                                              page: Number(page1) + 1,
                                           };
                                           if (type === "Tên khách hàng") {
                                              dispatch(searchByName(data));
                                           } else if (
                                              type === "Số điện thoại"
                                           ) {
                                              dispatch(searchByPhone(data));
                                           } else if (type === "Mã đơn hàng") {
                                              dispatch(searchByIdCart(data));
                                           } else if (type === "Loại hàng") {
                                              dispatch(searchByCategory(data));
                                           }
                                        } else {
                                           if (statusCart !== "") {
                                              let data = {
                                                 idShop: id,
                                                 statusCart: statusCart,
                                                 page: page1 - 1,
                                              };
                                              dispatch(getCartByStatus(data));
                                           } else {
                                              dispatch(
                                                 getAllCartShop({
                                                    idShop: id,
                                                    page: page1 - 1,
                                                 })
                                              );
                                           }
                                        }
                                        navigate(
                                           "/shop-manager/" +
                                              id +
                                              "/cart/" +
                                              id +
                                              "?page=" +
                                              (Number(page1) + 1)
                                        );
                                        window.scrollTo({
                                           top: 900,
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
          </div>
       </>
    );
}