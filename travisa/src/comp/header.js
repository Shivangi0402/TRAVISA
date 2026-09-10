import React from "react";

function Header(){
    
    function logout(){
        localStorage.clear();
        window.location = "/home";
    }


    let customer=JSON.parse(localStorage.getItem('mydata'));

    return(
    <>
        <header class="header_section">
    <div class="header_top">
      <div class="container-fluid">
        <div class="contact_link-container">
          <a href="/contact" class="contact_link1">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span>Panchmahal,Gujarat</span>
          </a>

          {
            localStorage.getItem("mydata") == null?
        <>
        <div class="d-lg-block d-none">
            <a href="/register" class="green-button">Register</a>
        </div>
        </>
        :
        <>
        <div class="d-lg-block d-none">
            <a href="/register" class="green-button">Welcome : {customer && customer.name}</a>
        </div>
        <div class="d-lg-block d-none">
            <a href="/home" class="green-button" onClick={logout}>Logout</a>
        </div>
        </>
        }

        </div>
      </div>
    </div>
    <div class="header_bottom">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
          <a class="navbar-brand" href="index.html">
            <span>TRAVISA</span>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span class=""></span>
          </button>
          <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/home">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/services">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/add">Add_Service</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/countries">Countries</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">Contact us</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
    </>
    )
};

export default Header;