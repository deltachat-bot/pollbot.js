var DeltaChat = require('deltachat-node')
var Pollbot = require('pollbot.js')
var C = require('deltachat-node/constants')

var args = process.argv.splice(2)

var addr = args[0]
var mailPw = args[1]
var cwd = args[2] || process.cwd()

// TODO: support more locales in pollbot.js
var locale = 'en'
var bot = new Pollbot(locale)

function maybeReply (chatId, msgId) {
  var msg = dc.getMessage(msgId)
  console.log('got msg', msgId)
  if (!msg) return
  console.log(msg.getState())
  console.log(msg.getState().isSeen())
  if (msg.getState().isSeen()) return
  var fromId = msg.getFromId()
  console.log('fromId', fromId)
  if (fromId !== C.DC_CONTACT_ID_SELF) {
    var text = msg.getText()
    console.log('got text', text)
    var response = bot.getResponse(text)
    console.log('got response', response)
    if (response) {
      console.log('sending message', chatId, response)
      chatId = dc.createChatByMessageId(msgId)
      dc.sendMessage(chatId, response)
      dc.markSeenMessages(msgId)
    }
  }
}

var dc = new DeltaChat()
console.log('opening..')
dc.open(cwd, function (err) {
  if (err) throw err
  console.log('opened!')
  dc.configure({ addr, mailPw })
  dc.on('ALL', console.log)
  dc.on('DC_EVENT_INCOMING_MSG', maybeReply)
  dc.on('DC_EVENT_MESSAGE_CHANGED', maybeReply)
})
