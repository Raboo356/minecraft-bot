const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'matiaspro67.aternos.me',
    port: 42977,
    username: 'Technoblade',
    version: '1.21.11',
    auth: 'offline',
  })

  bot.on('spawn', () => {
    console.log('Bot conectado!')
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === '!hola') {
      bot.chat('Hola ' + username)
    }
  })

  bot.on('end', () => {
    console.log('Se desconecto, reconectando...')
    setTimeout(createBot, 5000)
  })
}

createBot()
