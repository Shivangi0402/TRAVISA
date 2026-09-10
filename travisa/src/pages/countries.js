import React from "react";
function Countries(){
    return(
        <>
            <section class="country_section layout_padding">
        <div class="container">
        <div class="heading_container heading_center">
        <h2>Choose Country</h2>
        <p style={{color:'white',fontSize:"25px"}}>Select country you want to apply visa for</p>
        </div>
        <div class="row">
        <div class="col-md-4"><a class="box"><img src="assets/images/c1.jpg"/><div class="detail-box"><h3>France</h3></div></a></div>
        <div class="col-md-4"><a  class="box"><img src="assets/images/c2.jpg"/><div class="detail-box"><h3>Canada</h3></div></a></div>
        <div class="col-md-4"><a  class="box"><img src="assets/images/c3.jpg"/><div class="detail-box"><h3>United States</h3></div></a></div>
        <div class="col-md-4"><a class="box"><img src="assets/images/c4.jpg"/><div class="detail-box"><h3>New Zealand</h3></div></a></div>
        <div class="col-md-4"><a  class="box"><img src="assets/images/c5.jpg"/><div class="detail-box"><h3>Australia</h3></div></a></div>
        <div class="col-md-4"><a  class="box"><img src="assets/images/c6.jpg"/><div class="detail-box"><h3>Spain</h3></div></a></div>
        </div>
    </div>
    </section>
        </>
    )
};
export default Countries;