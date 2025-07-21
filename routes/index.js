var express = require('express');
var router = express.Router();
require('dotenv').config();

const { Telegraf } = require("telegraf")
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN)
const OWNER_ID = process.env.OWNER_ID;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BlackHole' });
});
router.post("/", async (req, res) => {
  const { title, service, email, phone, about } = req.body;
  if (!title || !service || !email || !phone || !about) {
    return res.render('index', { Message: 'Malumotlar yitarli emas!' });
  }

  try {
    await bot.telegram.sendMessage(OWNER_ID, `📑 Title: ${title}\n🛠 Service: ${service}\n📧 Email: ${email}\n📞 Phone: ${phone}\n💳 About: ${about}`);
    res.render(`index`, { Message: "Murojaatingiz muvaffaqiyatli yuborildi!" })
  } catch (error) {
    console.log(error);
    res.render('index', { Message: 'Xatolik mavjud, murojaatingiz yuborilmadi!' });
  }
})
router.get('/test-bot', async (req, res) => {
  try {
    await bot.telegram.sendMessage(OWNER_ID, '✅ Test message from bot!');
    res.send('Message sent!');
  } catch (err) {
    console.error(err);
    res.send('Failed to send message.');
  }
});

bot.launch()
module.exports = router;
