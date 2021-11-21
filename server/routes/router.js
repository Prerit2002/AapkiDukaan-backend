const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const products = require("../controller/products");
const customer = require("../controller/customer");
const executive = require("../controller/executive");
const Auth = require("../middleware/Auth");

// route.get("/api/test",Auth.AuthS,seller.Check); 
route.put("/api/findSellerbyDomain",seller.findSellerbyDomain); //MAIN API 
route.post("/api/createProduct", products.createProduct); //Create Product in Product Pool
route.put("/api/CreatePromoCode/:id", seller.CreatePromoCode); //Creates promocode for a seller
route.post("/api/create/Seller", Auth.userRegister, seller.createSeller); // Creates User
route.post("/api/create/Customer", Auth.userRegister, customer.createCustomer); //Creates Seller
route.get("/api/loginUser/:role",Auth.userLogin); //Login API for DB
route.get("/api/test",Auth.AuthC,seller.Check); //Checks AUTH for Customer
route.get("/api/test2",Auth.AuthS,customer.Check); //Checks AUTH for Seller
route.put("/api/createProduct",products.createProduct,seller.AddProducts); //Add Product to a single Seller & Product Pool
route.get("/api/findSellerProducts/:id",seller.GetProducts); // Gets All products a Seller Sells
route.put("/api/findProductsbyCategory/:id",seller.GetProductsbyCategory); //Finds all products in Seller's Category
route.get("/api/findProduct/:id",products.GetProducts); //Finds a purticular Product from Product Pool
route.put("/api/addProduct",seller.AddProducts); //Add Products for a single Seller
route.put("/api/updateWebsite/:id",seller.UpdateSetting); //Updates Website Settings of Seller's Website
route.get("/api/showCustomer",customer.ShowCustomer); //Fetches All Customers Registered
route.get("/api/showClient",seller.ShowClient); //Fetches All registered Sellers
route.get("/api/showProduct",products.ShowProducts); //All Products Pool
route.get("/api/getFullProduct/:id/:pid",seller.Fprod,products.Fprod); //Gets Complete Data for a Seller's Product
route.get("/api/GetPromoCode/:id",seller.GetPromoCode); //Fetched all Promocodes for a single Seller
route.put("/api/checkpromo/:id",seller.CheckPromo); //Validates PromoCode & Calculates Discount
route.get("/api/getAllProducts/:id/",seller.GetProductsAll); //All Products of a Single Seller with Name and Photo Included
module.exports = route;
