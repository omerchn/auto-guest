import { FORM_NAMES, PAGE_AUTO_CLOSE_TIME_MS } from '../../consts'
import { closePage, newPage, typeInput } from '../../puppeteer'
import { saveCaptcha } from '../guest/guest.utils'
import { fillStudentDetails } from '../shared'
import { MaintenanceInput } from './maintenance.types'

export const createMaintenanceRequest = async (input: MaintenanceInput) => {
  const { page, pageId } = await newPage()

  await page.goto('https://meonot.shikunbinui.com/')

  await fillStudentDetails(page, input)

  await typeInput(page, {
    name: FORM_NAMES.maintenanceText,
    value: input.text,
  })

  const captchaImgPath = await saveCaptcha(page, pageId)

  // Auto close page
  setTimeout(() => {
    closePage(pageId)
  }, PAGE_AUTO_CLOSE_TIME_MS)

  return {
    pageId,
    captchaImgPath,
  }
}
