import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../service/productService";
import { Field, Form, Formik } from "formik";
import {
    addCartDetails,
    getCartDetails,
    getCartDetailsByUser,
} from "../../service/cartDetailService";
import swal from "sweetalert";
import { getCartByIdUser } from "../../service/cartService";
import { getFeedbacksByIdProduct } from "../../service/feedbackService";
import { Rating } from "react-simple-star-rating";
import { getAllVouchers } from "../../service/voucherService";

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => {
        if (state.products.product) {
            return state.products.product;
        }
    });
    const day = new Date();
    const vouchers = useSelector((state) => {
        if (state.vouchers.vouchers) {
            return state.vouchers.vouchers;
        }
    });
    const user = useSelector((state) => {
        return state.users.users;
    });
    const cart = useSelector((state) => {
        if (state.carts.cart) {
            return state.carts.cart;
        }
    });
    const feedbackProduct = useSelector((state) => {
        if (state) {
            return state.feedbacks.feedbacks.feedbacks;
        }
    });
    let totalStar = 0;
    let mediumStart = 0;
    if (feedbackProduct !== undefined) {
        for (let i = 0; i < feedbackProduct.length; i++) {
            totalStar += Number(feedbackProduct[i].assessment);
        }
        mediumStart = Math.ceil(totalStar / feedbackProduct.length);
    }

    const formatCurrency = (price) => {
        var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
        var priceWithCommas = price.toLocaleString();
        var arParts = String(priceWithCommas).split(DecimalSeparator);
        var intPart = arParts[0];
        var decPart = arParts.length > 1 ? arParts[1] : "";
        return intPart;
    };

    const handleAddToCart = (values) => {
        if (cart) {
            let data = {
                ...values,
                idCart: cart.idCart,
                idProduct: product.idProduct,
                priceInCart: product.price,
            };
            console.log(data);
            swal("Thêm vào giỏ hàng thành công!");
            dispatch(addCartDetails(data)).then(() => {
                dispatch(getCartDetailsByUser(user.idUser)).then(() => {
                    navigate(`/product-detail/${id}`);
                });
            });
        }
    };
    useEffect(() => {
        dispatch(getFeedbacksByIdProduct(id));
    }, []);
    useEffect(() => {
        dispatch(getProductById(id));
    }, []);
    useEffect(() => {
        dispatch(getCartByIdUser(user.idUser));
    }, []);
    useEffect(() => {
        dispatch(getAllVouchers());
    }, []);
    return (
        <div className="container-fluid row mt-3 mb-3">
            <div className="col-2"></div>
            <div className="col-8" style={{ marginLeft: "13px" }}>
                <div className="row mb-3 bg-light">
                    <div className="col-5 p-3">
                        <div className="row">
                            <div className="col-12">
                                <img
                                    src={product.image}
                                    alt=""
                                    style={{ width: "100%", height: "500px" }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        right: "0px",
                                        top: "0px",
                                    }}>
                                    <div>
                                        {vouchers &&
                                            vouchers.map((it, index) => (
                                                <>
                                                    {it.idProduct === product.idProduct &&
                                                        new Date(it.dayStart) <= day &&
                                                        new Date(it.dayEnd) > day && (
                                                            <div
                                                                className="p-1"
                                                                style={{
                                                                    backgroundColor: "#FFFF99",
                                                                    fontSize: "24px",
                                                                    textAlign: "center",
                                                                }}>
                                                                <div
                                                                    style={{
                                                                        color: "#FF0000",
                                                                    }}>
                                                                    {it.valueVoucher}
                                                                    {"%"}
                                                                </div>
                                                                <div>Giảm</div>
                                                            </div>
                                                        )}
                                                </>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7 pt-3">
                        <div className="mb-3" style={{ fontSize: "1.5rem" }}>
                            <span>{product.nameProduct}</span>
                        </div>
                        <div className="row">
                            <div
                                className="col-2 ml-3 text-danger text-center p-0"
                                style={{
                                    fontSize: "1rem",
                                    borderRight: "2px solid rgb(231, 229, 229)",
                                }}>
                                <div className="row">
                                    <div
                                        className="col-3"
                                        style={{
                                            fontSize: "1.25rem",
                                            textDecoration: "underline",
                                        }}>
                                        5.0{" "}
                                    </div>
                                    <div className="col-9 pl-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-star-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-star-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-star-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-star-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-star-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-2 text-center p-0"
                                style={{
                                    fontSize: "1rem",
                                    borderRight: "2px solid rgb(231, 229, 229)",
                                }}>
                                <span style={{ textDecoration: "underline" }}>100</span>
                                <span className="text-secondary"> Đánh Giá</span>
                            </div>
                            <div
                                className="col-2 text-center p-0"
                                style={{ fontSize: "1rem" }}>
                                <span>{product.sold}</span>
                                <span className="text-secondary"> Đã Bán</span>
                            </div>
                            <div className="col-5 text-right pr-4">
                                <Link
                                    to={""}
                                    style={{ textDecoration: "none", color: "orange" }}>
                                    Tố Cáo
                                </Link>
                            </div>
                        </div>
                        <div className="mt-5 mb-5 pl-4">
                            <h1 className="text-danger">
                        <span
                            style={{
                                fontSize: "24px",
                                textDecoration: "underline",
                            }}>
                           đ
                        </span>{" "}
                                {product.price && formatCurrency(product.price)}
                            </h1>
                        </div>
                        <div className="row mb-5">
                            <div className="col-3 text-secondary text-center">
                                <span>Vận Chuyển</span>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-2">
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/74f3e9ac01da8565c3baead996ed6e2a.png"
                                            alt=""
                                            style={{ width: "60%" }}
                                        />
                                    </div>
                                    <div className="col-10 pl-0">
                                        <span>Miễn phí vận chuyển</span>
                                    </div>
                                    <div className="col-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="30"
                                            fill="currentColor"
                                            class="bi bi-truck"
                                            viewBox="0 0 16 16">
                                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                    <div className="col-10 row">
                                        <div className="col-4 pl-0">
                                            <span>Vận chuyển tới</span>
                                        </div>
                                        <div className="col-8 pl-0">
                                            <select style={{ border: "none" }}>
                                                <option value={1}>Thanh Xuân</option>
                                                <option value={2}>Mỹ Đình</option>
                                                <option value={3}>Giáp Bát</option>
                                            </select>
                                        </div>
                                        <div className="col-4 pl-0">
                                            <span>Phí vận chuyển</span>
                                        </div>
                                        <div className="col-8 pl-1">
                                 <span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            textDecoration: "underline",
                                        }}>
                                       đ
                                    </span>{" "}
                                     0
                                 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {product.idUser !== user.idUser && (
                            <Formik
                                initialValues={{
                                    quantityCart: 1,
                                    timeCartDetail: new Date().toLocaleDateString(),
                                }}
                                onSubmit={(values) => {
                                    handleAddToCart(values);
                                }}>
                                <Form>
                                    <div className="row mb-5">
                                        <div className="col-3 text-secondary pl-5">
                                            <span>Số Lượng</span>
                                        </div>
                                        <div className="col-3 text-secondary pl-0">
                                            <Field
                                                className="text-center"
                                                type="number"
                                                name={"quantityCart"}
                                                style={{ width: "80%" }}
                                            />
                                        </div>
                                        <div className="col-6 text-secondary pl-0">
                                            <span>{product.quantity} sản phẩm có sẵn</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 pl-5">
                                            <button className="themGioHang" type="submit">
                                                Thêm Vào Giỏ Hàng
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        )}
                    </div>
                </div>
                <div className="bg-light p-4 pl-5" style={{ height: "125px" }}>
                    <div
                        className="row"
                        style={{
                            borderRight: "2px solid rgb(231, 229, 229)",
                            width: "25%",
                            height: "100%",
                            float: "left",
                        }}>
                        <div className="col-3 pl-0">
                            <img
                                src={product.imageShop}
                                alt=""
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "100%",
                                }}
                            />
                        </div>
                        <div className="col-9 pl-5">
                            <div>{product.nameShop}</div>
                            <div className="mt-3">
                                <button
                                    className="xemShop row pl-2"
                                    onClick={() => {
                                        navigate(`/shopInterface/${product.idShop}`);
                                    }}>
                                    <div className="col-1 pl-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            class="bi bi-shop-window"
                                            viewBox="0 0 16 16">
                                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                                        </svg>
                                    </div>
                                    <div className="col-10 pl-0 mt-1">Xem Shop</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="row pl-5 pt-2 mr-2 text-center"
                        style={{
                            borderRight: "2px solid rgb(231, 229, 229)",
                            fontSize: "14px",
                            width: "24%",
                            height: "100%",
                            float: "left",
                        }}>
                        <div className="col-6">Đánh Giá</div>
                        <div className="col-6" style={{ color: "#ee4d2d" }}>
                            123
                        </div>
                        <div className="col-6">Sản Phẩm</div>
                        <div className="col-6" style={{ color: "#ee4d2d" }}>
                            123
                        </div>
                    </div>
                    <div
                        className="row pl-4 pt-2 text-center"
                        style={{
                            borderRight: "2px solid rgb(231, 229, 229)",
                            fontSize: "14px",
                            width: "30%",
                            height: "100%",
                            float: "left",
                        }}>
                        <div className="col-6">Tỉ Lệ Phản Hồi</div>
                        <div className="col-6" style={{ color: "#ee4d2d" }}>
                            90%
                        </div>
                        <div className="col-6">Thời Gian Phản Hồi</div>
                        <div className="col-6" style={{ color: "#ee4d2d" }}>
                            Trong 1 giờ
                        </div>
                    </div>
                    <div
                        className="row pl-5 pt-2 text-center"
                        style={{
                            fontSize: "14px",
                            width: "27%",
                            height: "100%",
                            float: "left",
                        }}>
                        <div className="col-6">Tham Gia</div>
                        <div className="col-6" style={{ color: "#ee4d2d" }}>
                            1 năm trước
                        </div>
                        <div className="col-6">Người Theo Dõi</div>
                        <div className="col-6" style={{ color: "#ee4d2d" }}>
                            1.5k
                        </div>
                    </div>
                </div>
                <div className="bg-light p-5 mt-3">
                    <div>
                        <div>
                            <h4>Chi Tiết Sản Phẩm</h4>
                        </div>
                        <div className="row mt-4">
                            <div className="col-2 text-secondary">
                                <div>Danh Mục</div>
                                <div>Hạn Bảo Hành</div>
                                <div>Xuất Xứ</div>
                                <div>Kho Hàng</div>
                                <div>Gửi Từ</div>
                            </div>
                            <div className="col-10">
                                <div className="text-primary">
                                    {product.nameCategory}
                                </div>
                                <div>6 Tháng</div>
                                <div>Trung Quốc</div>
                                <div>123456</div>
                                <div>{product.addressShop}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <h4>Mô Tả Sản Phẩm</h4>
                        </div>
                        <div className="mt-4">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-light p-5 mt-3">
                    <h4>Đánh Giá Sản Phẩm</h4>
                    <div
                        className="row pb-4 pl-4 pt-3"
                        style={{ border: "1px solid #ee4d2d" }}>
                        <div className="col-3">
                            <div className="text-danger pl-2">
                        <span
                            style={{
                                fontSize: "2rem",
                                textDecoration: "underline",
                            }}>
                           {mediumStart}{" "}
                        </span>
                                <span style={{ fontSize: "1.25rem" }}>trên </span>
                                <span style={{ fontSize: "2rem" }}>5</span>
                            </div>
                            <div className="text-danger mt-1">
                                <Rating
                                    initialValue={mediumStart}
                                    readonly
                                    style={{ width: "100%", height: "50px" }}
                                />
                            </div>
                        </div>
                    </div>
                    {feedbackProduct &&
                        feedbackProduct.map((item) => (
                            <>
                                <div
                                    className="row mt-5 ml-1 mb-2 pl-4 pb-4"
                                    style={{ width: "100%" }}>
                                    <div className="col-1">
                                        <img
                                            src={item.avatar}
                                            alt=""
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "100%",
                                            }}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <h6>{item.fullName}</h6>
                                        <div className="text-danger">
                                            <Rating
                                                initialValue={item.assessment}
                                                readonly
                                                style={{ width: "100%", height: "50px" }}
                                            />
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "13px" }}>
                                            <p>{item.timeFeedback}</p>
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "15px",
                                                lineHeight: "9px",
                                            }}>
                                            <p>{item.reviews}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    );
}
