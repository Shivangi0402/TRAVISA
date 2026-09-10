import React, { useEffect, useState } from "react";
import Axios from "axios";

function Services() {
  const [list, setList] = useState([]); // All services from DB
  const [filteredList, setFilteredList] = useState([]); // Filtered services by visa type
  const [selectedVisaName, setSelectedVisaName] = useState(""); // Currently selected visa type

  // Fetch all services from database on component mount
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/service_get`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setList(response.data);
        } else {
          console.error("Not an array:", response.data);
          setList([]);
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
        setList([]);
      });
  }, []);

  // When "Check Out" is clicked
  const handleCheckout = (visaName) => {
    const matches = list.filter(
      (item) => item.name.toLowerCase() === visaName.toLowerCase(),
    );
    setFilteredList(matches);
    setSelectedVisaName(visaName);
  };

  // Go back to visa options
  const handleBack = () => {
    setFilteredList([]);
    setSelectedVisaName("");
  };

  // Static visa type list for initial UI
  const visaTypes = [
    {
      title: "Work Visa",
      img: "assets/images/s2.png",
      description:
        "A Work Visa permits foreign nationals to work legally in another country, usually tied to a specific employer or job offer.",
    },
    {
      title: "Tourist Visa",
      img: "assets/images/s3.png",
      description:
        "A Tourist Visa is issued for leisure travel, allowing individuals to explore, relax, or visit friends and family in a foreign country.",
    },
    {
      title: "Student Visa",
      img: "assets/images/s4.png",
      description:
        "A Student Visa is granted to those who wish to pursue academic studies or educational training in a recognized institution abroad.",
    },
  ];

  var bookdest = (id, price) => {
    var merchant_order_id = "123";
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: price * 100, // 2000 paise = INR 20
      name: "IT",
      description: "Booking for destination.",

      currency: "INR",
      netbanking: true,
      prefill: {
        name: "Shivangi Sinha",
        email: "shivangi.bgp2004@gmail.com",
        contact: 8128399635,
      },
      notes: {
        soolegal_order_id: merchant_order_id,
      },
      handler: function (response) {
        //alert("Payment Success");
        Axios.post(`${process.env.REACT_APP_API_URL}/api/save_booking`, {
          id: id,
          price: price,
          email: "shivangi.bgp2004@gmail.com",
        }).then((response) => {
          if (response.data.message) {
            alert(response.data.message);
            window.location = "/login";
          } else {
            alert("Unsuccess");
            window.location = "/login";
          }
        });
      },

      theme: {
        color: "#528FF0",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <section className="service_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Services</h2>
        </div>

        {/* Show filtered services based on visa type */}
        {filteredList.length > 0 ? (
          <div>
            <h4
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Showing all "{selectedVisaName}" services
            </h4>
            <div className="row">
              {filteredList.map((item, index) => (
                <div className="col-md-6 col-lg-4 mb-4" key={index}>
                  <div
                    className="card shadow"
                    style={{
                      borderRadius: "10px",
                      height: "100%",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "20px",
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/public/${item.img}`}
                      alt={item.name}
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ marginBottom: "5px" }}>{item.city}</h5>
                      <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                        {item.description}
                      </p>
                    </div>
                    <div>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Price:</strong> ₹{item.price}
                      </p>
                      <button
                        style={{
                          backgroundColor: "#8eec69",
                          color: "#fff",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "5px",
                          width: "100%",
                          fontWeight: "bold",
                        }}
                        onClick={() => bookdest(item.id, item.price)}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                style={{
                  backgroundColor: "#0b1a54",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  width: "100%",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
                onClick={handleBack}
              >
                Back to Visa Options
              </button>
            </div>
          </div>
        ) : (
          // Show visa type options
          <div className="row">
            {visaTypes.map((service, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div
                  className="box p-3 m-2 shadow"
                  style={{
                    borderRadius: "10px",
                    minHeight: "360px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="img-box text-center">
                    <img
                      src={service.img}
                      alt={service.title}
                      style={{
                        maxHeight: "120px",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                  <div className="detail-box mt-3">
                    <h6>{service.title}</h6>
                    <p style={{ fontSize: "14px" }}>{service.description}</p>
                    <button
                      style={{
                        backgroundColor: "#8eec69",
                        border: "none",
                        color: "#000",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                      onClick={() => handleCheckout(service.title)}
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
