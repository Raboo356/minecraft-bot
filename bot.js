const mineflayer = require('mineflayer')

const mensajes = [
  'alguien para jugar?',
  'que buen server',
  'alguien tiene diamantes?',
  'estoy farmeando jaja',
  'que hacen?',
  'este server esta piola',
  'alguien me ayuda con mi casa?',
  'voy a minar un rato'
]

function createBot() {
  const bot = mineflayer.createBot({
    host: 'matiaspro67.aternos.me',
    port: 42977,
    username: 'MiBot24_7',
    version: '1.21.11',
    auth: 'offline',
  })

  bot.on('spawn', () => {
    console.log('Bot conectado!')
    bot.chat('Hola a todos! Ya llegue')

    // 1. CAMINAR Y SALTAR como humano
    setInterval(() => {
      const acciones = ['forward', 'back', 'left', 'right']
      const accion = acciones[Math.floor(Math.random() * acciones.length)]
      
      bot.setControlState(accion, true)
      bot.setControlState('jump', true)
      bot.setControlState('sprint', true)

      setTimeout(() => {
        bot.setControlState(accion, false)
        bot.setControlState('jump', false)
        bot.setControlState('sprint', false)
      }, 2000 + Math.random() * 2000)
    }, 8000)

    // 2. MIRAR PARA TODOS LADOS
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * 0.5
      bot.look(yaw, pitch)
    }, 5000)

    // 3. ESCRIBIR EN EL CHAT CADA 8-15 MINUTOS
    setInterval(() => {
      const msg = mensajes[Math.floor(Math.random() * mensajes.length)]
      bot.chat(msg)
      console.log('Bot escribio: ' + msg)
    }, 480000 + Math.random() * 400000) // entre 8 y 15 min
  })

  // 4. RESPONDER SI LE HABLAN
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`<${username}> ${message}`)

    if (message.toLowerCase().includes('hola')) {
      bot.chat('Hola ' + username + '!! como estas?')
    }
    if (message.toLowerCase() === '!ping') {
      bot.chat('Pong! Estoy activo')
    }
    if (message.toLowerCase() === '!ayuda') {
      bot.chat('Escribeme hola o !ping')
    }
    // Si alguien le pregunta algo, responde algo random para que parezca humano
    if (message.toLowerCase().includes('bot')) {
      bot.chat('no soy bot, soy matias jaja')
    }
  })

  bot.on('kicked', (reason) => {
    console.log('Kickeado: ' + reason)
  })

  bot.on('error', (err) => console.log('Error: ' + err))

  bot.on('end', () => {
    console.log('Se desconecto, reconectando...')
    setTimeout(createBot, 5000)
  })
}

createBot()
