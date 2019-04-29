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

function maybeReply (msgId) {
  var msg = dc.getMessage(msgId)
  var fromId = dc.getFromId(msg)
  if (fromId !== C.DC_CONTACT_ID_SELF) {
    var text = msg.getText()
    var response = bot.getResponse(text)
    if (response) {
      var chatId = dc.createChatByMessageId(msgId)
      dc.sendMessage(chatId, response)
    }
  }

  dc.markSeenMessages(msgId)
}

var dc = new DeltaChat()
dc.configure({ addr, mailPw })
dc.open(cwd, function (err) {
  if (err) throw err

  var listening = ['DC_EVENT_MSGS_CHANGED', 'DC_EVENT_INCOMING_MSG']
  dc.on(listening[0], maybeReply)
  dc.on(listening[1], maybeReply)
})

