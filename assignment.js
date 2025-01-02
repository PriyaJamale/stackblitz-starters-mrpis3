var express = require('express');
var cors = require('cors');
var app = express();
const port = 3000;
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//function calculateTotalCartPrice(newItemPrice, cartTotal) {
  //if (cartTotal == 0) {
  //  return newItemPrice.toString();
  //} else {
   // let totalCartPrice = newItemPrice * cartTotal;
   // return totalCartPrice.toString();
 // }
//}
app.get('/cart-total', (req, resp) => {
  let newItemPrice = parseFloat(req, query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  resp.send(cartTotal.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function discount(cartTotal, isMember) {
  if (isMember) {
    let discountPrice = cartTotal - [(cartTotal * 10) / 100];
    return discountPrice.toString();
  } else {
    return cartTotal.toString();
  }
}
app.get('/membership-discount', (req, resp) => {
  let cartTotal = req.query.cartTotal;
  let isMember = req.query.isMember;
  resp.send(discount(cartTotal, isMember));
});

app.get('/calculate-tax', (req, resp) => {
  let cartTotal = req.query.cartTotal;
  let tax = parseFloat((cartTotal * taxRate) / 100);
  resp.send(tax.toString());
});

function delivery_time(shippingMethod,distance){
  let day;
  if(shippingMethod=='standard'){
    day=distance/50;
  }
  else
  {
    day = distance/100
  }
  return day.toString();
}

app.get('/estimate-delivery', (req, resp) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  resp.send(deliveryTime(shippingMethod,distance))
});

app.get('/shipping-cost',(req,resp)=>{
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  let shippingCost=weight * distance * 0.1;
  resp.send(shippingCost.toString());
});
app.get('/loyalty-points',(req,resp)=>{
  purchaseAmount=parseFloat(req.query.purchaseAmount);
  resp.send((purchaseAmount*2).toString());
});

