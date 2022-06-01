import React, { useState, useContext, useEffect, Fragment } from "react";
import ProductContext from "../context/products/productsContext";
import CartContext from "../context/cart/cartContext";
import LoadingContext from "../context/loading/loadingContext";
import "../styles/styles.css";
import "animate.css";
import  axios  from 'axios';
import {
  Button,
  Card,
  Col
} from "react-bootstrap";

const MenuList = (item) => {
  const { addProduct, items, total_q, removeProduct } = useContext(CartContext);
  const [postedBy, setPostedBy] = useState('');
  
  const [count, setCount] = useState(0);
  const { name,by, price, q, url, type } = item;
 
  useEffect(() => {
      
      const fetch=async()=>{
        
     await axios.get(`http://localhost:5000/api/login/${by}`).then(res=>{
                 setPostedBy(res.data.name);
            })
            .catch(err=>{
                console.log(err)
             })
    }
    fetch()
   

  },[by]);
  useEffect(() => {
    if (items)
      items.forEach((item) => {
        if (item.name === name) {
          setCount(item.q);
        }
      });
  }, [total_q,items,name]);
  const clickHandle = (e) => {
    setCount(count + 1);
    addProduct({ name, price, q: count + 1, url, type });
  };
  const minusHandle = (e) => {
    setCount(count - 1);
    removeProduct({ name, price, q: count - 1, url, type });
  };
 

  return (
    <Col  sm={6} md={4} xs={12}>
      <Card
        className="Card animate__animated animate__fadeInLeft"
        style={{height: "500px", paddingBottom:'0px' }}
      >
        <Card.Img className="menuImage" variant="top" src={url} />
        <Card.Body>
          <Card.Title
            className="food"
            style={{
              fontFamily: "Mulish",
              fontWeight: "300",
              fontSize: "1.25rem",
              height:'120px'
            }}
          >
            {name}
          </Card.Title>
          <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
          {type === "Veg" || type === "veg" ? (
            <img
              src="https://img.icons8.com/color/22/000000/vegetarian-food-symbol.png"
              alt="Veg"
              style={{width:25,height:25}}
            />
          ) : (
            <img
              src="https://img.icons8.com/color/22/000000/non-vegetarian-food-symbol.png"
              alt="non-veg"
              style={{width:25,height:25}}
            />
          )}
        
          <span className="numbers" style={{fontSize:25}}>
          {" "}{price}DH
          </span>
          </div>
          <Card.Text />
          <div>
              <span>by {postedBy}</span>
          </div>
          <div class="buttons">
            {count > 0 ? (
              <Fragment>
                <button id="minus" className="btn2" onClick={minusHandle}>
                  <i className="fa fa-minus-circle fa-lg" aria-hidden="true" />
                </button>
                <span className="numbers">{count} </span>
                <button className="btn2" onClick={clickHandle}>
                  <i class="fa fa-plus-circle fa-lg" aria-hidden="true" />
                </button>
              </Fragment>
            ) : (
              <Button
                variant="outline-primary"
                onClick={clickHandle}
                style={{
                  width: "5rem",
                  height: "1.7rem",
                  fontFamily: "Mulish",
                  lineHeight: "100%",
                  fontSize: "0.9rem",
                  marginTop: '0.5rem'
                }}
              >
                Add
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default MenuList;
