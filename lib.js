const puppeteer = require('puppeteer')

async function getCreditClubScore({ login, pass, word }) {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  await page.goto('https://clubs.moneysavingexpert.com/creditclub/login', {
    waitUntil: 'networkidle2',
  })
  await page.waitFor(1000)
  await page.evaluate(
    (eLogin, ePass) => {
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('change', true, true)

      document.querySelector('input[name=email]').value = eLogin
      document.querySelector('input[name=email]').dispatchEvent(evt)

      document.querySelector('input[name=password]').value = ePass
      document.querySelector('input[name=password]').dispatchEvent(evt)

      document.querySelector('button[type=submit]').click()
    },
    login,
    pass,
  )

  await page.waitForNavigation()

  await page.evaluate(eWord => {
    var evt = document.createEvent('HTMLEvents')
    evt.initEvent('change', true, true)

    const w1 = document.querySelector('#memorableWordChar1')
    const w2 = document.querySelector('#memorableWordChar2')
    const w3 = document.querySelector('#memorableWordChar3')

    w1.value = eWord[+w1.placeholder.slice(0, 1) - 1]
    w2.value = eWord[+w2.placeholder.slice(0, 1) - 1]
    w3.value = eWord[+w3.placeholder.slice(0, 1) - 1]

    w1.dispatchEvent(evt)
    w2.dispatchEvent(evt)
    w3.dispatchEvent(evt)

    document.querySelector('#sign-in-2FA-authentication').click()
  }, word)

  await page.waitForNavigation()

  if (await page.waitForSelector('form[name=reconfirmDetails]') !== null) {
    await page.evaluate(
      () => {
        document.querySelector('#details-correct-yes').click()
        document.querySelector('#reconfirm-details').click()
      }
    )
  }

  await page.waitForSelector('.experian-score__score-text--large')
  const updated_date = await page.evaluate(
    () => document.querySelector('.text--no-margin').textContent,
  )
  const creditScore = await page.evaluate(
    () => document.querySelector('.experian-score__score-text--large').textContent,
  )

  const output = {
    updated_date: updated_date.slice(15),
    score: creditScore,
  }

  await browser.close()

  return output
}

module.exports = getCreditClubScore
