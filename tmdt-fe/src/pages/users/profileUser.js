import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {editProfile, showProfile} from "../../service/userService";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../upload/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import swal from "sweetalert";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    phoneUser: Yup.string()
        .required('Vui lòng điền vào mục này'),
});
export default function ProfileUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [file, setFile] = useState("");
    const [url, setUrl] = useState("");
    const [percent, setPercent] = useState(0);
    const idUser = useSelector(state => {
        if (state !== undefined) {
            return state.users.users.idUser
        }
    })
    const profile = useSelector(state => {
        if (state !== undefined) {
            return state.users.user.user
        }
    })
    const handleUpload = (event) => {
        setFile(event.target.files[0]);
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent);
        }, (err) => console.log(err), () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setUrl(url)
            });
        });
    };
    const handleProfile = (values) => {
        let data = {...values}
        data.avatar = url
        dispatch(editProfile(data)).then((check) => {
            if (check.payload === 'success') {
                swal("Chỉnh sửa thành công!")
                window.location.reload()
            }
        })
    }
    useEffect(() => {
        dispatch(showProfile(idUser))
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12" style={{marginTop: '20px', marginLeft: '20px'}}>
                            <h5>Hồ sơ của tôi</h5>
                        </div>
                        <div className="col-12" style={{marginLeft: '20px'}}>
                            <small>Quản lý thông tin hồ sơ để bảo mật tài khoản</small>
                        </div>
                        <div className="col-12">
                            <hr/>
                        </div>
                        <Formik initialValues={profile} validationSchema={SignupSchema} enableReinitialize={true} onSubmit={(values) => {
                            handleProfile(values)
                        }}>
                            <Form>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-2" style={{height: '420px', textAlign: 'right'}}>
                                            <div className="row">
                                                <div className="col-12" style={{marginTop: '30px'}}><p>Tên đăng nhập</p>
                                                </div>
                                                <div className="col-12" style={{marginTop: '35px'}}><p>Tên</p></div>
                                                <div className="col-12" style={{marginTop: '30px'}}><p>Email</p></div>
                                                <div className="col-12" style={{marginTop: '30px'}}><p>Số điện thoại</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-7" style={{height: '420px', textAlign: 'left'}}>
                                            <div className="row">
                                                <div className="col-12" style={{marginTop: '30px'}}>
                                                    <p>{profile !== undefined && profile.username}</p></div>
                                                <div className="col-12" style={{marginTop: '30px'}}><Field type="text"
                                                                                                           name={'fullName'}
                                                                                                           style={{
                                                                                                               width: '100%',
                                                                                                               height: '40px',
                                                                                                           }}/></div>
                                                <div className="col-12" style={{marginTop: '35px'}}><Field type="gmail"
                                                                                                           name={'emailUser'}
                                                                                                           style={{
                                                                                                               width: '100%',
                                                                                                               height: '40px'
                                                                                                           }}/></div>
                                                <div className="col-12" style={{marginTop: '30px'}}><Field type="text"
                                                                                                           name={'phoneUser'}
                                                                                                           style={{
                                                                                                               width: '100%',
                                                                                                               height: '40px'
                                                                                                           }}/>
                                                    <div style={{color: 'red'}}><ErrorMessage
                                                        name={'phoneUser'}/></div>
                                                </div>
                                                <div className="col-12" style={{marginTop: '30px'}}>
                                                    <button type={"submit"} style={{
                                                        width: '70px',
                                                        height: '40px',
                                                        backgroundColor: "rgb(238,77,45)",
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '5px'
                                                    }}>Lưu
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="col-12" style={{marginLeft: '20px', marginTop: '50px'}}>
                                                {url === '' ?
                                                    <>
                                                        <img src={profile !== undefined && profile.avatar} alt=""
                                                             width={'100px'} height={'100px'}
                                                             style={{borderRadius: '100%'}}/>
                                                    </>
                                                    :
                                                    <>
                                                        <img src={url} alt=""
                                                             width={'100px'} height={'100px'}
                                                             style={{borderRadius: '100%'}}/>
                                                    </>
                                                }
                                            </div>
                                            <div className="col-12">
                                        <span className="btn btn btn-file" style={{
                                            backgroundColor: 'white',
                                            border: '1px darkgray solid',
                                            marginLeft: '20px',
                                            marginTop: '10px'
                                        }}>
                                           Chọn ảnh<input type="file" onMouseOut={handleUpload}/>
                                        </span>
                                            </div>
                                            <div className="col-12" style={{marginLeft: '-10px', marginTop: '10px'}}>
                                                <small>Dụng lượng file tối đa 1 MB
                                                    Định dạng:.JPEG, .PNG</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}