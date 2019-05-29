const getCreditClubScore = require('./lib')
const creds = require('./creds')

getCreditClubScore({
  login: creds.login,
  pass: creds.pass,
  word: creds.word,
}).then(score => {
  console.log('Date:', score.updated_date)
  console.log('Score:', score.score)
})
