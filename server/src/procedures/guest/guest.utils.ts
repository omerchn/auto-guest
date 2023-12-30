import { Page } from 'puppeteer'
import { getLiIndex } from '../../puppeteer'

export const selectUnit = async (page: Page, unit: string) => {
  await page.waitForSelector('.select2-selection')
  await page.click('.select2-selection', { delay: 100 })
  const optionIndex = await getLiIndex(page, '.select2-results', unit)
  await page.click(`.select2-results__option:nth-child(${optionIndex})`)
}

export const saveCaptcha = async (page: Page, pageId: string) => {
  const captchaSelector = '.BDC_CaptchaImageDiv'
  await page.waitForSelector(captchaSelector)
  const captchaEl = await page.$(captchaSelector)
  const path = `captchas/${pageId}.png`
  await captchaEl?.screenshot({ path })
  return `/${path}`
}
