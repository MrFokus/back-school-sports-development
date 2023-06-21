const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'point20000000@mail.ru',
        pass: 'JZbX3582zmD1ty5zb5cT',
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
