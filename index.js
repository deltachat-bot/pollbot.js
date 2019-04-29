var DeltaChat = require('deltachat-node')
var events = require('events')
var Pollbot = require('pollbot.js')

var args = process.argv.splice(2)

var addr = args[0]
var mail_pw = args[1]
var cwd = args[2] || process.cwd()
var locale = 'en'
var bot = new Pollbot(locale)

var dc = new DeltaChat()
dc.configure({ addr, mail_pw })
dc.open(cwd, function (err) {
  if (err) throw err
})
