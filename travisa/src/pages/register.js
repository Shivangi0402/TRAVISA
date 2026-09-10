import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const password = watch("userpassword");

    const onSubmit = (data) => {
        const { username, useremail, usermobile, userpassword } = data;

        Axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
            name: username,
            email: useremail,
            mobile: usermobile,
            password: userpassword
        })
        .then((response) => {
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                window.location = "/login";
            });
        })
        .catch((error) => {
            Swal.fire({
                title: 'Oops!',
                text: error.response?.data?.message || "Something went wrong!",
                icon: 'warning',
                confirmButtonText: 'OK',
            }).then(() => {
                window.location = "/register";
            });
        });
    };

    return (
        <section className="bg-light min-vh-100 py-5 mt-5 pt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow p-4 bg-white">
                            <h2 className="text-center btn-heading">Register</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Your Name*</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="form-control"
                                        {...register("username", {
                                            required: "Name is required!!",
                                            pattern: {
                                                value: /^[A-Za-z]+$/,
                                                message: "Only letters are allowed"
                                            }
                                        })}
                                    />
                                    {errors.username && <p style={{ color: 'red', fontSize: "12px" }}>{errors.username.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email*</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="form-control"
                                        {...register("useremail", {
                                            required: "Email is required!!",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Enter a valid email with @ and ."
                                            }
                                        })}
                                    />
                                    {errors.useremail && <p style={{ color: 'red', fontSize: "12px" }}>{errors.useremail.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mobile*</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        className="form-control"
                                        {...register("usermobile", {
                                            required: "Mobile Number is required!!",
                                            pattern: {
                                                value: /^\+?[1-9][0-9]{7,14}$/,
                                                message: "Only digits allowed, with optional +"
                                            }
                                        })}
                                    />
                                    {errors.usermobile && <p style={{ color: 'red', fontSize: "12px" }}>{errors.usermobile.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password*</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="form-control"
                                        {...register("userpassword", {
                                            required: "Password is required!!",
                                            pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                                message: "Password must be at least 8 chars, with uppercase, lowercase, number, and special character"
                                            }
                                        })}
                                    />
                                    {errors.userpassword && <p style={{ color: 'red', fontSize: "12px" }}>{errors.userpassword.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Confirm Password*</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="form-control"
                                        {...register("confirmpassword", {
                                            required: "Confirm Password is required!!",
                                            validate: (value) => value === password || "Passwords do not match"
                                        })}
                                    />
                                    {errors.confirmpassword && <p style={{ color: 'red', fontSize: "12px" }}>{errors.confirmpassword.message}</p>}
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="submit-btn">
                                        Submit
                                    </button>
                                </div>

                                <div className="text-center mt-4">
                                    <a href="/login" className="green-button">Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
