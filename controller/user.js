const User = require("../models/user.js");
const Order = require("../models/order.js");
const cloudinary = require("cloudinary");


exports.registerUser = async (req, res) => {
   try {
      const { name, email, password, avatar } = req.body;

      let user = await User.findOne({ email });

      if (user) {
         return res.status(500).json({
            success: false,
            message: "A user with this email is already exist"
         })
      }

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
         folder: "FightClub-avatars",
       });

      user = await User.create({
         name, email, password,
          avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
      })

      const token = await user.generateToken();

      const options = {
         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
         httpOnly: true,
      }

      res.status(201).cookie("token", token, options).json({
         success: true,
         user
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.loginUser = async (req, res) => {
   try {

      const { email, password } = req.body;

      let user = await User.findOne({ email }).select("+password");

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User doesn't exist"
         })
      }
      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
         return res.status(400).json({
            success: false,
            message: "Incorrect Passworrd"
         })
      }

      const token = await user.generateToken()

      const options = {
         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
         httpOnly: true,
      }

      res.status(200).cookie("token", token, options).json({
         success: true,
         user
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.myProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user._id)
      res.status(200).json({
         Success: true,
         user
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.logout = async (req, res) => {
   try {
      res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
         Success: true,
         message: "Logout Successfully"
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.getAdminUsers = async (req, res, next) => {
   try {
      const users = await User.find();
      res.status(200).json({
         success: true,
         users,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
};



exports.getAdminStats = async (req, res, next) => {
   const usersCount = await User.countDocuments();

   const orders = await Order.find();

   const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
   const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
   const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

   let totalIncome = 0;

   orders.forEach((i) => {
      totalIncome += i.totalAmount;
   });

   res.status(200).json({
      success: true,
      usersCount,
      ordersCount: {
         total: orders.length,
         preparing: preparingOrders.length,
         shipped: shippedOrders.length,
         delivered: deliveredOrders.length,
      },
      totalIncome,
   });
};