import { JSDOM } from 'jsdom'
import {
  DOCUMENT_COOKIES,
  DOCUMENT_URL,
  FORM_NAMES,
  USER_ERRORS,
} from './../../consts'
import { Options, OptionsInput } from './options.types'
import { getInputValue, getSelectOptions } from './options.utils'

export const fetchDocument = async (input: OptionsInput) => {
  try {
    const body = new FormData()

    const appendToBody = (name: string, value: string | undefined) => {
      if (!value) return
      body.append(name, value)
    }

    appendToBody(FORM_NAMES.viewState, input.viewState)
    appendToBody(FORM_NAMES.eventValidation, input.eventValidation)
    appendToBody(FORM_NAMES.dorm, input.values?.dorm)
    appendToBody(FORM_NAMES.building, input.values?.building)
    appendToBody(FORM_NAMES.floor, input.values?.floor)
    appendToBody(FORM_NAMES.unit, input.values?.unit)
    appendToBody(FORM_NAMES.side, input.values?.side)

    const res = await fetch(DOCUMENT_URL, {
      method: 'POST',
      headers: { Cookie: DOCUMENT_COOKIES },
      body,
    })

    if (!res.ok) {
      throw `fetching ${DOCUMENT_URL} responded with ${res.status}: ${res.statusText}`
    }

    const docText = await res.text()
    return new JSDOM(docText)
  } catch (err) {
    console.error('error fetching document', err)
    throw USER_ERRORS.serverError
  }
}

export const getViewState = (doc: JSDOM): string =>
  getInputValue(doc, FORM_NAMES.viewState)

export const getEventValidation = (doc: JSDOM): string =>
  getInputValue(doc, FORM_NAMES.eventValidation)

export const getOptions = (doc: JSDOM): Options => ({
  dorm: getSelectOptions(doc, FORM_NAMES.dorm),
  building: getSelectOptions(doc, FORM_NAMES.building),
  floor: getSelectOptions(doc, FORM_NAMES.floor),
  unit: getSelectOptions(doc, FORM_NAMES.unit),
  side: getSelectOptions(doc, FORM_NAMES.side),
})
