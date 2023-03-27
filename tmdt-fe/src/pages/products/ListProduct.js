import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getProducts, search } from "../../service/productService";
import { getCategories } from "../../service/categoryService";
import { getAllVouchers } from "../../service/voucherService";

export default function ListProduct() {
   const [page, setPage] = useSearchParams();
   const page1 = page.get("page") || 1;
   const [check, setCheck] = useState(0);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const products = useSelector((state) => {
      return state.products.products.products;
   });
   const categories = useSelector((state) => {
      return state.categories.categories;
   });
   const loading = useSelector((state) => state.products.loading);
   const totalPages = useSelector((state) => {
      if (state.products.products !== undefined) {
         return state.products.products.totalPage;
      }
   });
   const day = new Date();
   const formatCurrency = (price) => {
      var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
      var priceWithCommas = price.toLocaleString();
      var arParts = String(priceWithCommas).split(DecimalSeparator);
      var intPart = arParts[0];
      var decPart = arParts.length > 1 ? arParts[1] : "";
      return intPart;
   };
   const vouchers = useSelector((state) => {
      if (state.vouchers.vouchers) {
         return state.vouchers.vouchers;
      }
   });
   useEffect(() => {
      dispatch(getProducts(1));
   }, []);
   useEffect(() => {
      dispatch(getCategories());
   }, []);
   useEffect(() => {
      dispatch(getAllVouchers());
   }, []);
   return (
       <>
          {products && (
              <>
                 <div className="row mt-2">
                    <div className="col-2"></div>
                    <div className="col-8">
                       <div
                           className="col-12 bg-light pt-3"
                           style={{
                              border: "1px solid rgb(231, 229, 229)",
                              height: "60px",
                           }}>
                          <strong className="text-secondary">DANH MỤC</strong>
                       </div>
                       <div className="row m-0 p-0">
                          {categories &&
                              categories.map((item, key) => (
                                  <div
                                      className="col-lg-2 col-md-4 col-sm-6 bg-light card-category"
                                      onClick={() => {
                                         dispatch(
                                             search([
                                                `keyword=${item.nameCategory}`,
                                                1,
                                             ])
                                         );
                                         navigate(
                                             "/search?keyword=" + item.nameCategory,
                                             {
                                                state: `keyword=${item.nameCategory}`,
                                             }
                                         );
                                      }}>
                                     <div>
                                        <img
                                            src={item.imageCategory}
                                            alt=""
                                            style={{
                                               width: "100%",
                                               height: "150px",
                                            }}
                                        />
                                        <p className="text-center">
                                           {item.nameCategory}
                                        </p>
                                     </div>
                                  </div>
                              ))}
                       </div>
                    </div>
                    <div className="col-2"></div>
                 </div>
                 <div className="row mt-3">
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
                          {products !== undefined &&
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
                                          <span
                                              className="btn"
                                              style={{
                                                 textDecoration: "none",
                                              }}
                                              onClick={() => {
                                                 navigate(
                                                     `/product-detail/${item.idProduct}`
                                                 );
                                                 window.scrollTo({
                                                    top: 255,
                                                    behavior: "smooth",
                                                 });
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
                                                                      ) <= day &&
                                                                      new Date(
                                                                          it.dayEnd
                                                                      ) > day && (
                                                                          <div
                                                                              className="p-1"
                                                                              style={{
                                                                                 backgroundColor:
                                                                                     "#FFFF99",
                                                                                 textAlign: "center",
                                                                              }}>
                                                                             <div
                                                                                 style={{
                                                                                    color: "#FF0000",
                                                                                 }}>
                                                                                {
                                                                                   it.valueVoucher
                                                                                }
                                                                                {"%"}
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
                                          </span>
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
                                                           <>Đã bán: {item.sold}</>
                                                       )}
                                                       {item.sold >= 1000 && (
                                                           <>
                                                              Đã bán:{" "}
                                                              {(
                                                                  item.sold / 1000
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
                                                 dispatch(getProducts(page1 - 1));
                                                 navigate("/?page=" + (page1 - 1));
                                                 window.scrollTo({
                                                    top: 900,
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
                                 <span className="page-link">
                                    {page1}/{totalPages}
                                 </span>
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
                                                     getProducts(Number(page1) + 1)
                                                 );
                                                 navigate(
                                                     "/?page=" + (Number(page1) + 1)
                                                 );
                                                 window.scrollTo({
                                                    top: 900,
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
                    <div className="col-2"></div>
                 </div>
              </>
          )}
       </>
   );
}
