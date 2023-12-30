import { Page } from 'puppeteer'
import { CATEGORIES, FORM_NAMES } from '../../consts'
import { typeInput, selectInput } from '../../puppeteer'
import { selectUnit } from '../guest/guest.utils'
import { Student } from './types'

type Input = {
  student: Student
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES]
}

export const fillStudentDetails = async (
  page: Page,
  { student, category }: Input
) => {
  // Full Name
  await typeInput(page, {
    name: FORM_NAMES.fullName,
    value: student.fullName,
  })

  // Phone
  await typeInput(page, {
    name: FORM_NAMES.phone,
    value: student.phone,
  })

  // Dorm
  await selectInput(page, {
    name: FORM_NAMES.dorm,
    value: student.dorm,
  })

  // Building
  await selectInput(page, {
    name: FORM_NAMES.building,
    value: student.building,
  })

  // Floor
  await selectInput(page, {
    name: FORM_NAMES.floor,
    value: student.floor,
  })

  // Unit
  await selectUnit(page, student.unit)

  // Side
  if (student.side) {
    await selectInput(page, {
      name: FORM_NAMES.side,
      value: student.side,
    })
  }

  // Category
  await selectInput(page, {
    name: FORM_NAMES.category,
    value: category,
  })

  await page.waitForNetworkIdle()
}
