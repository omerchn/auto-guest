import { JSDOM } from 'jsdom'
import {
  DOCUMENT_COOKIES,
  DOCUMENT_URL,
  FORM_NAMES,
  USER_ERRORS,
} from './../../consts'
import { Options, OptionsInput } from './options.types'
import { appendToBody, getInputValue, getSelectOptions } from './options.utils'

export const fetchDocument = async (input: OptionsInput) => {
  try {
    const body = new FormData()

    appendToBody(body, {
      name: FORM_NAMES.viewState,
      value: input.viewState,
    })
    appendToBody(body, {
      name: FORM_NAMES.eventValidation,
      value: input.eventValidation,
    })
    appendToBody(body, {
      name: FORM_NAMES.dorm,
      value: input.values?.dorm,
    })
    appendToBody(body, {
      name: FORM_NAMES.building,
      value: input.values?.building,
    })
    appendToBody(body, {
      name: FORM_NAMES.floor,
      value: input.values?.floor,
    })
    appendToBody(body, {
      name: FORM_NAMES.unit,
      value: input.values?.unit,
    })
    appendToBody(body, {
      name: FORM_NAMES.side,
      value: input.values?.side,
    })

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
