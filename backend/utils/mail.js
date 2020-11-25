const nodemailer = require('nodemailer')

const send = (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    })

    transporter.sendMail({
        from: 'asbj3126@stud.kea.dk',
        to,
        subject,
        html,
    })
}

module.exports = {
    send,
}
