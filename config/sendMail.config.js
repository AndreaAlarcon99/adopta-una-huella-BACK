
const nodemailer = require('nodemailer');

const Email = mailData => {
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "aunahuella@gmail.com",
        pass: "ywyrkmxxjlookogd"
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
  let { userId, email, animalName, nombreAnon, telefonoAnon, emailAnon, mensajeAnon } = mailData;
    const options = {
      from: `Adopta una huella`,
      to: `${email}`, 
      subject: `${nombreAnon} solicita una adopción`, 
      html: `<div style="width: 100%; background-color: #F0EAD2; padding: 5rem; margin: auto; justify-content: center;">
  
                  <div style='background-color: #DDE5B6; border-radius: 15px; padding: 10px; width: 350px;' >
                  <span>Desde </span><h3>Adopta una huella</h3>
                  <p>hemos recibido una solicitud de adopción para <b>${animalName}</b></p>
                  
                  </div><br>
                  <div style='background-color: #DDE5B6; border-radius: 15px; padding: 10px; width: 350px;' >
                    <h4>Contacto:</h4>
                    <p>Solicitante: ${nombreAnon}</p>
                    <p>Teléfono: ${telefonoAnon}</p>
                    <p>Email: ${emailAnon}</p>
                    <p>Escribe: <i>${mensajeAnon}</i></p>
                  </div><br>
                  
                  <p>Para cualquier duda,</p>
                  <p>puede ponerse en contacto con nosotros</p>
                  <p>enviando un email a la dirección: aunahuella@gmail.com</p>
                  <p>con asunto: ${userId}</p>
                  
            </div>`
    }
  Email(options);
}

module.exports = EmailSender;

