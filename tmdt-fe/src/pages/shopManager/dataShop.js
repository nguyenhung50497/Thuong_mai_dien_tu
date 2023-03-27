import React, {Component} from "react";
import {ResponsiveContainer, BarChart, Bar, XAxis, PieChart, Pie, Cell, YAxis,} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {sales} from "../../service/statsService";

export default function DataShop() {
    let {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [year, setYear] = useState("");
    const [quarter, setQuarter] = useState("");
    const [month, setMonth] = useState("");
    const [week, setWeek] = useState("");
    const [queryStringAPI, setQueryStringAPI] = useState("");
    const [productByCategory, setProductByCategory] = useState([])
    const [productDetail, setProductDetail] = useState([])
    const [totalSaleProduct, setTotalSaleProduct] = useState(0)
    const [totalQuantityProduct, setTotalQuantityProduct] = useState(0)
    const [check, setCheck] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [nameCategory, setNameCategory] = useState('')
    const handleAll = (values) => {

    }
    const cartDetail = useSelector((state) => {
        if (state.stats.sales !== undefined) {
            return state.stats.sales;
        }
    });
    let stats = [];
    for (let i = 0; i < cartDetail.length; i++) {
        if (cartDetail[i].idShop === +id) {
            stats.push(cartDetail[i]);
        }
    }
    let demoUrl =
        "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";
    const formatCurrency = (price) => {
        var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
        let priceWithCommas = price.toLocaleString();
        let arParts = String(priceWithCommas).split(DecimalSeparator);
        let intPart = arParts[0];
        var decPart = arParts.length > 1 ? arParts[1] : "";
        return intPart;
    };
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    //////////////////////////////////////////////////////////////////////////////////
    let sale = 0; // lấy tổng doanh số
    if (stats.length !== 0) {
        for (let i = 0; i < stats.length; i++) {
            sale += stats[i].priceInCart * stats[i].quantityCart;
        }
    }
    let outp = [...stats]; // tốp sản phẩm bán chạy
    if (stats.length > 0) {
        outp.sort(function (a, b) {
            return b.quantityCart - a.quantityCart;
        });
        outp.splice(5);
    }
    /////////////////////////////////////////////////////////////////////////////
    let allProductQuantity = 0; //lấy tổng số sản phầm
    if (stats.length !== 0) {
        for (let i = 0; i < stats.length; i++) {
            allProductQuantity += stats[i].quantityCart;
        }
    }
    //////////////////////////////////////////////////////////////////////////
    let category = [];
    let valueCategory = [];
    let quantityCategory = [];
    for (let i = 0; i < stats.length; i++) {
        category.push(stats[i].nameCategory);
        valueCategory.push(stats[i].priceInCart * stats[i].quantityCart);
        quantityCategory.push(stats[i].quantityCart);
    }

    let indicesCategory = [...new Set(category)];
    let indicesValueCategory = [];
    let indicesQuantityCategory = [];
    let temp1 = 0;
    let temp2 = 0;
    for (let i = 0; i < indicesCategory.length; i++) {
        temp1 = 0;
        temp2 = 0;
        for (let j = 0; j < category.length; j++) {
            if (category[j] === indicesCategory[i]) {
                temp1 += valueCategory[j];
                temp2 += quantityCategory[j];
            }
        }
        indicesValueCategory.push(temp1);
        indicesQuantityCategory.push(temp2);
    }
    let categoryStat = []; //thống kế doanh số theo danh mục
    for (let i = 0; i < indicesCategory.length; i++) {
        categoryStat.push({
                name: indicesCategory[i],
                value: indicesValueCategory[i],
                quantity: indicesQuantityCategory[i]
            }
        );
    }
    //////////////////////////////////////////////////////////////////////////////////
    const COLORS = [];
    const getRandomIntInclusive = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const getRandomHEX = () => {
        const r = getRandomIntInclusive(0, 255);
        const g = getRandomIntInclusive(0, 255);
        const b = getRandomIntInclusive(0, 255);

        const toHexa = (v) => v.toString(16).padStart(2, "0");
        return `#${toHexa(r)}${toHexa(g)}${toHexa(b)}`;
    };

    for (let i = 0; i < categoryStat.length; i += 1) {
        COLORS.push(` ${getRandomHEX()}`);
    }

    ///////////////////////////////////////////////////////////////////////////////

    let product = [];
    let valueProduct = [];
    let quantityProduct = [];
    let categoryProduct = []
    for (let i = 0; i < stats.length; i++) {
        product.push(stats[i].nameProduct);
        valueProduct.push(stats[i].priceInCart * stats[i].quantityCart);
        quantityProduct.push(stats[i].quantityCart)
        categoryProduct.push(stats[i].nameCategory);
    }

    let indicesProduct = [...new Set(product)];
    let indicesValueProduct = [];
    let indicesQuantityProduct = [];
    let indicesCategoryProduct = [...new Set(categoryProduct)]
    let x = 0;
    let y = 0;

    for (let i = 0; i < indicesProduct.length; i++) {
        x = 0;
        y = 0;
        for (let j = 0; j < product.length; j++) {
            if (product[j] === indicesProduct[i]) {
                x += valueProduct[j];
                y += quantityProduct[j];
            }
        }
        indicesValueProduct.push(x);
        indicesQuantityProduct.push(y);
    }
    let productStat = []; //thống kê doanh số theo sản phẩm
    for (let i = 0; i < indicesProduct.length; i++) {
        productStat.push({
            product: indicesProduct[i],
            total: indicesValueProduct[i],
            quantity: indicesQuantityProduct[i],
            category: indicesCategoryProduct[i]
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    function handleSubmit() {
        if (
            week !== "" &&
            month !== "" &&
            quarter !== "" &&
            year !== ""
        ) {
            let queryString = `week=${week}&month=${month}&quarter=${quarter}&year=${year}`;
            setQueryStringAPI(queryString);
        }
        if (
            week === "" &&
            month !== "" &&
            quarter !== "" &&
            year !== ""
        ) {
            let queryString = `month=${month}&quarter=${quarter}&year=${year}`;
            setQueryStringAPI(queryString);
        }
        if (
            week === "" &&
            month === "" &&
            quarter !== "" &&
            year !== ""
        ) {
            let queryString = `quarter=${quarter}&year=${year}`;
            setQueryStringAPI(queryString);
        }
        if (
            week === "" &&
            month === "" &&
            quarter === "" &&
            year !== ""
        ) {
            let queryString = `year=${year}`;
            setQueryStringAPI(queryString);
        }
        if ((week === "" && month === "" && quarter === "" && year === "") ||
            (week !== "" && month !== "" && quarter !== "" && year === "") ||
            (week !== "" && month !== "" && quarter === "" && year === "") ||
            (week !== "" && month === "" && quarter === "" && year === "")) {
            let queryString = undefined;
            setQueryStringAPI(queryString);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    let productCategory = []

    function handleChange(value) {
        setNameCategory(value)
        for (let i = 0; i < productStat.length; i++) {
            if (productStat[i].category === value) {
                productCategory.push(productStat[i])
            }
        }
        setProductByCategory(productCategory)
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    let products = []

    function handleProduct(value) {
        for (let i = 0; i < stats.length; i++) {
            if (stats[i].nameProduct === value) {
                products.push({
                    product: stats[i].nameProduct,
                    total: stats[i].priceInCart * stats[i].quantityCart,
                    quantity: stats[i].quantityCart,
                    date: stats[i].timeCartDetail
                })
            }
        }
        let a = []
        let b = 0
        let c = 0
        for (let i = 0; i < products.length; i++) {
            for (let j = i + 1; j < products.length; j++) {
                if (products[j].date === products[i].date) {
                    products[i].total += products[j].total;
                    products[i].quantity += products[j].quantity
                    products[j].product = ''
                }
            }
        }
        for (let i = 0; i < products.length; i++) {
            if (products[i].product !== '') {
                b += products[i].total
                c += products[i].quantity
                a.push(products[i])
            }
        }

        setTotalSaleProduct(b)
        setTotalQuantityProduct(c)
        setProductDetail(a)
        setCheck2(true)
    }

    /////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (queryStringAPI) {
            navigate("?" + queryStringAPI);
        }
        if (!queryStringAPI) {
            navigate("");
        }
    }, [queryStringAPI]);
    useEffect(() => {
        dispatch(sales(queryStringAPI));
    }, [queryStringAPI]);
    let initialValues = {
        week: "",
        month: "",
        quarter: "",
        year: "",
    };
    return (
        <>
            <div className="col-10" style={{width: "100%"}}>
                <div className="row">
                    <div className="col-12  bg-light">
                        <div className="row">
                            <div
                                className="col-2"
                                style={{paddingTop: "30px"}}>
                                <p>
                                    <b>Khung thời gian</b>
                                </p>
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "30px",
                                    marginLeft: "-100px",
                                }}>
                                Năm
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "18px",
                                    marginLeft: "-220px",
                                }}>
                                <div className="selectdiv3">
                                    <label>
                                        <select
                                            name="year"
                                            onChange={(e) => {
                                                setYear(e.target.value);
                                            }}>
                                            <option value=""></option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "30px",
                                    marginLeft: "-50px",
                                }}>
                                Qúy
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "18px",
                                    marginLeft: "-220px",
                                }}>
                                <div className="selectdiv3">
                                    <label>
                                        <select
                                            name="quarter"
                                            onChange={(e) => {
                                                setQuarter(e.target.value);
                                            }}>
                                            <option value=""></option>
                                            {year !== "" && (
                                                <>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </>
                                            )}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "30px",
                                    marginLeft: "-50px",
                                }}>
                                Tháng
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "18px",
                                    marginLeft: "-200px",
                                }}>
                                <div className="selectdiv3">
                                    <label>
                                        <select
                                            name="month"
                                            onChange={(e) => {
                                                setMonth(e.target.value);
                                            }}>
                                            <option value=""></option>
                                            {quarter === "1" && (
                                                <>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </>
                                            )}
                                            {quarter === "2" && (
                                                <>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </>
                                            )}
                                            {quarter === "3" && (
                                                <>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                </>
                                            )}
                                            {quarter === "4" && (
                                                <>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </>
                                            )}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "30px",
                                    marginLeft: "-50px",
                                }}>
                                Tuần
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "18px",
                                    marginLeft: "-200px",
                                }}>
                                <div className="selectdiv3">
                                    <label>
                                        <select
                                            name="week"
                                            onChange={(e) => {
                                                setWeek(e.target.value);
                                            }}>
                                            <option value=""></option>
                                            {month !== "" && (
                                                <>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </>
                                            )}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "30px",
                                    marginLeft: "-50px",
                                }}></div>
                            <div
                                className="col-2"
                                style={{
                                    paddingTop: "22px",
                                    marginLeft: "-220px",
                                }}>
                                <button
                                    type={"submit"}
                                    style={{
                                        width: "165px",
                                        height: "40px",
                                        backgroundColor: "rgb(238, 77, 45)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                    }}
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                 <span className="row">
                                    <div>
                                       <svg
                                           xmlns="http://www.w3.org/2000/svg"
                                           width="16"
                                           height="16"
                                           fill="currentColor"
                                           className="bi bi-search"
                                           viewBox="0 0 16 16"
                                           style={{
                                               marginLeft: "50px",
                                               marginRight: "5px",
                                               marginTop: "-5px",
                                           }}>
                                          <path
                                              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                       </svg>
                                    </div>
                                    <div>Tìm kiếm</div>
                                 </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="col-12"
                        style={{
                            background: "none",
                            width: "100%",
                            height: "20px",
                        }}></div>
                    <div className="col-12">
                        <div className="row">
                            <div className="bg-light" style={{width: "39%", height: "500px"}}>
                                <div className="row">
                                    <div style={{width: "70%", marginTop: '50px'}}>
                                        <h4 style={{textAlign: "center", marginBottom: '10px'}}>
                                            Doanh số theo các ngành
                                        </h4>
                                        <ResponsiveContainer width="100%" height="90%">
                                            <PieChart width={100} height={100}>
                                                <Pie
                                                    data={categoryStat}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderCustomizedLabel}
                                                    outerRadius={150}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {categoryStat && categoryStat.map((entry, index) => (
                                                        <Cell type={'submit'} key={`cell-${index}`}
                                                              fill={COLORS[index % COLORS.length]}
                                                              onClick={() => handleChange(entry.name)}/>
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div style={{width: "30%", marginLeft: '-20px'}}>
                                        <div className="row">
                                            <div className="col-12" style={{marginTop: '55px'}}><p><b>Chú thích</b></p>
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-1">
                                                        <div className="row">
                                                            {COLORS.map(item => (
                                                                <>
                                                                    <div className="col-2" style={{
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        marginTop: '10px',
                                                                        backgroundColor: `${item}`
                                                                    }}></div>

                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-10">
                                                        <div className="row">
                                                            {categoryStat.map(item => (
                                                                <>
                                                                    <div className="col-12"
                                                                         onClick={() => handleChange(item.name)}
                                                                         style={{marginTop: '6px'}}>{item.name}</div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "2%", height: "500px", background: "none"}}></div>
                            <div className="bg-light" style={{width: "59%", height: "500px"}}>
                                <div className="col-12" style={{padding: "10px"}}>
                                    <div className="row">
                                        <div className="col-12" style={{
                                            textAlign: "center",
                                            marginBottom: "10px",
                                            color: "rgb(238, 77, 45)",
                                        }}><h2>Nhóm sản phẩm của ngành {nameCategory}</h2></div>
                                        <div className="col-12">
                                            <table className="table table" style={{width: "100%", height: "400px"}}>
                                                <thead>
                                                <tr style={{
                                                    backgroundColor: "rgb(238, 77, 45)",
                                                    color: "white",
                                                    fontSize: "20px",
                                                }}>
                                                    <th scope="col" style={{textAlign: 'left'}}>Tên sản phẩm</th>
                                                    <th scope="col">Số lượt</th>
                                                    <th scope="col">Tổng doanh thu</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {productByCategory &&
                                                    productByCategory.map((item) => (
                                                        <>
                                                            <tr onClick={() => handleProduct(item.product)}
                                                                style={{fontSize: "18px"}}>
                                                                <td style={{textAlign: 'left'}}>{item.product}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.total && formatCurrency(item.total)}</td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{background: "none", width: "100%", height: "40px",}}></div>
                    <div className="col-12" style={{width: "100%"}}>
                        <div className="row">
                            <div className="bg-light" style={{width: "100%", height: "680px"}}>
                                <div className="row">
                                    {check2 === false ?
                                        <>
                                            <div className="col-12" style={{width: "100%", height: "100px"}}>
                                                <div className="row">
                                                    <div className="col-12"
                                                         style={{marginTop: "14px", marginLeft: "14px",}}>
                                                        <div className="row">
                                                            {check === true ?
                                                                <>
                                                                    <div className="col-2" style={{marginLeft: "24px"}}>
                                                                        <button
                                                                            type={"submit"}
                                                                            style={{
                                                                                width: "300px",
                                                                                height: "50px",
                                                                                background: "none",
                                                                                border: "1px gray solid",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            onClick={() => setCheck(false)}>
                                                                            <p
                                                                                className="col-12"
                                                                                style={{
                                                                                    marginTop: "8px",
                                                                                    marginLeft: "-60px",
                                                                                    fontSize: "20px",
                                                                                }}>
                                                                                Tổng doanh thu
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    marginTop: "-48px",
                                                                                    marginLeft: "150px",
                                                                                    fontSize: "20px",
                                                                                    color: "rgb(238, 77, 45)",
                                                                                }}>
                                                                                đ {sale && formatCurrency(sale)}
                                                                            </p>
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-3" style={{marginLeft: "200px"}}>
                                                                        <button
                                                                            type={"submit"}
                                                                            style={{
                                                                                width: "300px",
                                                                                height: "50px",
                                                                                background: "none",
                                                                                border: "1px gray solid",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            onClick={() => setCheck(true)}>
                                             <span className="row">
                                                <p
                                                    className="col-12"
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "-50px",
                                                        fontSize: "20px",
                                                        color: "rgb(238, 77, 45)",
                                                    }}>
                                                   Tổng sản phẩm bán
                                                </p>
                                                <p
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "-20px",
                                                        fontSize: "20px",
                                                        color: "rgb(238, 77, 45)",
                                                    }}>
                                                     {allProductQuantity && formatCurrency(allProductQuantity)}
                                                </p>
                                             </span>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="col-2" style={{marginLeft: "24px"}}>
                                                                        <button
                                                                            type={"submit"}
                                                                            style={{
                                                                                width: "300px",
                                                                                height: "50px",
                                                                                background: "none",
                                                                                border: "1px gray solid",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            onClick={() => setCheck(false)}>
                                                                            <p
                                                                                className="col-12"
                                                                                style={{
                                                                                    marginTop: "8px",
                                                                                    marginLeft: "-60px",
                                                                                    color: "rgb(238, 77, 45)",
                                                                                    fontSize: '20px'
                                                                                }}>
                                                                                Tổng doanh thu
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    marginTop: "-48px",
                                                                                    marginLeft: "150px",
                                                                                    fontSize: "20px",
                                                                                    color: "rgb(238, 77, 45)",
                                                                                }}>
                                                                                đ {sale && formatCurrency(sale)}
                                                                            </p>
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-3" style={{marginLeft: "200px"}}>
                                                                        <button
                                                                            type={"submit"}
                                                                            style={{
                                                                                width: "300px",
                                                                                height: "50px",
                                                                                background: "none",
                                                                                border: "1px gray solid",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            onClick={() => setCheck(true)}>
                                             <span className="row">
                                                <p
                                                    className="col-12"
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "-50px",
                                                        fontSize: "20px",
                                                    }}>
                                                   Tổng sản phẩm bán
                                                </p>
                                                <p
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "-20px",
                                                        fontSize: "20px",
                                                        color: "rgb(238, 77, 45)",
                                                    }}>
                                                     {allProductQuantity && formatCurrency(allProductQuantity)}
                                                </p>
                                             </span>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12"></div>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{height: "300px", marginTop: "-10px"}}>
                                                {check === false ? (
                                                    <>
                                                        <p
                                                            style={{
                                                                fontSize: "20px",
                                                                textAlign: "center",
                                                            }}>
                                                            Biểu đồ doanh thu tổng của sản phẩm
                                                            <b style={{color: "rgb(238, 77, 45)"}}>
                                                                (đơn vị VNĐ)
                                                            </b>
                                                        </p>
                                                        <ResponsiveContainer
                                                            width="100%"
                                                            aspect={3}>
                                                            <BarChart
                                                                data={productStat}
                                                                width={700}
                                                                height={700}
                                                                style={{fontSize: "15px"}}>
                                                                <XAxis dataKey="category"/>
                                                                <YAxis/>
                                                                <Bar dataKey="total" fill="#8883d8"/>
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p
                                                            style={{
                                                                fontSize: "20px",
                                                                textAlign: "center",
                                                            }}>
                                                            Biểu đồ tổng đã bán của sản phẩm
                                                        </p>
                                                        <ResponsiveContainer
                                                            width="100%"
                                                            aspect={3}>
                                                            <BarChart
                                                                data={productStat}
                                                                width={600}
                                                                height={600}>
                                                                <XAxis dataKey="category"/>
                                                                <YAxis/>
                                                                <Bar
                                                                    dataKey="quantity"
                                                                    fill="#8883d8"
                                                                />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="col-12" style={{width: "100%", height: "100px"}}>
                                                <div className="row">
                                                    <div
                                                        className="col-12"
                                                        style={{
                                                            marginTop: "14px",
                                                            marginLeft: "14px",
                                                        }}>
                                                        <div className="row">
                                                            <div
                                                                className="col-2"
                                                                style={{marginLeft: "24px"}}>
                                                                <button
                                                                    type={"submit"}
                                                                    style={{
                                                                        width: "300px",
                                                                        height: "50px",
                                                                        background: "none",
                                                                        border: "1px gray solid",
                                                                        borderRadius: "5px",
                                                                    }}
                                                                    onClick={() => setCheck(false)}>
                                                                    <p
                                                                        className="col-12"
                                                                        style={{
                                                                            marginTop: "10px",
                                                                            marginLeft: "-60px",
                                                                        }}>
                                                                        Tổng doanh thu
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            marginTop: "-42px",
                                                                            marginLeft: "150px",
                                                                            fontSize: "20px",
                                                                            color: "rgb(238, 77, 45)",
                                                                        }}>
                                                                        đ {totalSaleProduct && formatCurrency(totalSaleProduct)}
                                                                    </p>
                                                                </button>
                                                            </div>
                                                            <div
                                                                className="col-3"
                                                                style={{marginLeft: "200px"}}>
                                                                <button
                                                                    type={"submit"}
                                                                    style={{
                                                                        width: "300px",
                                                                        height: "50px",
                                                                        background: "none",
                                                                        border: "1px gray solid",
                                                                        borderRadius: "5px",
                                                                    }}
                                                                    onClick={() => setCheck(true)}>
                                             <span className="row">
                                                <p
                                                    className="col-12"
                                                    style={{
                                                        marginTop: "10px",
                                                        marginLeft: "-50px",
                                                    }}>
                                                   Tổng sản phẩm bán
                                                </p>
                                                <p
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "-20px",
                                                        fontSize: "20px",
                                                        color: "rgb(238, 77, 45)",
                                                    }}>
                                                    {totalQuantityProduct &&
                                                        formatCurrency(
                                                            totalQuantityProduct
                                                        )}
                                                </p>
                                             </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12"></div>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{height: "300px", marginTop: "-10px"}}>
                                                {check === false ? (
                                                    <>
                                                        <p
                                                            style={{
                                                                fontSize: "20px",
                                                                textAlign: "center",
                                                            }}>
                                                            Biểu đồ doanh thu tổng của {productDetail[0].product}
                                                            <b style={{color: "rgb(238, 77, 45)"}}>
                                                                (đơn vị VNĐ)
                                                            </b>
                                                        </p>
                                                        <ResponsiveContainer
                                                            width="100%"
                                                            aspect={3}>
                                                            <BarChart
                                                                data={productDetail}
                                                                width={700}
                                                                height={700}
                                                                style={{fontSize: "15px"}}>
                                                                <XAxis dataKey="date"/>
                                                                <YAxis/>
                                                                <Bar dataKey="total" fill="#8883d8"/>
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p
                                                            style={{
                                                                fontSize: "20px",
                                                                textAlign: "center",
                                                            }}>
                                                            Biểu đồ tổng đã bán của {productDetail[0].product}
                                                        </p>
                                                        <ResponsiveContainer
                                                            width="100%"
                                                            aspect={3}>
                                                            <BarChart
                                                                data={productDetail}
                                                                width={600}
                                                                height={600}>
                                                                <XAxis dataKey="date"/>
                                                                <YAxis/>
                                                                <Bar
                                                                    dataKey="quantity"
                                                                    fill="#8883d8"
                                                                />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
