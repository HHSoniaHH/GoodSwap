
const nodemailer = require("nodemailer");
const crypto = require("crypto");


exports.generateOTP=()=>{
    let otp=''
  for(let i=0;i<=3;i++){
const randVal=Math.round(Math.random()*9)
otp=otp+randVal
  }return otp;
}
//AVEC GMAIL
      // exports.mailTransport=()=> nodemailer.createTransport({
      //   service: "gmail",
      //   port: 2525,
      //   auth: {
      //     user: "otto.coding.dz@gmail.com",
      //     pass: "mbhyzwtsyphrrhuj"
      //   }
      // });
exports.mailTransport=()=> nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2af50bb10951bb",
          pass: "9f4182f08e932e"
        }
      });



      exports.GenerateEmailTemplate=(code ,fname,lname)=>{
        return`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation de compte</title>
        </head>
        <body style="font-family: Arial, sans-serif; border-radius:15px;font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px;">
            <header style="background-color: #007bff; color: #fff; padding: 10px;">
                <h1 style="margin: 0; font-size: 24px;">Confirmation de compte</h1>
            </header>
            <main style="padding: 20px; background-color: #fff;">
                <p>Bonjour ${fname} ${lname},</p>
                <p>Merci d'avoir créé un compte sur notre site. Pour confirmer votre compte, veuillez entrer le code OTP ci-dessous :</p>
                <div style="padding: 10px; background-color: #eee; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="margin: 0; font-size: 20px; text-align: center;">${code}</h3>
                </div>
                <p>Le code OTP est valide pendant 10 minutes. Si vous ne l'avez pas reçu ou si vous avez des questions, n'hésitez pas à nous contacter à l'adresse e-mail suivante : goodswap@tech.com.</p>
                <p>Nous sommes ravis de vous compter parmi nos clients et espérons que vous apprécierez l'utilisation de notre site.</p>
                <p>Cordialement,</p>
                <p>L'équipe de Good Swap</p>
            </main>
            <footer style="padding: 10px; background-color: #ececec; color: #333; text-align: center;">
                <p>&copy; 2023 Good Swap. Tous droits réservés.</p>
            </footer>
        </body>
        </html>
        `
      }

   exports.GenerateEmailTemplateSuccess=(fname,lname)=>{
        return`     <!doctype html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Votre compte a été vérifié avec succès</title>
            <style type="text/css">
              /* Base */
              body {
        
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                margin: 0;
                padding: 0;
              }
              /* Header */
              .header {
                       background-color: #0072c6;
        
                color: #ffffff;
                padding: 1px 0;
                text-align: center;
              }
              /* Content */
              .content {
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
              }
              .content h1 {
                font-size: 24px;
                margin-top: 0;
              }
              .content p {
                margin-top: 0;
              }
              .content a {
                color: #0072c6;
                text-decoration: none;
              }
              /* Footer */
              .footer {
                background-color: #f8f8f8;
                color: #000000;
                padding: 20px;
                text-align: center;
              }
              .footer a {
                color: #000000;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="header">
                <h2>Votre compte a été vérifié avec succès</h2>
              
            </div>
            <div class="content">
              <p>Bonjour ${fname} ${lname}</p>
              <p>Nous sommes heureux de vous informer que votre compte a été vérifié avec succès. Vous pouvez maintenant accéder à toutes les fonctionnalités de notre site.</p>
              <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à l'adresse e-mail suivante : <a href="mailto:support@votresite.com">contact@goodswap.com</a>.</p>
              <p>Meilleures salutations,</p>
              <p>L'équipe de support de Good Swap</p>
            </div>
            <div class="footer">
              <p>Cet e-mail a été envoyé automatiquement. Pour toute question, veuillez nous contacter à l'adresse e-mail suivante : <a href="goodswap.com">contact@goodswap.com</a>.</p>
            </div>
          </body>
        </html>
      
        `
      }









      
      



      exports.GenerateEmailTemplateReinitialiserMdp=(code,fname,lname)=>{
        return` <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Réinitialisation du mot de passe</title>
            <style>
                body {
                    background-color: #f2f2f2;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    color: #444444;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    margin-top: 0;
                  }
                p {
                    margin: 20px 0;
                    line-height: 1.5;
                }
                a {
                    color: #0070c9;
                    text-decoration: none;
                  }
                a:hover {
                  text-decoration: underline;
                }
                </style>
        </head>
        <body>
            <div class="container">
                <h1>Réinitialisation du mot de passe</h1>
                <p>Bonjour ${fname} ${lname},</p>
                <p>Vous avez demandé une réinitialisation de votre mot de passe. Pour procéder à cette opération, veuillez inserez le code de vérification ci-dessous :</p>
                <div style="padding: 10px; background-color: #eee; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="margin: 0; font-size: 20px; text-align: center;">${code}</h3>
                </div>
                <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer ce message.</p>
                <p>Cordialement,</p>
                <p>L'équipe de Good Swap</p>
            </div>
            </body>
        </html>
  
     
      
        
      
        `
      }






      
      





      
            exports.cryptoRandomBytes=()=>new Promise((resolve,reject)=>
            {
              crypto.randomBytes(30,(err,buff)=>{
                  if(err) reject (err)
                  const token =buff.toString('hex');
                  resolve(token)
              })
            })

exports.GenerateEmailTemplateReinitialiserMdpSucces=(fname,lname)=>{
        return`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Mot de passe réinitialisé avec succès</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f1f1f1;
            }
            .container {
              background-color: #ffffff;
              border-radius: 10px;
              padding: 20px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
            h1 {
              color: #37474f;
              margin-top: 0;
            }
            p {
              color: #37474f;
              margin-bottom: 20px;
            }
            a {
              color: #ffffff;
              background-color: #2196f3;
              border-radius: 5px;
              display: inline-block;
              padding: 10px 20px;
              text-decoration: none;
              font-weight: bold;
              margin-top: 20px;
            }
            a:hover {
              background-color: #0b7dda;
            }
            .icon-container {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 80px;
            }
            .success-icon {
              color: #4caf50;
              font-size: 48px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Mot de passe réinitialisé avec succès</h1>
            <p>Bonjour ${fname} ${lname}, Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter à votre compte avec votre nouveau mot de passe.</p>
            <div class="icon-container">
              <span class="success-icon">&#10003;</span>
            </div>
            <p>Si vous n'avez pas réinitialisé votre mot de passe, veuillez contacter notre service clientèle.</p>
            <p>Merci de faire affaire avec nous !</p>
          </div>
        </body>
        </html>
      
        
      
        `
      }




      exports.GenerateEmailRejeter=(nom,nomArtcile)=>{
        return`
        <!DOCTYPE html>
<html>
  <head>
    <title>Votre demande a été rejetée</title>
    <style>
      /* Styles for the email */
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        padding: 20px;

      }

      .email-container {
        max-width: 600px;
        margin: auto;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #ec6942;
        margin-top: 0;
		text-align: center;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
      }

  

  
    </style>
  </head>
  <body>
    <div class="email-container">
      <h1>Votre demande de don a été rejetée</h1>
      <p>Bonjour ${nom},</p>
      <p>Nous sommes désolés de vous informer que votre demande d'adopter le don  <b>${nomArtcile}</b> a été rejetée.</p>
	  <p>Nous vous remercions de votre intérêt pour nos services et nous espérons pouvoir vous servir à l'avenir.</p>

      <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à l'adresse e-mail suivante : contact@goodswap.com. Nous serons heureux de vous aider à trouver un don qui répond à vos besoins.</p>
      <p>Merci de votre compréhension,</p>
      <p>L'équipe GOOD SWAP</p>
    </div>
  </body>
</html>
`}