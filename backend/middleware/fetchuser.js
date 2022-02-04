const jwt = require("jsonwebtoken");
const JWT_SECRET = "darshitisagood$boy"; //this is my signature for jwt token

//fetchuser will take three arguments(req,res,next)---Here we will verify token if its valid then we will pass data into req.user as data will be in data.user and then next() function will redirect the control to our     async(req,res) function where we can access user
//In data there will be id and our secret string so we can get userid from data 

const fetchuser = (req, res, next) => {
    //Get the user from the JWT token and add id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });

    }

}

module.exports=fetchuser;