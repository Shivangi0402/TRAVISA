import React from "react";
function About(){
    return (
        <>
            <section class="about_section layout_padding">
            <div class="container">
            <div class="row">
            <div class="col-lg-6 px-0">
            <div class="img_container">
            <div class="img-box">
                <img src="assets/images/about-img.jpg" alt="" />
            </div>
            </div>
            </div>
            <div class="col-lg-6 px-0">
            <div class="detail-box">
            <div class="heading_container">
                <h2>Who Are We?</h2>
            </div>
            
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#000' }}>
            At <span style={{ fontWeight: 'bold', color: '#0729adff' }}>TRAVISA</span>, we are passionate explorers committed to making your travel dreams a reality. 
            From securing visas to offering expert guidance, <span style={{ fontWeight: 'bold', color: '#0729adff' }}>TRAVISA</span> simplifies the journey so you can focus on the adventure ahead.
            Whether you're traveling for leisure, work, or education, our mission is to provide fast, reliable, and hassle-free visa services tailored to your destination. 
            With a team of dedicated professionals and a deep understanding of global travel requirements, 
            <span style={{ fontWeight: 'bold', color: '#0729adff' }}>TRAVISA</span> is your trusted companion in crossing borders and discovering the world.
        </p>

            <div class="btn-box">
                <a href="/about">Read More</a>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
        </>
    )
};
export default About;