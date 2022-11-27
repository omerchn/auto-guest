import puppeteer, { Browser, Page } from 'puppeteer'
import { v4 as uuid } from 'uuid'
import { closePup, getOptionIndex, getOptionValue } from './pup-utils'

const pupCache: {
  [pupId: string]: {
    browser: Browser
    page: Page
  }
} = {}

export interface StartInput {
  student: {
    id: string
    fullName: string
    phone: string
    dorm: 'מעונות איינשטיין' | 'מעונות ברושים'
    building: string
    floor: string
    apartmentNumber: string
    side: 'ימין' | 'שמאל'
  }
  category: 'פניות בנושא מבקרים' | 'פניות בנושא לינה'
  guest: {
    id: string
    fullName: string
    phone: string
  }
}

export const start = async (input: StartInput) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    env: {
      DISPLAY: ':10.0',
    },
  })
  const page = await browser.newPage()

  const pupId = uuid()
  pupCache[pupId] = {
    browser,
    page,
  }

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
  // await page.waitForNavigation()
  await page.waitForNetworkIdle()

  // ID
  await page.waitForSelector('[name=ID_TB]')
  await page.type('[name=ID_TB]', input.student.id)

  // Entrance Date
  const today = new Date().toLocaleDateString('en-GB')
  await page.waitForSelector('[name=EntranceDate_TB]')
  await page.type('[name=EntranceDate_TB]', today)

  // Leave Date
  if (input.category === 'פניות בנושא לינה') {
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-GB')
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
  await captchaEl?.screenshot({ path: `captchas/${pupId}.png` })

  // Auto close instance after 1 minute
  setTimeout(() => {
    closePup(pupId, browser)
  }, 60000)

  return pupId
}

export const solveCaptchaAndSubmit = async (pupId: string, answer: string) => {
  const pup = pupCache[pupId]
  if (!pup) {
    throw 'puppeteer instance not found'
  }
  const { browser, page } = pup
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
    closePup(pupId, browser)
    throw msg
  } else if (color === 'green') {
    closePup(pupId, browser)
    return msg
  }
}
