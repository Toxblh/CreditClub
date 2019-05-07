[![Latest Stable Version](https://img.shields.io/npm/v/credit-club.svg)](https://www.npmjs.com/package/credit-club)
[![License](https://img.shields.io/npm/l/credit-club.svg)](https://www.npmjs.com/package/credit-club)
[![NPM Downloads](https://img.shields.io/npm/dt/credit-club.svg)](https://www.npmjs.com/package/credit-club)

# Collect credit score from CreditClub
A simple way to collect your score from clubs.moneysavingexpert.com/creditclub

### Example result of work
```
Date: 7 Apr 2019
Score: 932
```

### Install
1. `git clone https://github.com/Toxblh/CreditClub`
2. `cd CreditClub`
3. `echo "module.exports = { login: 'YourL0gin', pass: 'YourPassw0rd', word: 'YourW0rd'}" > creds.js`
4. `yarn` or `npm i`
5. `node ./index.js`
6. Your score already front of you


### Lib version
1. `npm i credit-club`
2. Use
```js
const getCreditClubScore = require('credit-club')

getCreditClubScore({
  login: creds.login,
  pass: creds.pass,
  word: creds.word
}).then(score => {
  console.log('Date:', score.updated_date)
  console.log('Score:', score.score)
})

```
