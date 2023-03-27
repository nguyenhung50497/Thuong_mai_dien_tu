import React, {useState, useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import swal from 'sweetalert'
import {checkEmail, checkPhone, registerUser, userGoogle} from "../../service/userService";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(8, 'Quá Yếu')
        .max(30, 'Quá Dài'),
    password: Yup.string()
        .min(8, 'Quá Yếu')
        .max(30, 'Quá Dài')
        .required('Vui lòng điền vào mục này'),
});
export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [check1, setCheck1] = useState(false)
    const [phone, setPhone] = useState()
    const [emailUser, setEmailUser] = useState()
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    let image = 'https://cf.shopee.vn/file/ccc5f4f5e3ed83b6b2a85dfccd04209e_tn'
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    const handlePhone = async (values) => {
        await dispatch(checkPhone(values)).then((check) => {
            if (check.payload === 'not allowed') {
                swal('Số điện thoại đã được sử dụng')
                navigate('/register')
            } else {
                setPhone(values.phoneUser)
                setCheck(true)
                document.getElementById("create-course-form").reset();
            }
        })
    }
    const handleEmail = async (values) => {
        await dispatch(checkEmail(values)).then((check) => {
            if (check.payload === 'not allowed') {
                swal('Email đã được sử dụng')
                navigate('/register')
            } else {
                setEmailUser(values.emailUser)
                setCheck1(true)
                document.getElementById("create-course-form1").reset();
            }
        })
    }
    const handleRegister = async (values) => {
        let data = values
        data.avatar = image
        data.phoneUser = phone
        data.emailUser = emailUser
        if (data.username === undefined) {
            data.username = emailUser
        }
        await dispatch(registerUser(data)).then((check) => {
            console.log(check.payload)
            if (check.payload === 'success') {
                setCheck(false)
                setCheck1(false)
                navigate('/login')
                swal('Tạo tài khoản thành công')


            }
        })
    }
    useEffect(() => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );
    useEffect(() => {
        dispatch(userGoogle(profile)).then((check) => {
            if (check.payload.token !== undefined) {
                navigate('/')
            }
        })
    }, [profile])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div style={{paddingLeft: '352px', marginTop: '16px', marginBottom: '26px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                         className="bi bi-bag-heart-fill" viewBox="0 0 16 16"
                                         style={{color: 'rgb(238,77,45)'}}>
                                        <path
                                            d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                    </svg>
                                </div>
                                <div style={{
                                    paddingLeft: '5px',
                                    fontSize: '35px',
                                    marginTop: '16px',
                                    color: 'rgb(238,77,45)'
                                }}><p><b>HNH</b></p></div>
                                <div style={{paddingLeft: '30px', fontSize: '35px', marginTop: '16px'}}><p>Đăng ký</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{paddingLeft: '352px', marginTop: '26px', marginBottom: '26px'}}>
                            <a style={{textDecoration: 'none', color: 'rgb(238,77,45)', textAlign: 'center'}} href="">Bạn
                                cần giúp đỡ ?</a>
                        </div>
                    </div>
                </div>
                <div className="col-12" style={{backgroundColor: 'rgb(238,77,45)', height: '600px'}}>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col" style={{height: '600px'}}>
                            <div className="col" style={{paddingLeft: '126px', marginTop: '100px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor"
                                     className="bi bi-bag-heart-fill" viewBox="0 0 16 16" style={{color: 'white'}}>
                                    <path
                                        d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                </svg>
                            </div>
                            <div className="col" style={{fontSize: '60px', color: 'white', paddingLeft: '157px'}}><p>
                                <b>HNH</b></p></div>
                            <div className="col" style={{fontSize: '35px', color: 'white', paddingLeft: '143px'}}><p><b>Một
                                chạm</b></p></div>
                            <div className="col" style={{fontSize: '25px', color: 'white', paddingLeft: '64px'}}><p><b>mang
                                cả thế giới về với bạn</b></p></div>
                        </div>
                        <div className="col" style={{height: '600px',}}>
                            <div className="col" style={{
                                backgroundColor: 'white',
                                width: '380px',
                                height: '482px',
                                marginTop: '59px',
                                borderRadius: '10px'
                            }}>
                                <div className="row">
                                    <div className="col-11" style={{margin: '16px'}}>
                                        <div className="row">
                                            <div className="col-12" style={{marginTop: '20px'}}>
                                                <h4>Đăng ký</h4>
                                            </div>
                                            {check !== undefined && check === false ?
                                                <>
                                                    <div className="col-12" style={{marginTop: '10px'}}>
                                                        <Formik initialValues={{phoneUser: ''}} onSubmit={(values) => {
                                                            handlePhone(values).then()
                                                        }}>
                                                            <Form id={"create-course-form"}>
                                                                <div className="form-group" style={{marginTop: '30px'}}>
                                                                    <Field name={'phoneUser'} type="text"
                                                                           className="form-control"
                                                                           placeholder={'Số điện thoại'}
                                                                           style={{
                                                                               height: '50px',
                                                                               borderRadius: '5px'
                                                                           }}/>
                                                                </div>
                                                                <div className="form-group" style={{marginTop: '30px'}}>
                                                                    <button type="submit" className="btn btn-primary"
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '50px',
                                                                                backgroundColor: 'rgb(238,77,45)',
                                                                                border: 'none'
                                                                            }}>Tiếp theo
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <hr/>
                                                            </div>
                                                            <div className="col-2" style={{
                                                                textAlign: "center",
                                                                paddingRight: '10px',
                                                                color: 'rgba(33,37,41,0.5)'
                                                            }}><p>HOẶC</p></div>
                                                            <div className="col-5">
                                                                <hr/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="col-md-6" style={{marginLeft: '100px'}}>
                                                            <a className="btn btn-outline-dark" role="button"
                                                               onClick={() => login()}
                                                               style={{textTransform: 'none'}}>
                                                                <img width="20px"
                                                                     style={{marginBottom: '3px', marginRight: "5px"}}
                                                                     alt="Google sign-in"
                                                                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                                                                Google
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-12" style={{
                                                        marginTop: '10px',
                                                        textAlign: 'center',
                                                        fontSize: '15px'
                                                    }}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <small>Bằng việc đăng kí, bạn đã đồng ý với HNH
                                                                    về</small>
                                                            </div>
                                                            <div className="col-12" style={{color: 'rgb(238,77,45)'}}>
                                                                <small>Điều khoản dịch vụ & Chính sách bảo mật</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12" style={{marginTop: '10px'}}>
                                                        <div className="row">
                                                            <div className="col-7" style={{textAlign: 'right'}}><p
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginLeft: '30px',
                                                                    color: 'rgba(33,37,41,0.5)'
                                                                }}>Bạn đã có tài khoản</p></div>
                                                            <div className="col-5">
                                                                <Link to={'/login'} style={{
                                                                    textDecoration: 'none',
                                                                    color: 'rgb(238,77,45)',
                                                                    marginRight: '15px'
                                                                }}>Đăng nhập</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                : check1 !== undefined && check1 === false ?
                                                    <>
                                                        <div className="col-12" style={{marginTop: '10px'}}>
                                                            <Formik initialValues={{emailUser: ''}}
                                                                    onSubmit={(values) => {
                                                                        handleEmail(values).then()
                                                                    }}>
                                                                <Form id={"create-course-form1"}>
                                                                    <div className="form-group"
                                                                         style={{marginTop: '30px'}}>
                                                                        <Field name={'emailUser'} type="email"
                                                                               className="form-control"
                                                                               placeholder={'Email liên kết'}
                                                                               style={{
                                                                                   height: '50px',
                                                                                   borderRadius: '5px'
                                                                               }}/>
                                                                    </div>
                                                                    <div className="form-group"
                                                                         style={{marginTop: '30px'}}>
                                                                        <button type="submit"
                                                                                className="btn btn-primary" style={{
                                                                            width: '100%',
                                                                            height: '50px',
                                                                            backgroundColor: 'rgb(238,77,45)',
                                                                            border: 'none'
                                                                        }}>Tiếp theo
                                                                        </button>
                                                                    </div>
                                                                </Form>
                                                            </Formik>
                                                        </div>
                                                        <div className="col-12" style={{
                                                            marginTop: '10px',
                                                            textAlign: 'center',
                                                            fontSize: '15px'
                                                        }}>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <small>Bằng việc đăng kí, bạn đã đồng ý với HNH
                                                                        về</small>
                                                                </div>
                                                                <div className="col-12"
                                                                     style={{color: 'rgb(238,77,45)'}}>
                                                                    <small>Điều khoản dịch vụ & Chính sách bảo
                                                                        mật</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12" style={{marginTop: '10px'}}>
                                                            <div className="row">
                                                                <div className="col-7" style={{textAlign: 'right'}}><p
                                                                    style={{
                                                                        textAlign: "center",
                                                                        marginLeft: '30px',
                                                                        color: 'rgba(33,37,41,0.5)'
                                                                    }}>Bạn đã có tài khoản</p></div>
                                                                <div className="col-5">
                                                                    <Link to={'/login'} style={{
                                                                        textDecoration: 'none',
                                                                        color: 'rgb(238,77,45)',
                                                                        marginRight: '15px'
                                                                    }}>Đăng nhập</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="col-12" style={{marginTop: '20px'}}>
                                                            <Formik initialValues={{
                                                                phoneUser: '',
                                                                emailUser: '',
                                                                username: '',
                                                                password: '',
                                                                avatar: '',
                                                                fullName: ''
                                                            }} validationSchema={SignupSchema} onSubmit={(values) => {
                                                                handleRegister(values).then()
                                                            }}>
                                                                <Form id={"create-course-form1"}>
                                                                    <div className="form-group">
                                                                        <Field name={'username'} type="text"
                                                                               className="form-control"
                                                                               placeholder={'Tên đăng nhập'}
                                                                               style={{
                                                                                   height: '50px',
                                                                                   borderRadius: '5px'
                                                                               }}/>
                                                                        <div style={{color: 'red'}}><ErrorMessage
                                                                            name={'username'}/></div>
                                                                    </div>
                                                                    {/*<div className="form-group"*/}
                                                                    {/*     style={{marginTop: '30px'}}>*/}
                                                                    {/*    <Field name={'birthday'} type="text"*/}
                                                                    {/*           className="form-control"*/}
                                                                    {/*           placeholder={'Ngày sinh'}*/}
                                                                    {/*           onfocus="(this.type='date')"*/}
                                                                    {/*           style={{*/}
                                                                    {/*               height: '50px',*/}
                                                                    {/*               borderRadius: '5px'*/}
                                                                    {/*           }}/>*/}
                                                                    {/*</div>*/}
                                                                    <div className="form-group"
                                                                         style={{marginTop: '30px'}}>
                                                                        <Field name={'fullName'} type="text"
                                                                               className="form-control"
                                                                               placeholder={'Họ và Tên'}
                                                                               style={{
                                                                                   height: '50px',
                                                                                   borderRadius: '5px'
                                                                               }}/>
                                                                    </div>
                                                                    <div className="form-group"
                                                                         style={{marginTop: '30px'}}>
                                                                        <Field name={'password'} type="password"
                                                                               className="form-control"
                                                                               placeholder={'Mật khẩu'}
                                                                               style={{
                                                                                   height: '50px',
                                                                                   borderRadius: '5px'
                                                                               }}/>
                                                                        <div style={{color: 'red'}}><ErrorMessage
                                                                            name={'password'}/></div>
                                                                    </div>
                                                                    <div className="form-group"
                                                                         style={{marginTop: '30px'}}>
                                                                        <button type="submit"
                                                                                className="btn btn-primary"
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: '50px',
                                                                                    backgroundColor: 'rgb(238,77,45)',
                                                                                    border: 'none'
                                                                                }}>Đăng ký
                                                                        </button>
                                                                    </div>
                                                                </Form>
                                                            </Formik>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}