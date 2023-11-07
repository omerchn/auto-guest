import puppeteer, { Browser } from 'puppeteer'
import { USER_ERRORS } from '../consts'

let browser: Browser | null = null
let timeout: NodeJS.Timeout | null = null

export const getBrowser = async (): Promise<Browser> => {
  try {
    if (!browser) {
      browser = await puppeteer.launch({
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
      console.log('browser opened')
    }
    // Auto close browser after 5 minutes of inactivity
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      await browser?.close()
      console.log('browser closed')
      browser = null
    }, 5 * 60 * 1000)
    return browser
  } catch (err) {
    console.error('error opening browser', err)
    throw USER_ERRORS.serverError
  }
}
