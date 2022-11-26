const puppeteer = require('puppeteer')
const { v4: uuid } = require('uuid')
const fs = require('fs')

const pupCache = {}

const start = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  const pupId = uuid()
  pupCache[pupId] = { browser, page }

  await page.goto('https://meonot.shikunbinui.com/')

  await page.type('[name=FullName]', 'מרייה דרגילב')

  await page.type('[name=Phone]', '0523565333')

  await page.select('[name=DormDropDown]', '1')
  await page.waitForNavigation()

  await page.select('[name=DropDownBuilding]', '1F')
  await page.waitForNavigation()

  await page.select('[name=DropDownFloor]', '1F02')
  await page.waitForNavigation()

  await page.click('.select2-selection', { delay: 100 })
  await page.click('.select2-results__option:nth-child(3)')
  await page.waitForNavigation()

  await page.select('[name=DropDownSide]', 'ימין')
  await page.waitForNavigation()

  await page.select('[name=DropDownFaultCategory]', 'GUESTS')
  await page.waitForNavigation()

  await page.type('[name=ID_TB]', 'MARIA_ID')

  const today = new Date().toLocaleDateString('en-GB')
  await page.type('[name=EntranceDate_TB]', today)

  await page.type('[name=GuestID_TB]', '324173046')

  await page.type('[name=GuestName_TB]', 'עומר כהן')

  await page.type('[name=GuestPhone_TB]', '0543395856')

  const captchaEl = await page.$('.BDC_CaptchaImageDiv')
  await captchaEl.screenshot({ path: `captchas/${pupId}.png` })

  setTimeout(() => {
    closePup(pupId)
  }, 120000)

  return pupId
}

const solveCaptchaAndSubmit = async (pupId, answer) => {
  const { page } = pupCache[pupId]
  await page.type('[name=CaptchaCodeTextBox]', answer)
  await page.click('[name=Button1]')
  await page.waitForNavigation()
  const { color, msg } = await page.evaluate(() => {
    const resultEl = document.querySelector('#lblResult')
    return {
      color: resultEl.style.color,
      msg: resultEl.textContent,
    }
  })
  if (color === 'red') {
    closePup(pupId)
    throw msg
  }
  return msg
}

const closePup = async (pupId) => {
  const { browser } = pupCache[pupId]
  await browser.close()
  try {
    fs.unlink(`captchas/${pupId}.png`, (err) => {
      if (err) throw err
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  pupCache,
  start,
  solveCaptchaAndSubmit,
}
