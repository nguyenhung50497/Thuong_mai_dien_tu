export default function Header() {
   return (
      <div className="row bg-light" style={{ zIndex: "0" }}>
         <div className="col-2"></div>
         <div className="col-8">
            <div className="row m-0 p-0">
               <div className="col-8 m-0 p-1">
                  <div
                     id="carouselExampleIndicators"
                     className="carousel slide"
                     data-ride="carousel">
                     <ol
                        className="carousel-indicators"
                        style={{ zIndex: "0" }}>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="0"
                           className="active"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="1"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="2"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="3"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="4"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="5"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="6"></li>
                        <li
                           data-target="#carouselExampleIndicators"
                           data-slide-to="7"></li>
                     </ol>
                     <div className="carousel-inner" style={{ zIndex: "0" }}>
                        <div className="carousel-item active">
                           <img
                              className="d-block w-100"
                              src="/img/banner-1.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="1"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-2.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="2"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-3.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="3"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-4.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="4"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-5.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="5"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-6.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="6"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-7.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="7"
                           />
                        </div>
                        <div className="carousel-item">
                           <img
                              className="d-block w-100"
                              src="/img/banner-8.png"
                              style={{ height: "250px", width: "100%" }}
                              alt="8"
                           />
                        </div>
                     </div>
                     <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                        style={{ zIndex: "0" }}>
                        <span
                           className="carousel-control-prev-icon"
                           aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                     </a>
                     <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                        style={{ zIndex: "0" }}>
                        <span
                           className="carousel-control-next-icon"
                           aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                     </a>
                  </div>
               </div>
               <div className="col-4 m-0 p-0">
                  <div className="p-1">
                     <img
                        src="/img/banner-9.png"
                        alt=""
                        style={{ width: "100%", height: "121px" }}
                     />
                  </div>
                  <div className="p-1">
                     <img
                        src="/img/banner-10.png"
                        alt=""
                        style={{ width: "100%", height: "121px" }}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="col-2"></div>
      </div>
   );
}
