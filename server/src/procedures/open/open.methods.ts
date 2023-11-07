import { FORM_NAMES } from '../../consts'
import { closePage, newPage, selectInput, typeInput } from '../../puppeteer'
import { DAY_MS } from './open.consts'
import { OpenInput } from './open.types'
import { saveCaptcha, selectUnit } from './open.utils'

export const openGuestRequest = async (input: OpenInput) => {
  try {
    const { page, pageId } = await newPage()

    await page.goto('https://meonot.shikunbinui.com/')

    // Full Name
    await typeInput(page, {
      name: FORM_NAMES.fullName,
      value: input.student.fullName,
    })

    // Phone
    await typeInput(page, {
      name: FORM_NAMES.phone,
      value: input.student.phone,
    })

    // Dorm
    await selectInput(page, {
      name: FORM_NAMES.dorm,
      value: input.student.dorm,
    })

    // Building
    await selectInput(page, {
      name: FORM_NAMES.building,
      value: input.student.building,
    })

    // Floor
    await selectInput(page, {
      name: FORM_NAMES.floor,
      value: input.student.floor,
    })

    // Unit
    await selectUnit(page, input.student.unit)

    // Side
    if (input.student.side) {
      await selectInput(page, {
        name: FORM_NAMES.side,
        value: input.student.side,
      })
    }

    // Category
    await selectInput(page, {
      name: FORM_NAMES.category,
      value: input.category,
    })

    await page.waitForNetworkIdle()

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

    // Auto close page after 30 seconds
    setTimeout(() => {
      closePage(pageId)
    }, 30 * 1000)

    return {
      pageId,
      captchaImgPath,
    }
  } catch (err) {
    console.error(err)
    throw `אירעה שגיאה, יש לנסות שוב (${err})`
  }
}

// open({
//   category: 'פניות בנושא לינה',
//   student: {
//     id: '123',
//     fullName: '123',
//     phone: '123',
//     dorm: 'מעונות ברושים',
//     building: 'C',
//     floor: '2',
//     unit: '0202',
//   },
//   guest: {
//     fullName: '123',
//     id: '123',
//     phone: '123',
//   },
// })
