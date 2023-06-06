const cron = require("node-cron");
const nodemailer = require("nodemailer");
const moment = require('moment-timezone');
const { createPool } = require("mysql");
const {
  EMAIL_HOST,
  SERVICE,
  EMAIL_USER,
  EMAIL_PASS} = require('./Utils/constant')

const localTimezone = process.env.TZ
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "blood",
  connectionLimit: 10,
  multipleStatements: true,
});

module.exports = {
  getEmails: async (req, res) => {
    let date =  moment().tz(localTimezone).format('YYYY-MM-DD');
    console.log(date);
    const sql = `SELECT  user.email, user.first_name, user.last_name, events.donation_date FROM events INNER JOIN user ON events.donor_id = user.id WHERE events.status = 'PENDING' AND ABS(DATEDIFF(donation_date, '${date}')) = 1 OR DATEDIFF('${date}', donation_date) = 1`;
    pool.query(sql, (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        
        result.forEach((element) => {
          var transporter = nodemailer.createTransport({
            host:  EMAIL_HOST,
            service: SERVICE,
            port: 587,
            secure: false,
            requireTLS: true,

            auth: {
              user:EMAIL_USER,
              pass:EMAIL_PASS 
            },
          });
          const mailOptions = {
            from: `"Thalassemia Foundation" ${EMAIL_USER}`,
            to: element.email, 
            subject: "Donation Reminder: Donate Blood today at Thalassemia Foundation",
            html: `<h2>Dear ${element.first_name} ${element.last_name} </h2>
            <p>
            Today is the final opportunity to donate blooad at Thalassemia Foundation. Your contibution can make a significant  difference in the lives
            of thalassemia patients. We kindly urge you to visit us and donate blood.
            </p>
            <p>
            Please call us at +92 3204456193 to schedule your visit or inform us if you are unable to make it. Your generosity is greatly appreciated.
            </p>
            <p>
            Thank yot for your Kindness and support
            </p>
            <h4>
            Sincerely
            </h4>
            <p>
            Ahmad Mirza from Thalassemia Foundation
            </p>
            `
          
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log(err);
            else console.log(info);
          });
        });
      }
    });
  },
};
