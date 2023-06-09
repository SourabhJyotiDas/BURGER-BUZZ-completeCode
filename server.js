const app = require("./app");
const { connectToDatabase } = require("./config/database");
const cloudinary =require("cloudinary")

connectToDatabase();


cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
 });

app.listen(process.env.PORT, () => {
   console.log(`App is listening on ${process.env.PORT}`);
})