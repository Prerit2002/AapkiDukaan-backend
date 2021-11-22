var Customer = require('../model/customer')

exports.createCustomer = async  (req,res) => {
   try {
       if (!req.body){
       }
       const Address={
         Street : req.body.Street,
         State : req.body.State,
         Pincode : req.body.Pincode,
         City : req.body.City,
       }
       const customer = new Customer({
         FirstName : req.body.FirstName,
         LastName : req.body.LastName,
         Username : req.body.Username,
           PhoneNo : req.body.PhoneNo,
           Address : Address,
           Password : req.body.Password
       })
       await customer.save()
       res.status(200).send(customer)

   }catch(err) {
       res.status(500).send(err)
   }
}
exports.ShowCustomer = (req,res)=>{
   Customer.find({}).then(data=>{
      res.send(data)
   })
}
exports.GetCustomerbyId = (req,res)=>{
  Customer.findById(req.user.user._id).then(data=>{
    res.send(data)
 })
}