import puppeteer, { Page } from 'puppeteer'
import { getOptionIndex, getOptionValue } from '../puppeteer/utils'
import { ProcInput } from '.'
import { connect } from './messages'

const { sendMessage } = connect({
  to: process,
  onMessage({ type, body }) {
    if (type === 'START') {
      startRequest(body)
    }
  },
})

async function startRequest({ procId, input }: ProcInput) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
    })
    const page = await browser.newPage()

    await page.goto('https://meonot.shikunbinui.com/')

    // Full Name
    await page.waitForSelector('[name=FullName]')
    await page.type('[name=FullName]', input.student.fullName)

    // Phone
    await page.waitForSelector('[name=Phone]')
    await page.type('[name=Phone]', input.student.phone)

    // Dorm
    await page.waitForSelector('[name=DormDropDown]')
    await page.select(
      '[name=DormDropDown]',
      await getOptionValue(page, '[name=DormDropDown]', input.student.dorm)
    )

    // Building
    await page.waitForSelector('[name=DropDownBuilding]')
    await page.select(
      '[name=DropDownBuilding]',
      await getOptionValue(
        page,
        '[name=DropDownBuilding]',
        input.student.building
      )
    )

    // Floor
    await page.waitForSelector('[name=DropDownFloor]')
    await page.select(
      '[name=DropDownFloor]',
      await getOptionValue(page, '[name=DropDownFloor]', input.student.floor)
    )

    // Apartment Number
    await page.waitForSelector('.select2-selection')
    await page.click('.select2-selection', { delay: 100 })
    const optionIndex = await getOptionIndex(
      page,
      '.select2-results',
      input.student.apartmentNumber
    )
    await page.click(`.select2-results__option:nth-child(${optionIndex})`)

    // Side
    await page.waitForSelector('[name=DropDownSide]')
    await page.select('[name=DropDownSide]', input.student.side)

    // Category
    await page.waitForSelector('[name=DropDownFaultCategory]')
    await page.select(
      '[name=DropDownFaultCategory]',
      await getOptionValue(page, '[name=DropDownFaultCategory]', input.category)
    )

    // ID
    await page.waitForSelector('[name=ID_TB]')
    await page.type('[name=ID_TB]', input.student.id)

    // Entrance Date
    const today = new Date().toLocaleDateString('en-GB')
    await page.waitForSelector('[name=EntranceDate_TB]')
    await page.type('[name=EntranceDate_TB]', today)

    // Leave Date
    if (input.category === 'פניות בנושא לינה') {
      const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString(
        'en-GB'
      )
      await page.waitForSelector('[name=LeaveDate_TB]')
      await page.type('[name=LeaveDate_TB]', tomorrow)
    }

    // Guest ID
    await page.waitForSelector('[name=GuestID_TB]')
    await page.type('[name=GuestID_TB]', input.guest.id)

    // Guest Name
    await page.waitForSelector('[name=GuestName_TB]')
    await page.type('[name=GuestName_TB]', input.guest.fullName)

    // Guest Phone
    await page.waitForSelector('[name=GuestPhone_TB]')
    await page.type('[name=GuestPhone_TB]', input.guest.phone)

    // Captcha
    await page.waitForSelector('.BDC_CaptchaImageDiv')
    const captchaEl = await page.$('.BDC_CaptchaImageDiv')
    await captchaEl?.screenshot({ path: `captchas/${procId}.png` })

    sendMessage({
      type: 'SUCCESS',
      body: procId,
    })

    connect({
      to: process,
      onMessage({ type, body }) {
        if (type === 'SOLVE') solveCaptchaAndSubmit({ page, answer: body })
      },
    })
  } catch (err) {
    sendMessage({
      type: 'ERROR',
      body: err,
    })
  }
}

async function solveCaptchaAndSubmit({
  page,
  answer,
}: {
  page: Page
  answer: string
}) {
  try {
    await page.type('[name=CaptchaCodeTextBox]', answer)
    await page.click('[name=Button1]')
    await Promise.race([
      page.waitForSelector('#lblResult'),
      page.waitForSelector('#doneProgras'),
    ])
    const { color, msg } = await page.evaluate(() => {
      const errorEl = document.getElementById('lblResult')
      const successEl = document.getElementById('doneProgras')
      if (errorEl) {
        return {
          color: errorEl.style.color,
          msg: errorEl.textContent,
        }
      } else if (successEl) {
        return {
          color: successEl.style.color,
          msg: successEl.textContent,
        }
      } else return {}
    })
    if (color === 'red') {
      sendMessage({ type: 'ERROR', body: msg })
    } else if (color === 'green') {
      sendMessage({ type: 'ERROR', body: msg })
    }
  } catch (err) {
    sendMessage({ type: 'ERROR', body: err })
  }
}
