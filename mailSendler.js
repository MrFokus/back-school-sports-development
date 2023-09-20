const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD_MAIL,
    },
});

let sendFunc = async (mail,phone,comment,company)=>
{
    try{
        console.log(company,company?true:false)
        let result = await transporter.sendMail({
            from: `${company ?'Предложение о сотрудничестве':'НОВАЯ ЗАЯВКА НА ЗАПИСЬ!'} <${process.env.MAIL}>`,
            to: process.env.MAIL,
            subject: 'Сообщение от '+mail,
            text: `${company ?'Предложение о сотрудничестве':'Новая заявка на запись'} ${company? 'Компания: '+company+'\n':''} \n Телефон: ${phone}\n Комментарий: ${comment}`,
            html:
                `<h2>${company ?'Предложение о сотрудничестве':'Новая заявка на запись'}</h2> ${company? '<br> Компания: <strong> '+company+'</strong><br>':''} <br> Телефон: <strong> ${phone}</strong><br> Комментарий: <strong>${comment}</strong>`,
        });
        return result.response
    }
    catch (e){
        return e.response
    }
}

module.exports = sendFunc
