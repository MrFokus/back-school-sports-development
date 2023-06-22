const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD_MAIL,
    },
});

let sendFunc = async (mail,phone,comment)=>
{
    try{
        let result = await transporter.sendMail({
            from: '"НОВАЯ ЗАЯВКА НА ЗАПИСЬ!" <point20000000@mail.ru>',
            to: 'point20000000@mail.ru',
            subject: 'Сообщение от '+mail,
            text: `Новая заявка на запись \n Телефон: ${phone}\n Комментарий: ${comment}`,
            html:
                `<h2>Новая заявка на запись</h2> <br> Телефон: <strong> ${phone}</strong><br> Комментарий: <strong>${comment}</strong>`,
        });
        return result.response
    }
    catch (e){
        return e.response
    }
}

module.exports = sendFunc
