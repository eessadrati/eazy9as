import React, { useState, useContext, useEffect } from "react";
import CartContext from "../context/cart/cartContext";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../context/auth/authContext";
import Axios from "axios";
import "animate.css";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

const useStyles = {
  root: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: 8
  }
}

function MyButton(props) {
  const { color, ...other } = props;
  return <Button sx={useStyles.root} {...other} />;
}

MyButton.propTypes = {
  color: PropTypes.oneOf(["blue", "red"]).isRequired
};

const Checkout = (props) => {
  const { state } = useContext(CartContext);
  const [alert, setAlert] = useState({
    val: 0,
    type: "",
    msg: ""
  });
  const [value, setValue] = React.useState("Delivery");
  const [payment, setPayment] = React.useState("Online");
  const [deliveryCharges, setCharges] = React.useState(10);
  const [address, setAddress] = React.useState({
    Address: "",
    Landmark: "",
    City: "",
    Phone: "",
    Zip: ""
  });
  const Alerts = () => {
    return (
      <Toast
        className="animate__animated animate__shakeX"
        style={{ position: "fixed", right: "0", zIndex: "9899899" }}
      >
        <Toast.Header
          style={{
            background: alert.type,
            color: "white",
            fontWeight: "bold"
          }}
        >
          <strong className="mr-auto">
            {alert.type === "red" ? "Failed" : "Success"}
          </strong>
          {/* <small>2 seconds ago</small> */}
        </Toast.Header>
        <Toast.Body>{alert.msg}</Toast.Body>
      </Toast>
    );
  };
  const { user } = useContext(AuthContext);
  const handleChange1 = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    if (value !== "Delivery") setCharges(1);
    else setCharges(0);
  };

  useEffect(() => {
    if (state.items.length === 0) props.history.push("/");
  }, [props.history, state.items.length]);
  // console.log(state);
  useEffect(() => {
    if (value === "Take Away") {
      setPayment("");
      if (value === "Delivery") setCharges(50);
    }
  }, [value]);
  // const handlePayment = async () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      value,
      address,
      payment,
      deliveryCharges,
      txn_amount: state.total_price + deliveryCharges,
      cart: state,
      user: user
    };
    console.log(address);
    if (
      value === "Delivery" &&
      (address.Address == "" || address.city == "" || address.zip == "")
    ) {
      setAlert({
        val: 1,
        type: "red",
        msg: "Enter Required Fields"
      });
      return setTimeout(() => {
        setAlert({ val: 0, msg: "", type: "" });
      }, 3000);
    }

    if (payment === "Online") {
      try {
        console.log(data);
        const res = await Axios.post("http://localhost:5000/api/paytm", data, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        document.write(res.data);
      } catch (e) {
        console.log(e.response);
      }
    } else {
      try {
        // console.log(data);
        const res = await Axios.post("http://localhost:5000/api/orders", data, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log(res.data);
        props.history.push("/success?orderid=" + res.data.orderid);
        
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  return (
    <>
      {/* <Container fixed style={{ fontFamily: "Alata" }}> */}
      <Link className="left_align" to="/cart">
        <i
          class="fa fa-arrow-circle-left"
          style={{
            marginLeft: "0.3rem",
            marginTop: "0.5rem",
            fontSize: "2rem",
            position: "fixed",
            left: "0.3rem"
          }}
        />
      </Link>
      {alert.val === 1 ? <Alerts /> : ""}
      <form
        className="paymentForm"
        style={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <div className="paymentContainer">
          <div className="order">
            <div className="modeOfDelivery">
              <h3 style={{ fontWeight: "bold", fontFamily: "Kanit" }}>
                {" "}
                Mode of Order
              </h3>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="delivery"
                  value={value}
                  onChange={handleChange}
                >
                  <div>
                    <span className="mode">
                      <FormControlLabel
                        value="Delivery"
                        defaultChecked
                        control={<Radio />}
                        label={
                          <span style={{ fontFamily: "Alata" }}>Delivery</span>
                        }
                      />
                    </span>
                  </div>
                  <div>
                    <FormControlLabel
                      value="Takeaway"
                      control={<Radio />}
                      label={
                        <span style={{ fontFamily: "Alata" }}>Take Away</span>
                      }
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className="modeOfPayment animate__animated animate__bounceIn">
              <h3 style={{ fontWeight: "bold", fontFamily: "Kanit" }}>
                Mode of Payment
              </h3>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <div
                    style={{
                      fontFamily: "Alata"
                    }}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio />}
                      label={
                        <span style={{ fontFamily: "Alata" }}>
                          Cash on Delivery
                        </span>
                      }
                      style={{
                        fontFamily: "Alata"
                      }}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="Online"
                      control={<Radio />}
                      label={
                        <span style={{ fontFamily: "Alata" }}>Online</span>
                      }
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            {value === "Delivery" && (
              <>
                <div
                  className="address animate__animated animate__bounceIn"
                  style={{ fontFamily: "Mulish" }}
                >
                  <h3 style={{ fontWeight: "bold", fontFamily: "Kanit" }}>
                    Address Details
                  </h3>
                  <TextField
                    id="outlined-basic"
                    label={
                      <span style={{ fontFamily: "Poppins" }}>Address</span>
                    }
                    variant="outlined"
                    margin="normal"
                    name="Address"
                    onChange={handleChange1}
                    fullWidth
                    multiline
                  />
                  <TextField
                    id="outlined-basic"
                    label={
                      <span style={{ fontFamily: "Poppins" }}>
                        Landmark (Optional)
                      </span>
                    }
                    variant="outlined"
                    size="small"
                    name="Landmark"
                    margin="normal"
                    onChange={handleChange1}
                    fullWidth
                  />

                  <TextField
                    id="outlined-basic"
                    label={<span style={{ fontFamily: "Poppins" }}>City</span>}
                    variant="outlined"
                    size="small"
                    name="City"
                    margin="normal"
                    onChange={handleChange1}
                    // fullWidth
                  />
                  <TextField
                    id="outlined-basic"
                    label={
                      <span style={{ fontFamily: "Poppins" }}>Zip Code</span>
                    }
                    variant="outlined"
                    name="Zip"
                    type="Number"
                    size="small"
                    margin="normal"
                    onChange={handleChange1}
                    // fullWidth
                  />
                  <TextField
                    id="outlined-basic"
                    label={
                      <span style={{ fontFamily: "Poppins" }}>
                        Contact Number
                      </span>
                    }
                    variant="outlined"
                    name="Phone"
                    size="small"
                    type="Number"
                    margin="normal"
                    onChange={handleChange1}
                    // fullWidth
                  />
                </div>
              </>
            )}
          </div>
          <div
            style={{
              justifyContent: "center",
              flex: "1",
              fontFamily: "Mulish",
              marginTop: "1rem",
              padding: "0.5rem"
            }}
            className="animate__animated animate__fadeIn"
          >
            <div className="checkoutRight">
              <h4>Order Summary</h4>
              <h4>
                <Link to="/cart">Edit Cart</Link>
              </h4>
            </div>
            <br />
            <div className="checkoutRight">
              <h6>Total Items :</h6>
              <h6>{state.total_quantity}</h6>
            </div>
            {deliveryCharges === 0 ? (
              <div></div>
            ) : (
              <div className="checkoutRight">
                <h6>Delivery Charges :</h6>
                <h6 className="Web Rupee"> {deliveryCharges} DH</h6>
              </div>
            )}
            <div className="checkoutRight">
              <h6>Total Amount :</h6>
              <h6 className="Web Rupee">
                {" "}
                 {state.total_price + deliveryCharges} DH
              </h6>
            </div>
            <MyButton type="submit" color="blue" style={{ width: "100%" }}>
              <span style={{ fontFamily: "Mulish" }}>ORDER</span>
            </MyButton>
            <span>
              Payments Secured by{"  "}
              <img
                src="https://img.icons8.com/color/48/000000/paytm.png"
                alt="paytm"
              />{" "}
            </span>
            <br />
            <img src='https://image.freepik.com/free-vector/friends-eating-snacks-friendly-people-group-have-dinner-desk-restaurant-cartoon-vector-characters-isolated_53562-7916.jpg' alt='design'
            style={{width: '90%'}}
            />
          </div>
        </div>
      </form>
      {/* </Container> */}
    </>
  );
};

export default Checkout;
