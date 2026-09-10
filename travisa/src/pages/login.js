import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useForm} from "react-hook-form";

function Login() {

    const{
            register,
            handleSubmit,
            formState: {errors},
        }= useForm();

    const onSubmit =(data) =>{
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        Axios.post(`${process.env.REACT_APP_API_URL}/api/verify`,{
            email:email,password:password
        }) .then((response) =>
            {
                if(response.data.message){
                    Swal.fire({
                        title: 'Oops…',
                        text: response.data.msg,
                        icon: 'warning',
                        confirmButtonText: 'OK',
                }).then(() => {
                    window.location = '/login'
                });
            }
                else{
                    const user = {
                        name: response.data[0].name,
                        email: email,
                    };
                    localStorage.setItem('mydata', JSON.stringify(user));
                    Swal.fire({
                        title: 'Success!',
                        text: `Welcome ${response.data[0].name}`,
                        icon: 'success',
                        confirmButtonText: 'Continue',
                    }).then(() => {
                        window.location = '/';        
                    });
                }
            });

            }

return (
<section className="bg-light min-vh-100 py-5 mt-5 pt-5">

        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
            <div className="card shadow p-4 bg-white">
                <h2 className="text-center text-primary mb-4" class="btn-heading">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-3">
                    <label htmlFor="w3lName" className="form-label">
                    Your Name*
                    </label>
                    <input
                    type="text"
                    name="username"
                    id="name"
                    placeholder="Enter your name"
                    className="form-control"
                    {...register("username",{required:"Name is required!!",
                                            pattern: {
                                                value: /^[A-Za-z]+$/,
                                                message: "Only letters are allowed"
                                            }
                    })}
                    />
                    {errors.username && <p style={{color:'red',fontSize:"12px"}}>{errors.username.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="w3lSender" className="form-label">
                    Email*
                    </label>
                    <input
                    type="useremail"
                    name="w3lSender"
                    id="email"
                    placeholder="Enter your email"
                    className="form-control"
                    {...register("useremail",{required:"Email is required!!",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "@ and . is required"
                                            }
                    })}
                    />
                    {errors.useremail && <p style={{color:'red',fontSize:"12px"}}>{errors.useremail.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="w3lPassword" className="form-label">
                    Password*
                    </label>
                    <input
                    type="password"
                    name="userpassword"
                    id="password"
                    placeholder="Enter password"
                    className="form-control"
                    {...register("userpassword",{required:"Password is required!!",
                                                pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                                message: "Password must be atleast 8 characters,include a number, a special character, an uppercase and a lowercase letter."
                                            }
                    })}
                    />
                    {errors.userpassword && <p style={{color:'red',fontSize:"12px"}}>{errors.userpassword.message}</p>}
                </div>

                <div className="d-grid">
                    <button type="submit" class="submit-btn">
                    Login
                    </button>
                </div>
                <div className="mb-4 text-end">
                <a href="/forgot" class="btn-heading">
                Forgot Password?
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

export default Login;