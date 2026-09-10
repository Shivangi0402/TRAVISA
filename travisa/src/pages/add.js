import React, { useState } from "react";
import swal from "sweetalert2";
import Axios from "axios";
import './add.css';

function Add() {
  const [filename, setfilename] = useState("");

  const postdata = (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const price = document.getElementById("price").value;
    const desc = document.getElementById("desc").value;

    const formData = new FormData();
    formData.append("npimg", filename);
    formData.append("name", name);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("desc", desc);

    Axios.post(`${process.env.REACT_APP_API_URL}/api/postservice`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (response.data.msg) {
        swal.fire("Success!", response.data.msg, "success");
        window.location = "/add";
      } else {
        alert("Success");
        window.location = "/add";
      }
    });
  };

  return (
    <>
      <div className="add-bg">
        <div className="form-wrapper">
          <h2 className="form-title">Add Service</h2>
          <form className="add-form">
            <div className="form-grid">
              <input type="text" id="name" placeholder="Service Name" required />
              <input type="text" id="city" placeholder="City" required />
            </div>

            <div className="form-grid">
              <input type="number" id="price" placeholder="Price" required />
              <input type="text" id="desc" placeholder="Description" required />
            </div>

            <div className="form-group">
              <input
                type="file"
                className="file-input"
                onChange={(e) => setfilename(e.target.files[0])}
                required
              />
            </div>

            <div className="submit-wrapper">
              <button className="submit-btn" type="submit" onClick={postdata}>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
