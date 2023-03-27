import NavbarShop from "../../components/NavbarShop";
import {Link, Outlet, useParams} from "react-router-dom";
import Footer from "../../components/Footer";
import {useState} from "react";

export default function ShopManager() {
    const [color, setColor] = useState(0)
    let {id} = useParams()
    return (
        <>
            <NavbarShop/>
            <>
                <div className="row mt-2">
                    <div className="col-2 ">
                        <div className="col-10 bg-light" style={{height: '100%'}}>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '20px'}}>
                                    {color && color == 1 ?
                                        <>
                                            <Link to={'cart/' + id}
                                                  style={{textDecoration: "none", color: 'rgb(238, 77, 45)'}}
                                                  onClick={() => setColor(1)}>
                                                <div className={'shopManager'}>
                                                    <div className="row">
                                                        <div className="col-1" style={{textAlign: 'right'}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                 height="16"
                                                                 fill="currentColor"
                                                                 className="bi bi-clipboard" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                                                <path
                                                                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="col-10" style={{
                                                            fontWeight: '600',
                                                            marginTop: '2px',
                                                            marginLeft: '-10px'
                                                        }}><p>Quản Lý Đơn Hàng</p></div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <Link to={'cart/' + id} style={{textDecoration: "none", color: 'gray'}}
                                                  onClick={() => setColor(1)}>
                                                <div className={'shopManager'}>
                                                    <div className="row">
                                                        <div className="col-1" style={{textAlign: 'right'}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                 height="16"
                                                                 fill="currentColor"
                                                                 className="bi bi-clipboard" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                                                <path
                                                                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="col-10" style={{
                                                            fontWeight: '600',
                                                            marginTop: '2px',
                                                            marginLeft: '-10px'
                                                        }}><p>Quản Lý Đơn Hàng</p></div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    }
                                </div>
                                <div className="col-12" style={{marginTop: '15px'}}>
                                    {color && color == 2 ?
                                        <>
                                            <Link to={''} style={{textDecoration: "none", color: 'rgb(238, 77, 45)'}}
                                                  onClick={() => setColor(2)}>
                                                <div className="row">
                                                    <div className="col-1" style={{textAlign: 'right'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor"
                                                             className="bi bi-handbag" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="col-10" style={{
                                                        fontWeight: '600',
                                                        color: 'rgb(238, 77, 45)',
                                                        marginTop: '2px',
                                                        marginLeft: '-10px'
                                                    }}><p>Quản Lý Sản Phẩm</p></div>
                                                </div>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <Link to={''} style={{textDecoration: "none", color: 'gray'}}
                                                  onClick={() => setColor(2)}>
                                                <div className="row">
                                                    <div className="col-1" style={{textAlign: 'right'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor"
                                                             className="bi bi-handbag" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="col-10" style={{
                                                        fontWeight: '600',
                                                        color: 'gray',
                                                        marginTop: '2px',
                                                        marginLeft: '-10px'
                                                    }}><p>Quản Lý Sản Phẩm</p></div>
                                                </div>
                                            </Link>
                                        </>
                                    }
                                </div>
                                <div className="col-12" style={{marginTop: '15px'}}>
                                    {color && color == 3 ?
                                        <>
                                            <Link to={'data'}
                                                  style={{textDecoration: "none", color: 'rgb(238, 77, 45)'}}
                                                  onClick={() => setColor(3)}>
                                                <div className="row">
                                                    <div className="col-1" style={{textAlign: 'right'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor"
                                                             className="bi bi-graph-up" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd"
                                                                  d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="col-10" style={{
                                                        fontWeight: '600',
                                                        color: 'rgb(238, 77, 45)',
                                                        marginTop: '2px',
                                                        marginLeft: '-10px'
                                                    }}><p>Dữ Liệu</p></div>
                                                </div>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <Link to={'data'} style={{textDecoration: "none", color: 'gray'}}
                                                  onClick={() => setColor(3)}>
                                                <div className="row">
                                                    <div className="col-1" style={{textAlign: 'right'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor"
                                                             className="bi bi-graph-up" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd"
                                                                  d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="col-10" style={{
                                                        fontWeight: '600',
                                                        color: 'gray',
                                                        marginTop: '2px',
                                                        marginLeft: '-10px'
                                                    }}><p>Dữ Liệu</p></div>
                                                </div>
                                            </Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet></Outlet>
                    <div className="col-2"></div>
                </div>
            </>
            <Footer/>
        </>
    )
}