import puppeteer, { Browser } from 'puppeteer'

let browser: Browser | null = null

export const getBrowser = async (): Promise<Browser> => {
  if (!browser)
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
  return browser
}
