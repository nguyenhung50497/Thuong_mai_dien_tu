import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {changePassword, checkPassword} from "../../service/userService";
import swal from "sweetalert";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Quá Yếu')
        .max(30, 'Quá Dài')
        .required('Vui lòng điền vào mục này'),
    confirmPassword: Yup.string()
        .min(8, 'Quá Yếu')
        .max(30, 'Quá Dài')
        .required('Vui lòng điền vào mục này')
        .oneOf([Yup.ref('password')], 'Mật khẩu chưa trùng khớp')
});
export default function Password() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let {id} = useParams()
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [check, setCheck] = useState(false)
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    const handleCheckPassword = async (values) => {
        let data = {...values}
        data.idUser = id
        await dispatch(checkPassword(data)).then(check => {
            if (check.payload === 'wrong password') {
                swal('Mật khẩu cũ không chính xác')
            } else {
                setCheck(true)
            }
        })
    }
    const handleChangePassword = async (values) => {
        let data = {password: values.password, idUser: id}
        await dispatch(changePassword(data)).then(check => {
            if(check.payload === 'success') {
                swal('Thay đổi mật khẩu thành công')
                navigate('/account')
            }
        })
    }
    const person = useSelector(state => {
        if (state !== undefined) {
            return state.users.user.user
        }
    })
    const handleCheckUser = async (values) => {
        if (values.email === person.emailUser) {
            setCheck(true)
        } else {
            swal('Email không chính xác')
        }
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
                        handleCheckUser(res.data).then()
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12" style={{marginTop: '20px', marginLeft: '20px'}}>
                            <h5>Mật khẩu của bạn</h5>
                        </div>
                        <div className="col-12" style={{marginLeft: '20px'}}>
                            <small>Quản lý mật khẩu của bạn để bảo mật tài khoản</small>
                        </div>
                        <div className="col-12">
                            <hr/>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {check === false ?
                                    <>
                                        <div className="col-6" style={{height: '400px'}}>
                                            <Formik initialValues={{password: '', idUser: ''}} onSubmit={(values) => {
                                                handleCheckPassword(values)
                                            }}>
                                                <Form>
                                                    <div className="col-12"
                                                         style={{textAlign: "center", marginTop: '110px'}}>
                                                        <h5>Mật khẩu cũ của bạn</h5></div>
                                                    <div className="col-12" style={{marginTop: '30px'}}>
                                                        <Field type="text" name={'password'} style={{
                                                            width: '100%',
                                                            height: '40px'
                                                        }}/>
                                                    </div>
                                                    <div className="col-12"
                                                         style={{marginTop: '40px', textAlign: 'center'}}>
                                                        <button type={"submit"} className={'password'} style={{}}>Tiếp
                                                            theo <svg
                                                                xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16"
                                                                fill="currentColor" className="bi bi-caret-right"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="col-10" style={{height: '400px'}}>
                                            <div className="col-12"
                                                 style={{textAlign: "center", marginTop: '60px'}}></div>
                                            <Formik initialValues={{password: '', idUser: ''}} validationSchema={PasswordSchema} onSubmit={(values) => {
                                                handleChangePassword(values).then()
                                            }}>
                                                <Form>
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="col-12"
                                                                     style={{marginTop: '55px', textAlign: 'right'}}>
                                                                    <p>Mật khẩu mới của bạn: </p>
                                                                </div>
                                                                <div className="col-12"
                                                                     style={{marginTop: '95px', textAlign: 'right'}}>
                                                                    <p>Nhập lại :</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-8">
                                                                <div className="col-12" style={{marginTop: '50px', height: '40px'}}>
                                                                    <Field
                                                                        name={'password'}
                                                                           type="password" style={{
                                                                        width: '100%',
                                                                        height: '40px',
                                                                    }}/>
                                                                </div>
                                                                <div className="col-12"
                                                                     style={{marginTop: '10px',color: 'red', height: '20px'}}><ErrorMessage name={'password'}/>
                                                                </div>
                                                                <div className="col-12" style={{marginTop: '40px', height: '40px'}}>
                                                                    <Field
                                                                        name={'confirmPassword'} type="password" style={{
                                                                        width: '100%',
                                                                        height: '40px',
                                                                    }}/>
                                                                </div>
                                                                <div className="col-12"
                                                                     style={{marginTop: '10px',color: 'red', height: '20px'}}><ErrorMessage name={'confirmPassword'}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12"
                                                         style={{marginTop: '30px', textAlign: 'center'}}>
                                                        <button type={"submit"} className={'password'} style={{}}>Lưu
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                 height="16"
                                                                 fill="currentColor" className="bi bi-check-lg"
                                                                 viewBox="0 0 16 16">
                                                                <path
                                                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                        <div className="col-2"></div>
                                    </>
                                }
                                {person !== undefined && person.idGoogle !== '' && check === false ?
                                    <>
                                        <div className="col-6" style={{height: '400px'}}>
                                            <div className="row" style={{marginTop: '100px'}}>
                                                <div className="col-12">
                                                    <p style={{textAlign: 'center'}}>Bạn đăng nhập vào google lần đầu
                                                        hãy xác minh google</p>
                                                    <p style={{textAlign: 'center'}}> của bạn trước:</p>
                                                </div>
                                                <div className="col-12" style={{textAlign: 'center'}}>
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
                                        </div>
                                    </>
                                    : check !== true ?
                                        <>
                                            <div className="col-6" style={{height: '400px'}}>
                                                <div className="row">
                                                    <div className={'col-12'}
                                                         style={{paddingTop: '20px', paddingLeft: '166px'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"
                                                             fill="currentColor"
                                                             className="bi bi-bag-heart-fill" viewBox="0 0 16 16"
                                                             style={{color: 'rgb(238,77,45)'}}>
                                                            <path
                                                                d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                                        </svg>
                                                    </div>
                                                    <div className={'col-12'} style={{
                                                        paddingLeft: '166px',
                                                        fontSize: '65px',
                                                        paddingTop: '36px',
                                                        color: 'rgb(238,77,45)'
                                                    }}><p><b>HNH</b></p></div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}