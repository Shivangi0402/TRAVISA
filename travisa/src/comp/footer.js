import React from "react";

function Footer() {
    return (
    <>
        <section className="info_section">
        <div className="container">
            <div className="row">
            <div className="col-md-3 info_logo">
                <a className="navbar-brand" href="index.html"><span>TRAVISA</span></a>
                <p>We help you explore the world with ease. From visa assistance to travel tips, we’re your trusted partner in global journeys. Start your adventure with confidence — wherever life takes you.</p>
            </div>
            <div className="col-md-3 info_links">
                <h5>Useful Link</h5>
                <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="countries.html">Countries</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
            <div className="col-md-3 info_info">
                <h5>Contact Us</h5>
                <div className="info_contact">
                <a href="/contact"><i className="fa fa-map-marker"></i><span>Address: 123 Explorer Lane, Wanderlust City, World</span></a>
                <a href="/contact"><i className="fa fa-phone"></i><span>Phone: +91 9876543210</span></a>
                <a href="/contact"><i className="fa fa-envelope"></i><span>Email: support@travisa.com</span></a>
                </div>
            </div>
            <div className="col-md-3 info_form">
                <h5>Newsletter</h5>
                <form action="#"><input type="email" placeholder="Enter your email" /><button >Subscribe</button></form>
                <div className="social_box">
                <a href="/home"><i className="fa fa-facebook"></i></a>
                <a href="/home"><i className="fa fa-twitter"></i></a>
                <a href="/home"><i className="fa fa-youtube"></i></a>
                <a href="/home"><i className="fa fa-instagram"></i></a>
                </div>
            </div>
            </div>
        </div>
        </section>

        <footer className="container-fluid footer_section">
        <p>&copy; <span id="displayYear"></span> All Rights Reserved By <a href="https://html.design/">Free Html Templates</a></p>
        </footer>
    </>
    );
}

export default Footer;
