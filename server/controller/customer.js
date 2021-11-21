var Customer = require('../model/customer')

exports.createCustomer = async  (req,res) => {
   try {
       if (!req.body){
           console.log("body ")
       }
       console.log(req.body)
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
           Email : req.body.Email,
           PhoneNo : req.body.PhoneNo,
           Address : Address,
           Password : req.body.Password
       })
       console.log(customer)
       await customer.save()
       res.status(200).send(customer)

   }catch(err) {
       res.status(500).send(err)
   }
}
exports.Check = async(req,res) => {
  res.send({message : "All Good"})
}

exports.ShowCustomer = (req,res)=>{
   Customer.find({}).then(data=>{
      res.send(data)
   })
}