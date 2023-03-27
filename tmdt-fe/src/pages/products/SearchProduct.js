import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
   Link,
   useLocation,
   useNavigate,
   useSearchParams,
} from "react-router-dom";
import { getProducts, search } from "../../service/productService";
import { Field, Form, Formik } from "formik";
import { getAllVouchers } from "../../service/voucherService";

export default function SearchProduct() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const [page, setPage] = useSearchParams();
   const [sort, setSort] = useState("newest");
   const page1 = page.get("page") || 1;
   const totalPages = useSelector((state) => {
      if (state.products.products !== undefined) {
         return state.products.search.totalPage;
      }
   });
   const day = new Date();
   const vouchers = useSelector((state) => {
      if (state.vouchers.vouchers) {
         return state.vouchers.vouchers;
      }
   });
   let products = useSelector((state) => {
      return state.products.search.products;
   });
   let allProducts = useSelector((state) => {
      return state.products.products.products;
   });
   let address = [];
   for (let i = 0; i < allProducts.length; i++) {
      let temp = allProducts[i].addressShop;
      for (let j = allProducts[i].addressShop.length - 1; j > 0; j--) {
         if (allProducts[i].addressShop[j] === "-") {
            temp = allProducts[i].addressShop.slice(
                j + 1,
                allProducts[i].addressShop.length
            );
            break;
         }
      }
      address.push(temp);
   }

   const uniqueAddress = [...new Set(address)];

   const keyword = useSelector((state) => {
      return state.products.keyword;
   });
   const existUrl = useSelector((state) => state.products.existUrl);
   const [queryValue, setQueryValue] = useState({
      sort: [""],
      addressShop: [],
      nameCategory: [],
      minPrice: [""],
      maxPrice: [""],
      keyword: [...keyword],
   });
   const [queryStringAPI, setQueryStringAPI] = useState("");
   const loading = useSelector((state) => {
      return state.products.loading;
   });
   const formatCurrency = (price) => {
      let DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
      let priceWithCommas = price.toLocaleString();
      let arParts = String(priceWithCommas).split(DecimalSeparator);
      let intPart = arParts[0];
      let decPart = arParts.length > 1 ? arParts[1] : "";
      return intPart;
   };

   function handleChange(event) {
      const isChecked = event.target.checked;
      const value = event.target.value;
      console.log(value);
      if (isChecked === true) {
         if (uniqueAddress.includes(value) === true) {
            queryValue.addressShop.push(value);
            setQueryValue({
               sort: [...queryValue.sort],
               addressShop: queryValue.addressShop,
               nameCategory: [...queryValue.nameCategory],
               minPrice: [...queryValue.minPrice],
               maxPrice: [...queryValue.maxPrice],
               keyword: [...keyword],
            });
         }
         if (
             value === "Thời Trang" ||
             value === "Mẹ & Bé" ||
             value === "Thiết Bị Điện Tử" ||
             value === "Máy Tính & Laptop" ||
             value === "Đồng Hồ" ||
             value === "Giày Dép" ||
             value === "Nhà Cửa & Đời Sống" ||
             value === "Sức Khỏe" ||
             value === "Phụ Kiện & Trang Sức Nữ" ||
             value === "Thể Thao" ||
             value === "Oto & Xe Máy & Xe Đạp" ||
             value === "Bách Hóa Online"
         ) {
            queryValue.nameCategory.push(value);
            setQueryValue({
               sort: [...queryValue.sort],
               addressShop: [...queryValue.addressShop],
               nameCategory: queryValue.nameCategory,
               minPrice: [...queryValue.minPrice],
               maxPrice: [...queryValue.maxPrice],
               keyword: [...keyword],
            });
         }
      } else if (isChecked === false) {
         if (uniqueAddress.includes(value) === true) {
            for (let i = 0; i < queryValue.addressShop.length; i++) {
               if (queryValue.addressShop[i] === value)
                  queryValue.addressShop.splice(i, 1);
            }
            setQueryValue({
               sort: [...queryValue.sort],
               addressShop: queryValue.addressShop,
               nameCategory: [...queryValue.nameCategory],
               minPrice: [...queryValue.minPrice],
               maxPrice: [...queryValue.maxPrice],
               keyword: [...keyword],
            });
         }
         if (
             value === "Thời Trang" ||
             value === "Mẹ & Bé" ||
             value === "Thiết Bị Điện Tử" ||
             value === "Máy Tính & Laptop" ||
             value === "Đồng Hồ" ||
             value === "Giày Dép" ||
             value === "Nhà Cửa & Đời Sống" ||
             value === "Sức Khỏe" ||
             value === "Phụ Kiện & Trang Sức Nữ" ||
             value === "Thể Thao" ||
             value === "Oto & Xe Máy & Xe Đạp" ||
             value === "Bách Hóa Online"
         ) {
            for (let i = 0; i < queryValue.nameCategory.length; i++) {
               if (queryValue.nameCategory[i] === value)
                  queryValue.nameCategory.splice(i, 1);
            }
            setQueryValue({
               sort: [...queryValue.sort],
               addressShop: [...queryValue.addressShop],
               nameCategory: queryValue.nameCategory,
               minPrice: [...queryValue.minPrice],
               maxPrice: [...queryValue.maxPrice],
               keyword: [...keyword],
            });
         }
      }
   }

   const handleSubmit = async (values) => {
      if (values.maxPrice !== "" || values.minPrice !== "") {
         queryValue.maxPrice[0] = values.maxPrice;
         queryValue.minPrice[0] = values.minPrice;
         setQueryValue({
            sort: [...queryValue.sort],
            addressShop: [...queryValue.addressShop],
            nameCategory: [...queryValue.nameCategory],
            minPrice: queryValue.minPrice,
            maxPrice: queryValue.maxPrice,
            keyword: [...keyword],
         });
      }
      if (values.maxPrice === "" || values.minPrice !== "") {
         queryValue.minPrice[0] = values.minPrice;
         setQueryValue({
            sort: [...queryValue.sort],
            addressShop: [...queryValue.addressShop],
            nameCategory: [...queryValue.nameCategory],
            minPrice: queryValue.minPrice,
            maxPrice: [...queryValue.maxPrice],
            keyword: [...keyword],
         });
      }
      if (values.maxPrice !== "" || values.minPrice === "") {
         queryValue.maxPrice[0] = values.maxPrice;
         setQueryValue({
            sort: [...queryValue.sort],
            addressShop: [...queryValue.addressShop],
            nameCategory: [...queryValue.nameCategory],
            minPrice: [...queryValue.minPrice],
            maxPrice: queryValue.maxPrice,
            keyword: [...keyword],
         });
      }
   };
   const handleSort = async (value) => {
      queryValue.sort[0] = value;
      setQueryValue({
         sort: queryValue.sort,
         addressShop: [...queryValue.addressShop],
         nameCategory: [...queryValue.nameCategory],
         minPrice: queryValue.minPrice,
         maxPrice: queryValue.maxPrice,
         keyword: [...keyword],
      });
   };
   const searchParams = new URLSearchParams();
   useEffect(() => {
      if (
          keyword[0] !== "undefined" &&
          queryValue.keyword.length > 0 &&
          keyword[0] !== "null" &&
          keyword[0] !== null
      ) {
         searchParams.append("keyword", queryValue.keyword[0]);
      }
      if (queryValue.sort[0] !== "") {
         searchParams.append("sort", queryValue.sort[0]);
      }
      if (queryValue.addressShop.length > 0) {
         for (let i = 0; i < queryValue.addressShop.length; i++) {
            searchParams.append("addressShop", queryValue.addressShop[i]);
         }
      }
      if (queryValue.nameCategory.length > 0) {
         for (let i = 0; i < queryValue.nameCategory.length; i++) {
            searchParams.append("nameCategory", queryValue.nameCategory[i]);
         }
      }
      if (queryValue.minPrice[0] !== "" && queryValue.maxPrice[0] !== "") {
         searchParams.append("minPrice", queryValue.minPrice[0]);
         searchParams.append("maxPrice", queryValue.maxPrice[0]);
      }
      if (queryValue.minPrice[0] === "" && queryValue.maxPrice[0] !== "") {
         searchParams.append("maxPrice", queryValue.maxPrice[0]);
      }
      if (queryValue.minPrice[0] !== "" && queryValue.maxPrice[0] === "") {
         searchParams.append("minPrice", queryValue.minPrice[0]);
      }

      const queryString = searchParams.toString();

      if (queryString) {
         setQueryStringAPI(queryString);
         // navigate('?' + queryString)
         navigate("?" + queryString);
      }
      if (!queryString && location.state) {
         setQueryStringAPI(queryString);
         navigate("?" + location.state);
      }
      if (!queryString && !location.state) {
         setQueryStringAPI(queryString);
         navigate("");
      }
   }, [queryValue]);
   useEffect(() => {
      if (location.state) {
         dispatch(search([location.state, 1]));
      } else {
         dispatch(search([queryStringAPI, 1]));
      }
   }, [queryStringAPI]);
   useEffect(() => {
      dispatch(getProducts);
   }, []);
   let initialValues = {
      minPrice: "",
      maxPrice: "",
   };
   useEffect(() => {
      dispatch(getAllVouchers());
   }, []);
   return (
       <>
          {loading === true ? (
              <>
                 <div className="row">
                    <div
                        className="offset-5 col-2"
                        style={{ textAlign: "center", marginTop: "300px" }}>
                       <div className="loader"></div>
                    </div>
                 </div>
              </>
          ) : (
              <>
                 <div className="row mt-3">
                    <div className="col-2"></div>
                    <div className="col-8">
                       <div className="row">
                          <div className="col-3">
                             <div className="contact-form">
                                <h5
                                    style={{
                                       marginBottom: "15px",
                                       marginTop: "15px",
                                    }}>
                                   Sắp xếp
                                </h5>

                                <select
                                    class="custom-select"
                                    name="sort"
                                    onChange={(e) => {
                                       handleSort(e.target.value);
                                    }}>
                                   <option value="">Sắp xếp theo:</option>
                                   <option value="newest">
                                      Ngày ra mắt: mới nhất
                                   </option>
                                   <option value="oldest">
                                      Ngày ra mắt: cũ nhất
                                   </option>
                                   <option value="highestPrice">
                                      Giá sản phẩm: cao đến thấp
                                   </option>
                                   <option value="lowestPrice">
                                      Giá sản phẩm: thấp đến cao
                                   </option>
                                   <option value="discount">Đang giảm giá</option>
                                </select>

                                <h5
                                    style={{
                                       marginBottom: "15px",
                                       marginTop: "15px",
                                    }}>
                                   Địa điểm
                                </h5>
                                {uniqueAddress &&
                                    uniqueAddress.map((item, key) => (
                                        <>
                                           <div>
                                              <label>
                                                 <input
                                                     type="checkbox"
                                                     onChange={handleChange}
                                                     value={`${item}`}
                                                 />{" "}
                                                 {item}
                                              </label>
                                           </div>
                                        </>
                                    ))}

                                <br />
                                <hr />
                                <h5 style={{ marginBottom: "15px" }}>
                                   Khoảng giá{" "}
                                </h5>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleSubmit}>
                                   <Form>
                                      <div className="form-group">
                                         <Field
                                             className="price pl-1"
                                             type="text"
                                             name="minPrice"
                                             placeholder="đ - VND"
                                         />
                                         <a> - </a>
                                         <Field
                                             className="price pl-1"
                                             type="text"
                                             name="maxPrice"
                                             placeholder="đ - VND"
                                         />
                                      </div>

                                      <div className="form-group">
                                         <button
                                             className="btn-price"
                                             type="submit">
                                            Áp Dụng
                                         </button>
                                      </div>
                                   </Form>
                                </Formik>

                                <br />
                                <hr />
                                <h5 style={{ marginBottom: "15px" }}>Danh mục</h5>

                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Thời Trang"
                                      />{" "}
                                      Thời Trang
                                   </label>
                                </div>

                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Mẹ & Bé"
                                      />{" "}
                                      Mẹ & Bé
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Thiết Bị Điện Tử"
                                      />{" "}
                                      Thiết Bị Điện Tử
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Máy Tính & Laptop"
                                      />{" "}
                                      Máy Tính & Laptop
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Đồng Hồ"
                                      />{" "}
                                      Đồng Hồ
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Giày Dép"
                                      />{" "}
                                      Giày Dép
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Nhà Cửa & Đời Sống"
                                      />{" "}
                                      Nhà Cửa & Đời Sống
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Sức Khỏe"
                                      />{" "}
                                      Sức Khỏe
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Phụ Kiện & Trang Sức Nữ"
                                      />{" "}
                                      Phụ Kiện & Trang Sức Nữ
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Thể Thao"
                                      />{" "}
                                      Thể Thao
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Oto & Xe Máy & Xe Đạp"
                                      />{" "}
                                      Oto & Xe Máy & Xe Đạp
                                   </label>
                                </div>
                                <div>
                                   <label>
                                      <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value="Bách Hóa Online"
                                      />{" "}
                                      Bách Hóa Online
                                   </label>
                                </div>
                                <br />
                             </div>
                          </div>
                          <div className="col-9" style={{ marginLeft: "-1px" }}>
                             <div
                                 className="col-12 bg-light pt-3 text-center"
                                 style={{
                                    border: "1px solid rgb(231, 229, 229)",
                                    height: "60px",
                                    fontSize: "20px",
                                 }}>
                                <strong className="text-danger">Sản Phẩm</strong>
                             </div>
                             <div className="row col-12 m-0 p-0">
                                {products !== undefined &&
                                    products.map((item, key) => (
                                        <>
                                           <div
                                               key={key}
                                               className="col-lg-3 col-md-4 col-sm-6 p-1 card-product"
                                               style={{
                                                  height: "316px",
                                               }}>
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
                                                       <div
                                                           style={{
                                                              position: "absolute",
                                                              right: "0px",
                                                              top: "0px",
                                                           }}>
                                                          <div>
                                                             {vouchers &&
                                                                 vouchers.map(
                                                                     (it, index) => (
                                                                         <>
                                                                            {it.idProduct ===
                                                                                item.idProduct &&
                                                                                new Date(
                                                                                    it.dayStart
                                                                                ) <=
                                                                                day &&
                                                                                new Date(
                                                                                    it.dayEnd
                                                                                ) >
                                                                                day && (
                                                                                    <div
                                                                                        className="p-1"
                                                                                        style={{
                                                                                           backgroundColor:
                                                                                               "#FFFF99",
                                                                                           textAlign:
                                                                                               "center",
                                                                                        }}>
                                                                                       <div
                                                                                           style={{
                                                                                              color: "#FF0000",
                                                                                           }}>
                                                                                          {
                                                                                             it.valueVoucher
                                                                                          }
                                                                                          {
                                                                                             "%"
                                                                                          }
                                                                                       </div>
                                                                                       <div>
                                                                                          Giảm
                                                                                       </div>
                                                                                    </div>
                                                                                )}
                                                                         </>
                                                                     )
                                                                 )}
                                                          </div>
                                                       </div>
                                                    </Link>
                                                    <div>
                                                       <div
                                                           style={{
                                                              height: "50px",
                                                           }}>
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
                                                                textDecoration:
                                                                    "underline",
                                                             }}>
                                                            đ
                                                         </span>{" "}
                                                             {item.price &&
                                                                 formatCurrency(
                                                                     item.price
                                                                 )}
                                                          </div>
                                                          <div
                                                              className="text-secondary mr-1 mt-1"
                                                              style={{
                                                                 float: "right",
                                                                 fontSize: "13px",
                                                              }}>
                                                             {item.sold < 1000 && (
                                                                 <>
                                                                    Đã bán:{" "}
                                                                    {item.sold}
                                                                 </>
                                                             )}
                                                             {item.sold >= 1000 && (
                                                                 <>
                                                                    Đã bán:{" "}
                                                                    {(
                                                                        item.sold /
                                                                        1000
                                                                    ).toFixed(1)}
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
                                                           search([
                                                              existUrl,
                                                              page1 - 1,
                                                           ])
                                                       );
                                                       navigate(
                                                           `/search?${existUrl}&page=` +
                                                           (page1 - 1)
                                                       );
                                                       window.scrollTo({
                                                          top: 350,
                                                          behavior: "smooth",
                                                       });
                                                    }}>
                                                   {" "}
                                                   <span aria-hidden="true">
                                                   &laquo;
                                                </span>
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
                                                           search([
                                                              existUrl,
                                                              Number(page1) + 1,
                                                           ])
                                                       );
                                                       navigate(
                                                           `/search?${existUrl}&page=` +
                                                           (Number(page1) + 1)
                                                       );
                                                       window.scrollTo({
                                                          top: 350,
                                                          behavior: "smooth",
                                                       });
                                                    }}>
                                                   {" "}
                                                   <span aria-hidden="true">
                                                   &raquo;
                                                </span>
                                                </button>
                                             </>
                                         )}
                                      </li>
                                   </ul>
                                </nav>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="col-2"></div>
                 </div>
              </>
          )}
       </>
   );
}
