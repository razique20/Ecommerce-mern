//placing order through cod
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount: Number(amount),
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order through stripe

const placeOrderStripe = async (req, res) => {};

//placing order through razorpay

const placeOrderRazorpay = async (req, res) => {};

//all orders data for admin panel

const allOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({})

    res.json({success:true,orders})
    
  } catch (error) {


    console.log(error);
    
    
  }
};

//use order data for frontend

const userOrders = async (req, res) => {
  try {

    const{userId} = req.body


    const orders = await orderModel.find({userId})


    res.json({success:true,orders})
    
  } catch (error) {


    console.log(error)
    res.json({success:false,message:error.message})
    
  }
};

//update order status for admin panel

const updateStatus = async (req, res) => {};

export {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
};
