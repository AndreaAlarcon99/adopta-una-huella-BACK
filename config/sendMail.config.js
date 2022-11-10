
const nodemailer = require('nodemailer');


const Email = mailData => {
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    });
    transporter.sendMail(mailData, (err,info) => {
      if(err){
        console.log(err)
        return;
      }
    })
}


const EmailSender = mailData => {
  let { email, nombreAnon, telefonoAnon, emailAnon, mensajeAnon, animalName } = mailData;
    const options = {
      from: `Adopta una huella`,
      to: `${email}`, 
      subject: `${nombreAnon} solicita una adopción`, 
      html: `<div style="width: 100%; background-color: #F0EAD2; padding: 5rem; margin: auto">
  
                  <h3>Adopta una huella</h3>
                  <p>Querida entidad:</p><br>
  
                  <p><b>${animalName}</b> ha recibido una solicitud de adopción de ${nombreAnon}</p><br>
  
                  <p>Datos de contacto:</p><br>
  
                   <p>${telefonoAnon}</p>
                  <p>${emailAnon}</p><br>

            </div>`
    }
  Email(options);
}

module.exports = EmailSender;

