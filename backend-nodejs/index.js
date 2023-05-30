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
    const sql = `SELECT  user.email FROM events INNER JOIN user ON events.donor_id = user.id WHERE events.status = 'PENDING' AND ABS(DATEDIFF(donation_date, '${date}')) = 1 OR DATEDIFF('${date}', donation_date) = 1`;
    pool.query(sql, (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        
        result.forEach((element) => {
          console.log(element.email);
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
            from: EMAIL_USER,
            to: element.email, 
            subject: "Donation Reminder",
            html: '<p>hi your meeting in just 15 min</p>'
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
