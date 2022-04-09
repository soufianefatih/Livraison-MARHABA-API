const nodemailer = require("nodemailer")
const { Facture } = require("../model");


exports.create = async (req,res)=>{
   
    let data = req.body;
  
    try {
         
    await Product.create({
        name: data.name,
        // commandId: data.commandId
      });

        console.log(facture);
    
    
        let transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            secure: false,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
            ciphers: "SSLv3",
            },
            requireTLS: true,
            port: 465,
            service: 'outlook',
            debug: true, 
            auth: {
            user: `your email`, 
            pass: `you password`, 
            },
        });
    
        let info = await transporter.sendMail({
            from: '"Dark sider" soufianefth@outlook.fr', 
            to: "soufianefatih43@gmail.com", 
            subject: "facture de l'ordre",
            text: "test", 
            html: `<b>Facture de l'order</b>
                    // ${user.email}
                    Here is you  Bill`, 
        });
    
    
        console.log('here');
        res.status(200).json({
            message: 'facture created successfully'
        })
        
    } catch (error) {
        
        res.send(error)
        
    }

}