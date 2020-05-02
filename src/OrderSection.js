/**
* 
*/
import React from 'react';
import './OrderSectionStyles.css'

function OrderSection() {
  return (
    <header>
      <h1> Your Everyday Masks </h1>
      <h3> Comfortable non-medical masks made with love to keep you safe. </h3>
      <img src="black.png" alt="Black Everyday Masks" width="150" height="150"></img>
      <h3> Pre-order a pack of 6 for $12.00  </h3>
      <h4> Enter Payment Information:  </h4>
      <p>
        <span htmlFor="cname" className="form">
          Email Address &nbsp; &nbsp;
          <input type="text" email="email" className="input" id="email" />
      </span>
      </p>
      <p>
        <span htmlFor="cname" className="form">
          Name on Card &nbsp; &nbsp;
          <input type="text" name="name"  className="input" id="fullname" />
         </span>
      </p>
    </header>
  );
};

export default OrderSection;
