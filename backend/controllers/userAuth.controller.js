

module.exports.registerNewUser = async (req,res) =>{
    const user = req.body;
    console.log(user);
   res.status(201).json({msg:'success'})
}

module.exports.loginUser = async (req,res) =>{
    res.status(201).json({msg:'success'})
 }