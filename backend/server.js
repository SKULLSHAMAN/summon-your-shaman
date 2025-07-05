const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));;

// Configura Nodemailer (usa un servicio como Gmail o SendGrid)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skullshamanart@gmail.com',
    pass: 'bjhpjghvhwoofcqf',
  },
});

// Endpoint para enviar la imagen por correo
app.post('/send-image', async (req, res) => {
  const { imageBase64, userEmail } = req.body;

  try {
    await transporter.sendMail({
      from: 'skullshamanart@gmail.com',
      to: 'skullshamanart@gmail.com',
      subject: 'Nueva Skull Shaman NFT',
      text: `Enviado por: ${userEmail}`,
      attachments: [{
        filename: 'shaman-nft.png',
        content: imageBase64.split('base64,')[1],
        encoding: 'base64',
      }],
    });
    res.status(200).send('Correo enviado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el correo');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));