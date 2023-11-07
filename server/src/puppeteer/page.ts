import * as fs from 'fs'
import { Page } from 'puppeteer'
import { v4 as uuid } from 'uuid'
import { getBrowser } from './browser'
import { USER_ERRORS } from '../consts'

export const pageCache: {
  [pageId: string]: Page | undefined
} = {}

export const getPage = (pageId: string) => {
  const page = pageCache[pageId]
  if (!page) {
    throw USER_ERRORS.pageClosed
  }
  return page
}

export const newPage = async (): Promise<{ page: Page; pageId: string }> => {
  try {
    const browser = await getBrowser()
    const page = await browser.newPage()
    console.log('page created')
    const pageId = uuid()
    pageCache[pageId] = page
    return { page, pageId }
  } catch (err) {
    console.error('error creating page', err)
    throw USER_ERRORS.serverError
  }
}

export const closePage = async (pageId: string) => {
  try {
    const page = pageCache[pageId]
    if (!page) return
    await page.close()
    console.log('page closed')
    delete pageCache[pageId]
    const captchaImgPath = `captchas/${pageId}.png`
    fs.unlink(captchaImgPath, (err) => err)
    console.log(`deleted ${captchaImgPath}`)
  } catch (err) {
    console.error('error closing page', err)
    throw USER_ERRORS.serverError
  }
}
