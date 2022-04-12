const nodemailer = require("nodemailer")
const {Facture, Command } = require("../model");


exports.create = async (req,res)=>{
    let data = req.body; 
    const command_id = req.params.id
    const command = await Command.findOne({where:{id:command_id},

      include:['client','products']
    
    })
  
    console.log("command",command.client_id);
    try {
         
   const facture = await Facture.create({
        name: data.name,
        commandId: data.commandId
      },
 
    
      );
    
    
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
            to:  ` ${command.client.email}`, 
            subject: "facture de l'ordre",
            text: "test", 
            html: `<b>Facture de l'order</b>
                      ${facture.name}
                      ${command.address}
                      ${command.phone}
                    Here is you  Bill`, 
        });
    
    
        res.status(200).json({
            message: 'facture created successfully', facture
        })
        
    } catch (error) {
        
        res.send(error)
        
    }

}