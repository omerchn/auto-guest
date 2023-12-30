import { FORM_NAMES, PAGE_AUTO_CLOSE_TIME_MS } from '../../consts'
import { closePage, newPage, selectInput, typeInput } from '../../puppeteer'
import { fillStudentDetails } from '../shared'
import { DAY_MS } from './guest.consts'
import { GuestInput } from './guest.types'
import { saveCaptcha, selectUnit } from './guest.utils'

export const createGuestRequest = async (input: GuestInput) => {
  try {
    const { page, pageId } = await newPage()

    await page.goto('https://meonot.shikunbinui.com/')

    await fillStudentDetails(page, input)

    // ID
    await typeInput(page, {
      name: FORM_NAMES.id,
      value: input.student.id,
    })

    // Entrance Date
    const today = new Date().toLocaleDateString('en-GB')
    await typeInput(page, {
      name: FORM_NAMES.entranceDate,
      value: today,
    })

    // Leave Date
    if (input.category === 'פניות בנושא לינה') {
      const tomorrow = new Date(Date.now() + DAY_MS).toLocaleDateString('en-GB')
      await typeInput(page, {
        name: FORM_NAMES.leaveDate,
        value: tomorrow,
      })
    }

    // Guest ID
    await typeInput(page, {
      name: FORM_NAMES.guestId,
      value: input.guest.id,
    })

    // Guest Name
    await typeInput(page, {
      name: FORM_NAMES.guestFullName,
      value: input.guest.fullName,
    })

    // Guest Phone
    await typeInput(page, {
      name: FORM_NAMES.guestPhone,
      value: input.guest.phone,
    })

    // Captcha
    const captchaImgPath = await saveCaptcha(page, pageId)

    // Auto close page
    setTimeout(() => {
      closePage(pageId)
    }, PAGE_AUTO_CLOSE_TIME_MS)

    return {
      pageId,
      captchaImgPath,
    }
  } catch (err) {
    console.error(err)
    throw `אירעה שגיאה, יש לנסות שוב (${err})`
  }
}
