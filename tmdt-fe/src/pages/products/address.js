import axios from "axios";
import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistricts, getProvinces } from "../../service/addressService";

export default function Address() {
   const [province, setProvince] = useState("");
   const [district, setDistrict] = useState("");
   const dispatch = useDispatch();
   const provinces = useSelector((state) => {
      return state.address.provinces;
   });
   const districts = useSelector((state) => {
      return state.address.districts;
   });

   const handleProvince = (value) => {
      for (let i of provinces) {
         if (i.province_name == value) {
            dispatch(getDistricts(i.province_id));
         }
      }
   };
   const handleSubmit = (values) => {
      let data = district + " - " + province;
      console.log(data);
   };
   useEffect(() => {
      dispatch(getProvinces());
   }, []);
   return (
      <>
         <div className="row mt-5">
            <div className="col-2"></div>
            <div className="col-8 text-center">
                  <form>
                     <select
                        onChange={(e) => {
                           handleProvince(e.target.value);
                           setProvince(e.target.value);
                        }}>
                        <option value="">Chọn Tỉnh/Thành Phố</option>
                        {provinces &&
                           provinces.map((item, key) => (
                              <>
                                 <option value={item.province_name}>
                                    {item.province_name}
                                 </option>
                              </>
                           ))}
                     </select>
                     <select
                        onChange={(e) => {
                           setDistrict(e.target.value);
                        }}>
                        <option value="">Chọn Quận/Huyện</option>
                        {districts &&
                           districts.map((item, key) => (
                              <>
                                 <option value={item.district_name}>
                                    {item.district_name}
                                 </option>
                              </>
                           ))}
                     </select>
                     <button className="muaHang" onSubmit={(values) => {
                     handleSubmit(values);
                  }}>Address</button>
                  </form>
            </div>
            <div className="col-2"></div>
         </div>
      </>
   );
}
