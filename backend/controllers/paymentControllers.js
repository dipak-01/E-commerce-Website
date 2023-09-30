const Razorpay = require('razorpay');
const dotenv = require("dotenv");

dotenv.config();
const RPAYIDK = process.env.RPAYIDK;
const RPAYSK = process.env.RPAYSK;

const instance = new Razorpay({
  key_id: RPAYIDK,
  key_secret: RPAYSK 
});

const createOrder = async(req,res) => {
  try {
    console.log(req.body);
    const amount = req.body.amount*100;
    const options = {
        amount: amount,
        currency: 'INR',
        receipt: 'Test_Receipt'
    }

    instance.orders.create(options, 
        (err, order)=>{
            if(!err){
                res.status(200).send({
                    success:true,
                    msg:'Order Created',
                    orderId : order.id,
                    amount:amount,
                    key_id:RPAYIDK,
                    product_name:req.body.name,
                    description:req.body.description,
                    contact:"7741952745",
                    name: "Sahil Jaiswal",
                    email: "jaiswalsahil7741@gmail.com"
                });
            }
            else{
                res.status(400).send({success:false,msg:'Something went wrong!'});
            }
        }
    );

} catch (error) {
    console.log(error.message);
}
}

module.exports = {
  createOrder
}