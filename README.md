# deltachat-pollbot

 A text-based bot that does polls.

## Usage

```
$ npm install -g deltachat-pollbot
$ deltachat-pollbot addr mail_pw 
```

### TODO 

high priority: 

- [ ] does it properly handle contact requests? 
- [ ] translation of messages in [pollbot.js](karissa/pollbot.js)
- [ ] set a different language by sending message to chat `poll lang de`
- [ ] get a deltachat email for this bot
- [ ] serve the bot somewhere (testrun.org?)

nice to have:

- [ ] support looking at backscroll of fresh messages in the case the bot went down 
- [ ] welcome message on connect, something like 'I am ready to make polls!' 
- [ ] save current poll and language to disk in case bot went down
- [ ] add support to pass in a config file for advanced connection options


## Commands

#### `ask`
```
user1> poll ask "when are you free for camping?" 
june 1-3
june 12-14
July 3-7
august 23-27
poll> poll created!
```

poll only does one poll at a time. Each answer should be separated by
arbitrary whitespace (newlines count).

```
user2> poll ask "sd,,fs."
poll> Can't make a poll, a poll is currently in progress! Use `poll
close` to get results and then try asking again.
```

#### `help`

If there is a poll in progress:
```
user2> poll help
poll> current poll: "when are you free for camping?"

Options: 
0: june 1-3
1: june 12-14
2: July 3-7
3: august 23-27
4: none

Say something like "poll answer 1" to respond!
Say "poll close" to get results and start a new poll.
```

If there is no poll in progress:

```
user2> poll help
poll> There is no poll in progress! Use `poll ask question
answer answer...` and `poll answer` to respond. When the poll is done,
say `poll close`.
```

#### `answer`

```
user2> poll answer 1
poll> got option #1 

user4> poll answer july 3-7
poll> got option #3 

user2> poll answer 6
poll> I didn't understand "6", maybe that answer doesn't exist! Try "poll help" 
```

### `close`

Closes the poll and prints results.

```
user2> poll: close 
poll> "poll is closed! results: A=23, B=1, C=5" 
```

### License 

MIT
