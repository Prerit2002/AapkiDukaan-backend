var Executive = require('../model/executive')

exports.createExecutive= async  (req,res) => {
    try {
        if (!req.body){
            console.log("Executive Body")
        }
    
        const executive = new Executive({
            personalDetails : req.body.personalDetails,
            Leads : req.body.Leads,
            PayOuts : req.body.PayOuts,
          
           
        })
    
        await executive.save()
        res.status(200).send(executive)

    }catch(err) {
        res.status(500).send(err)
    }
   
}

exports.addExecutive = async (req,res) =>{
    Executive.updateOne(
     { _id: req.params.id },
     { $addToSet: { personalDetails: req.body.personalDetails } }
    ).then((data)=>{
         res.send(data)
    })
}