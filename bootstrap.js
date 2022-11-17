module.exports = async()=>{
    const User=require("./models/user");
    const Sponsor=require("./models/sponsors");

    const errHandler= (err)=>{
        console.error("Error: ",err);
    }
   // const user= await User.create({firstName:"Claudiu",lastName:"Reut", email:"claudiureut@email.com",password:"clsr",role:"admin"}).catch(errHandler);
}