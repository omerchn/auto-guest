import * as fs from 'fs'
import { Page } from 'puppeteer'
import { v4 as uuid } from 'uuid'
import { getBrowser } from './browser'

export const pageCache: {
  [pageId: string]: Page | undefined
} = {}

export const newPage = async (): Promise<{ page: Page; pageId: string }> => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  const pageId = uuid()
  pageCache[pageId] = page

  return { page, pageId }
}

export const closePage = async (pageId: string) => {
  try {
    const page = pageCache[pageId]
    if (!page) return
    await page.close()
    delete pageCache[pageId]
    fs.unlink(`captchas/${pageId}.png`, (err) => err)
  } catch (err) {
    console.error(err)
  }
}
