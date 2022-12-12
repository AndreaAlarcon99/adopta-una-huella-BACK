
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
      subject: `${nombreAnon} solicitó adoptar a ${animalName}`, 
      html: `<div style="width: 100%; background-color: #F0EAD2; padding: 5rem; margin: auto; justify-content: center;">

      <img src="../public/Huella.png" alt="logo" id="logo" />
                  <br>
                  <span>¡Tenemos buenas noticias! </span>
                  <p><b>Adopta una huella</b> ha recibido una solicitud de adopción para <b>${animalName}</b>.<br> Aquí tienes los datos de contacto:</p>
                  
                  <br>
                  <div style='background-color: #A98467; border-radius: 15px; padding: 10px; width: 450px;' >
                    <p><b>Solicitante:</b> ${nombreAnon}</p>
                    <p><b>Teléfono:</b> ${telefonoAnon}</p>
                    <p><b>Email:</b> ${emailAnon}</p>
                    <p><b>Escribe:</b> ${mensajeAnon}</p>
                  </div><br>
                  
                  <p>Para cualquier duda, puede ponerse en contacto con nosotros enviando un email a la dirección:<br>
                  aunahuella@gmail.com con asunto: ${userId}</p>
                  
            </div>`
    }
  Email(options);
}

module.exports = EmailSender;

