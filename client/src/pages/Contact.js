import React from 'react';
import "../styles/contact.css"
import {FaTwitter, FaFacebook, FaInstagram, FaGithub} from 'react-icons/fa'
import { SiGmail } from "react-icons/si";
const Contact = () => {
    return (
        <div>
          <h4 style={{margin:'8px'}}>
          Please, if you have any question, do not contact us. We are not google {" "}
           <a href='mailto:abc@example.com' style={{textTransform:'none'}}>

            <SiGmail style={{fontSize:25,color:'red'}}/> </a>
           </h4>
          <div>
          <h5 style={{marginTop:'70px'}}>Follow us </h5>
          <a href="https://www.google.com"  ><FaTwitter style={{ fontSize:30,margin:5}}/></a>
          <a href="https://www.google.com"  ><FaFacebook style={{ fontSize:30,margin:5}}/></a>
          <a href="https://www.google.com"  ><FaInstagram style={{ fontSize:30,margin:5, color:'#F56040'}}/></a>
          <a href="https://www.google.com"  ><FaGithub style={{ fontSize:30,margin:5, color:'black'}}/></a>
           
          </div>
        </div>
    );
};

export default Contact;
const style={
        padding: "20px",
        fontSize: "30px",
        width: "30px",
        textAlign: "center",
        textDecoration: "none",
        margin: "5px 2px",
        borderRadius: '50%',
      '&:hover': {
          opacity: "0.7",
      }
}