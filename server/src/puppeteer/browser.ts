import puppeteer, { Browser } from 'puppeteer'

let browser: Browser | null = null

export const getBrowser = async (): Promise<Browser> => {
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

    // Auto close browser after 5 minutes
    setTimeout(() => {
      browser?.close().then(() => {
        console.log('browser closed')
      })
      browser = null
    }, 5 * 60 * 1000)
  }
  return browser
}
