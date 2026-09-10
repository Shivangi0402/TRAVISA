import React from 'react';
// import Axios from 'axios';
// import Swal from 'sweetalert2';
// import {useForm} from "react-hook-form";


function Forgot() {
    // function Forgotpass() {
    // const email = document.getElementById("email").value;

    // Axios.post('http://localhost:2040/api/forgotpass', {
    //     email: email
    // }).then((response) => {
    //     if (response.data.success) {
    //         window.location = "/forgot";
    //     }
    //     else{
    //         alert("Success");
    //         window.location="/login"
    //     }
    //     });
    // };

  return (
    <section className="bg-light min-vh-100 py-5 mt-5 pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow p-4 bg-white">
              <h2 class="btn-heading">Forgot Password</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="button" class="submit-btn ">
                    Reset Password
                  </button>
                </div>

                <div className="text-center mt-4">
                  <a
                    href="/login"
                    className="bg-white border text-dark p-2 rounded text-decoration-none d-inline-block"
                  >
                    Remember your password? Back to login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgot;
