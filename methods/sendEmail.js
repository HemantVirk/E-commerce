/**
 *
 * Run:
 *
 */
const mailjet = require('node-mailjet').apiConnect(
  "b775ce9c34f76579388c53bd05844a88",
  "bdf0aeed134bc0e61b759bbad46f0167"
)
module.exports = function (email, token, subject, text, callback) {
  console.log(subject)
  // console.log(subject == "Forgot Password")

  if (subject == "Verify Account") {
    const request = mailjet.post('send', { version: 'v3.1' }).request({

      Messages: [
        {
          From: {
            Email: 'hemant1219243@jmit.ac.in',
            Name: 'antiquités.com',
          },
          To: [
            {
              Email: email,
              Name: 'Dear Customer',
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart:
            `<h3>welcome to antiquités.com</h3><br /><a href="http://localhost:3000/verifyemail/${token}"> Verify </a>`,
        },
      ],
    })
    request
      .then(result => {
        console.log(result.body)
        callback(null, result.body)
      })
      .catch(err => {
        console.log(err)
        callback(err, null)
      })
  }
  else if(subject == "Password Changed"){
    const request = mailjet.post('send', { version: 'v3.1' }).request({

      Messages: [
        {
          From: {
            Email: 'hemant1219243@jmit.ac.in',
            Name: 'antiquités.com',
          },
          To: [
            {
              Email: email,
              Name: 'Dear Customer',
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart:
            `<h3>Your Password has been changed</h3>`,
        },
      ],
    })
    request
      .then(result => {
        console.log(result.body)
        callback(null, result.body)
      })
      .catch(err => {
        console.log(err)
        callback(err, null)
      })
  }
  else if(subject === "Forgot Password"){
    const request = mailjet.post('send', { version: 'v3.1' }).request({

      Messages: [
        {
          From: {
            Email: 'hemant1219243@jmit.ac.in',
            Name: 'antiquités.com',
          },
          To: [
            {
              Email: email,
              Name: 'Dear Customer',
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart:
          `<h3>Click to reser your Password</h3><br /><a href="http://localhost:3000/forgotverifyemail/${token}"> Verify </a>`,
        },
      ],
    })
    request
      .then(result => {
        console.log(result.body)
        callback(null, result.body)
      })
      .catch(err => {
        console.log(err)
        callback(err, null)
      })
  }
}

