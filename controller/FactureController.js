const nodemailer = require("nodemailer")
const { Facture } = require("../model");


exports.create = async (req,res)=>{
   
    let data = req.body;
  
    try {
         
   const facture = await Facture.create({
        name: data.name,
        // commandId: data.commandId
      });
    
    
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            secure: false,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
            ciphers: "SSLv3",
            },
            requireTLS: true,
            port:  587,
            service: 'outlook',
            debug: true, 
            auth: {
            user: `soufianefth@outlook.fr`, 
            pass: `ladekhesse95`, 
            },
        });
    
         await transporter.sendMail({
            from: '"livraison Marhaba" <soufianefth@outlook.fr>', 
            to: "soufianefatih43@gmail.com", 
            subject: "facture de l'ordre",
            text: "test", 
            html: `<b>Facture de l'order</b>
                    Here is you  Bill`, 
        });
    
    
        res.status(200).json({
            message: 'facture created successfully', facture
        })
        
    } catch (error) {
        
        res.send(error)
        
    }

}