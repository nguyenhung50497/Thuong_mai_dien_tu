import Navbar from "../../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {showProfile} from "../../service/userService";
import {useEffect, useState} from "react";
import {findByIdUserShop} from "../../service/shopService";
import Footer from "../../components/Footer";

export default function AccountUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [check, setCheck] = useState(0)
    const idUser = useSelector((state) => {
        if (state !== undefined) {
            return state.users.users.idUser;
        }
    });
    const profile = useSelector((state) => {
        if (state !== undefined) {
            return state.users.user.user;
        }
    });
    const shop = useSelector((state) => {
        if (state.shops.shop !== undefined) {
            return state.shops.shop;
        }
    });
    useEffect(() => {
        dispatch(showProfile(idUser));
    }, []);
    useEffect(() => {
        dispatch(findByIdUserShop(idUser), []);
    });
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Navbar/>
                </div>
                <div
                    className="col-12"
                    style={{
                        backgroundColor: "rgb(237,237,237)",
                        height: "600px",
                        marginTop: "120px",
                    }}>
                    <div className="row">
                        <div className="col-2" style={{height: "600px"}}></div>
                        <div className="col-8" style={{height: "600px"}}>
                            <div className="row">
                                <div className="col-2" style={{height: "550px", marginTop: "20px"}}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <img
                                                        src={
                                                            profile !== undefined &&
                                                            profile.avatar
                                                        }
                                                        alt=""
                                                        width={"48px"}
                                                        height={"48px"}
                                                        style={{
                                                            borderRadius: "100%",
                                                            marginTop: "20px",
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <p
                                                                style={{
                                                                    marginTop: "30px",
                                                                    marginLeft: "-50px",
                                                                }}>
                                                                <b>
                                                                    {profile !== undefined &&
                                                                        profile.fullName}
                                                                </b>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12"
                                             style={{marginTop: "30px"}}>
                                            <div className="row">
                                                <div className="col-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="25"
                                                        height="25"
                                                        fill="currentColor"
                                                        className="bi bi-person"
                                                        style={{color: "blue"}}
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                    </svg>
                                                </div>
                                                <div
                                                    className="col-10"
                                                    style={{marginTop: "5px"}}>
                                                    Tài khoản của tôi
                                                </div>
                                            </div>
                                        </div>
                                        {check == 0 ?
                                            <>
                                                <div className="col-12" onClick={() => setCheck(0)}
                                                     style={{marginTop: "10px"}}>
                                                    <div className="row">
                                                        <div className="col-2"></div>
                                                        <div
                                                            className="col-10"
                                                            style={{marginTop: "5px"}}>
                                                            <Link
                                                                to={"/account"}
                                                                style={{
                                                                    color: 'rgb(238, 77, 45)',
                                                                    textDecoration: "none",
                                                                }}>
                                                                Hồ sơ
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-12" onClick={() => setCheck(0)}
                                                     style={{marginTop: "10px"}}>
                                                    <div className="row">
                                                        <div className="col-2"></div>
                                                        <div
                                                            className="col-10"
                                                            style={{marginTop: "5px"}}>
                                                            <Link
                                                                to={"/account"}
                                                                style={{
                                                                    color: "black",
                                                                    textDecoration: "none",
                                                                }}>
                                                                Hồ sơ
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {check == 1 ?
                                            <>
                                                <div className="col-12" onClick={() => setCheck(1)}
                                                     style={{marginTop: "10px"}}>
                                                    <div className="row">
                                                        <div className="col-2"></div>
                                                        <div
                                                            className="col-10"
                                                            style={{marginTop: "5px"}}>
                                                            <Link
                                                                to={"address/" + idUser}
                                                                style={{
                                                                    color: 'rgb(238, 77, 45)',
                                                                    textDecoration: "none",
                                                                }}>
                                                                Địa chỉ
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-12" onClick={() => setCheck(1)}
                                                     style={{marginTop: "10px"}}>
                                                    <div className="row">
                                                        <div className="col-2"></div>
                                                        <div
                                                            className="col-10"
                                                            style={{marginTop: "5px"}}>
                                                            <Link
                                                                to={"address/" + idUser}
                                                                style={{
                                                                    color: "black",
                                                                    textDecoration: "none",
                                                                }}>
                                                                Địa chỉ
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {check == 2 ?
                                            <>
                                                <div className="col-12" onClick={() => setCheck(2)}
                                                     style={{marginTop: "10px"}}>
                                                    <div className="row">
                                                        <div className="col-2"></div>
                                                        <div
                                                            className="col-10"
                                                            style={{marginTop: "5px"}}>
                                                            <Link
                                                                to={"password/" + idUser}
                                                                style={{
                                                                    color: 'rgb(238, 77, 45)',
                                                                    textDecoration: "none",
                                                                }}>
                                                                Đổi mật khẩu
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-12" onClick={() => setCheck(2)}
                                                     style={{marginTop: "10px"}}>
                                                    <div className="row">
                                                        <div className="col-2"></div>
                                                        <div
                                                            className="col-10"
                                                            style={{marginTop: "5px"}}>
                                                            <Link
                                                                to={"password/" + idUser}
                                                                style={{
                                                                    color: "black",
                                                                    textDecoration: "none",
                                                                }}>
                                                                Đổi mật khẩu
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        <div className="col-12" style={{marginTop: "20px"}}>
                                            {profile !== undefined && profile.role === "user" && shop != undefined ?
                                                <>
                                                    <Link to={`/shopInterface/${shop.idShop}`}
                                                          style={{color: "black", textDecoration: "none",}}>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="25"
                                                                    height="25"
                                                                    fill="currentColor"
                                                                    className="bi bi-shop-window"
                                                                    color={"blue"}
                                                                    viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                                                </svg>
                                                            </div>
                                                            <div
                                                                className="col-10"
                                                                style={{marginTop: "5px"}}>
                                                                Cửa hàng của bạn
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </>
                                                :
                                                <>
                                                    {check == 3 ?
                                                        <>
                                                            <Link onClick={() => setCheck(3)}
                                                                  to={"shop/" + idUser}
                                                                  style={{
                                                                      color: 'rgb(238, 77, 45)',
                                                                      textDecoration: "none",
                                                                  }}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="25"
                                                                            height="25"
                                                                            fill="currentColor"
                                                                            className="bi bi-shop-window"
                                                                            color={'rgb(238, 77, 45)'}
                                                                            viewBox="0 0 16 16">
                                                                            <path
                                                                                d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                                                        </svg>
                                                                    </div>
                                                                    <div
                                                                        className="col-10"
                                                                        style={{
                                                                            marginTop: "5px",
                                                                            color: 'rgb(238, 77, 45)'
                                                                        }}>
                                                                        Trở thành nhà bán hàng
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </>
                                                        :
                                                        <>
                                                            <Link onClick={() => setCheck(3)}
                                                                  to={"shop/" + idUser}
                                                                  style={{
                                                                      color: "black",
                                                                      textDecoration: "none",
                                                                  }}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="25"
                                                                            height="25"
                                                                            fill="currentColor"
                                                                            className="bi bi-shop-window"
                                                                            color={"blue"}
                                                                            viewBox="0 0 16 16">
                                                                            <path
                                                                                d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                                                        </svg>
                                                                    </div>
                                                                    <div
                                                                        className="col-10"
                                                                        style={{marginTop: "5px"}}>
                                                                        Trở thành nhà bán hàng
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                        {profile !== undefined && profile.role === "user" && shop != undefined && (
                                            <>
                                                {check == 4 ?
                                                    <>
                                                        <div className="col-12" onClick={() => setCheck(4)} style={{marginTop: "20px"}}>
                                                            <Link  to={`/account/edit-shop/${shop.idShop}`}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25"
                                                                             height="25" fill="currentColor"
                                                                             color={'rgb(238, 77, 45)'}
                                                                             className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                            <path
                                                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                            <path fill-rule="evenodd"
                                                                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                        </svg>
                                                                    </div>
                                                                    <div
                                                                        className="col-10"
                                                                        style={{marginTop: "4px"}}>
                                                                        <Link style={{
                                                                                textDecoration: "none",
                                                                                color: 'rgb(238, 77, 45)',
                                                                            }}>
                                                                            Chỉnh sửa cửa hàng
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="col-12" onClick={() => setCheck(4)} style={{marginTop: "20px"}}>
                                                            <Link to={'/feedback'}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25"
                                                                             height="25" fill="currentColor"
                                                                             className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                            <path
                                                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                            <path fill-rule="evenodd"
                                                                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                        </svg>
                                                                    </div>
                                                                    <div
                                                                        className="col-10"
                                                                        style={{marginTop: "4px"}}>
                                                                        <Link
                                                                            to={`/account/edit-shop/${shop.idShop}`}
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "black",
                                                                            }}>
                                                                            Chỉnh sửa cửa hàng
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-9" style={{
                                    backgroundColor: "white",
                                    height: "550px",
                                    marginTop: "20px",
                                    borderRadius: "10px",
                                }}>
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                        <div className="col-2" style={{height: "600px"}}></div>
                    </div>
                </div>
                <div className="col-12">
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
