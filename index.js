const express = require('express');
const cors = require('cors');


const app = express();
const port = 3010;
app.use(cors());

// server side value
let taxRate = 5;   //5%
let discountPercentage = 10;  //10%
let loyaltyRate = 2; // 2%

function getTotalCartPrice(newItemPrice, cartTotal)
{
  return (cartTotal + newItemPrice).toString();
}

function getDiscountedPrice(cartTotal , isMemebr)
{
  let discountedPrice ;
  if(isMemebr == "true")
  {
    discountedPrice = (cartTotal *( 100 - discountPercentage))/100;
  }
  else{
    discountedPrice = cartTotal;
  }
  return discountedPrice.toString();
}
function getTaxOnCartTotal(cartTotal)
{
  let totalTax = (cartTotal * taxRate )/100;
  return totalTax.toString();
}
function getDeliveryTime(shippingMethod, distance)
{
  let totalDeliveryTime ;
  if(shippingMethod = "Standard")
  {
    totalDeliveryTime = distance / 50;
  }
  else if(shippingMethod == "Express")
  {
    totalDeliveryTime = distance / 100;
  }
  return totalDeliveryTime.toString();
}
function getShippingCost(weight, distance)
{
  let totalShippingCost = (weight * distance * 0.1);
  return totalShippingCost.toString();
}
function getLoyaltyPoints(purchaseAmount)
{
  let totalLoyaltyPoints = purchaseAmount * loyaltyRate; 
  return totalLoyaltyPoints.toString();
}
app.get('/cart-total', (req,res) => 
{
  let newItemPrice  = parseFloat(req.query.newItemPrice);
  let cartTotal  = parseFloat(req.query.cartTotal);
  res.send(getTotalCartPrice(newItemPrice, cartTotal));
})

app.get('/membership-discount' , (req, res) =>
{
  let cartTotal  = parseFloat(req.query.cartTotal);
  let isMember  = (req.query.isMember);
  res.send(getDiscountedPrice(cartTotal, isMember));
})

app.get('/calculate-tax' , (req, res) =>
{
  let cartTotal  = parseFloat(req.query.cartTotal);
  res.send(getTaxOnCartTotal(cartTotal));
})

app.get("/estimate-delivery" , (req,res)=>
{
  let distance = parseFloat(req.query.distance);
  let shippingMethod  = req.query.shippingMethod ;
  res.send(getDeliveryTime(shippingMethod, distance))
})

app.get('/shipping-cost' , (req,res)=>
{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(getShippingCost(weight, distance));
})

app.get('/loyalty-points' , (req,res)=>
{
  let purchaseAmount = parseFloat(req.query.purchaseAmount );
  res.send(getLoyaltyPoints(purchaseAmount));
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
