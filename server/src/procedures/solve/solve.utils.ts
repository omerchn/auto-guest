import { Page } from 'puppeteer'
import {
  USER_ERRORS,
  FAILURE_MESSAGE_SELECTOR,
  SUCCESS_MESSAGE_SELECTOR,
  MAINTENANCE_FAILURE_MESSAGE_SELECTOR,
} from '../../consts'

export const getFinalMessage = async (page: Page) => {
  try {
    await Promise.race([
      page.waitForSelector(SUCCESS_MESSAGE_SELECTOR),
      page.waitForSelector(FAILURE_MESSAGE_SELECTOR),
      page.waitForSelector(MAINTENANCE_FAILURE_MESSAGE_SELECTOR),
    ])

    const { type, message } = await page.evaluate(
      ({
        SUCCESS_MESSAGE_SELECTOR,
        FAILURE_MESSAGE_SELECTOR,
        MAINTENANCE_FAILURE_MESSAGE_SELECTOR,
      }) => {
        const errorEl = document.querySelector(FAILURE_MESSAGE_SELECTOR)
        const successEl = document.querySelector(SUCCESS_MESSAGE_SELECTOR)
        const maintenanceErrorEl = document.querySelector(
          MAINTENANCE_FAILURE_MESSAGE_SELECTOR
        )
        if (maintenanceErrorEl) {
          return {
            type: 'failure' as const,
            message: maintenanceErrorEl.textContent,
          }
        }
        if (errorEl) {
          return {
            type: 'failure' as const,
            message: errorEl.textContent,
          }
        }
        if (successEl) {
          return {
            type: 'success' as const,
            message: successEl.textContent,
          }
        }
        return {}
      },
      {
        SUCCESS_MESSAGE_SELECTOR,
        FAILURE_MESSAGE_SELECTOR,
        MAINTENANCE_FAILURE_MESSAGE_SELECTOR,
      }
    )

    if (!message) {
      throw `could not find final message with selectors success: ${SUCCESS_MESSAGE_SELECTOR} failure: ${FAILURE_MESSAGE_SELECTOR}`
    }

    return {
      type,
      message,
    }
  } catch (err) {
    console.error('error getting final message', err)
    throw USER_ERRORS.serverError
  }
}
