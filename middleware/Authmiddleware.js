const jwt = require("jsonwebtoken");

exports.virifylogin =  function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Acess Denied");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      res.json({ success: false, message: "Failed to authenticate token " });
    } else {
      req.user = user;
      next();
    }
  });
};

  

  exports.UserRole = function(role){
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            res.status(401).json({ message: 'you dont have access to this route!' })
        }
        next();    
    }
}  