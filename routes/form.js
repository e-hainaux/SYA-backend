const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

// Endpoint API pour gérer l'envoi d'e-mails
router.post("/send-email", (req, res) => {
  const { prenom, nom, societe, email, telephone, commentaire } = req.body;

  // Créer un transporteur SMTP réutilisable à l'aide de transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Définir les options de l'e-mail
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "SYA YOGA - Nouvelle demande de contact",
    html: `<p>Nom: ${prenom} ${nom}</p>
               <p>Société: ${societe}</p>
               <p>Email: ${email}</p>
               <p>Téléphone: ${telephone}</p>
               <p>Commentaire: ${commentaire}</p>`,
  };

  // Envoyer l'e-mail
  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email envoyé");
      res.status(200).json({ message: "Email envoyé avec succès" });
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de l'email:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
    });
});

module.exports = router;
