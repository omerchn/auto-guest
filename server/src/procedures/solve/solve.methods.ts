import { FORM_NAMES } from '../../consts'
import { closePage, getPage, typeInput } from '../../puppeteer'
import { SolveInput } from './solve.types'
import { getFinalMessage } from './solve.utils'

export const solveCaptchaAndSubmit = async (input: SolveInput) => {
  const page = getPage(input.pageId)
  await typeInput(page, {
    name: FORM_NAMES.captchaAnswer,
    value: input.answer,
  })
  await page.click(`[name=${FORM_NAMES.captchaSubmitButton}]`)
  const { type, message } = await getFinalMessage(page)
  closePage(input.pageId)
  return { message, type }
}
