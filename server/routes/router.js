const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const products = require("../controller/products");
const customer = require("../controller/customer");
const executive = require("../controller/executive");
const Auth = require("../middleware/Auth");

// route.get("/api/test",Auth.AuthS,seller.Check); 
route.put("/api/findSellerbyDomain",seller.findSellerbyDomain); //MAIN API 
route.post("/api/createProduct",Auth.AuthS,products.createProduct); //Create Product in Product Pool
route.put("/api/CreatePromoCode/:id",Auth.AuthS,seller.CreatePromoCode); //Creates promocode for a seller
route.post("/api/create/Seller", Auth.userRegister, seller.createSeller); // Creates User
route.post("/api/create/Customer", Auth.userRegister, customer.createCustomer); //Creates Seller
route.post("/api/loginUser/:role",Auth.userLogin); //Login API for DB
route.get("/api/test",Auth.AuthC,seller.Check); //Checks AUTH for Customer
route.get("/api/test2",Auth.AuthS,customer.Check); //Checks AUTH for Seller
route.put("/api/createProduct",Auth.AuthS ,products.createProduct,seller.AddProducts); //Add Product to a single Seller & Product Pool
route.get("/api/findSellerProducts/:id",seller.GetProducts); // Gets All products a Seller Sells
route.put("/api/findProductsbyCategory/:id",seller.GetProductsbyCategory); //Finds all products in Seller's Category
route.get("/api/findProduct/:id",products.GetProducts); //Finds a purticular Product from Product Pool
route.put("/api/addProduct",Auth.AuthS,seller.AddProducts); //Add Products for a single Seller
route.put("/api/updateWebsite/:id",Auth.AuthS ,seller.UpdateSetting); //Updates Website Settings of Seller's Website
route.get("/api/showCustomer",Auth.AuthC,customer.ShowCustomer); //Fetches All Customers Registered
route.get("/api/showClient",Auth.AuthC,seller.ShowClient); //Fetches All registered Sellers
route.get("/api/showProduct",products.ShowProducts); //All Products Pool
route.get("/api/getFullProduct/:id/:pid",seller.Fprod,products.Fprod); //Gets Complete Data for a Seller's Product
route.get("/api/GetPromoCode/:id",Auth.AuthS,seller.GetPromoCode); //Fetched all Promocodes for a single Seller
route.put("/api/checkpromo/:id",seller.CheckPromo); //Validates PromoCode & Calculates Discount
route.get("/api/getAllProducts/:id/",seller.GetProductsAll); //All Products of a Single Seller with Name and Photo Included
route.put("/api/DeletePromo/:id",Auth.AuthS,seller.DeletePromo);//Deletes Promo Codes
route.put("/api/DeleteProducts/:id",Auth.AuthS,seller.DeleteProducts);//Deletes Products 
route.delete("/api/DeleteSeller/:id",Auth.AuthC,seller.DeleteSeller);//Deletes seller 
module.exports = route;
