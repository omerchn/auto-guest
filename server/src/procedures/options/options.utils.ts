import { JSDOM } from 'jsdom'

export const getInputValue = (doc: JSDOM, name: string): string => {
  const inputEl = doc.window.document.querySelector(`[name=${name}]`)

  if (!(inputEl instanceof doc.window.HTMLInputElement)) {
    throw new Error(`cant find input element with name ${name}`)
  }

  return (inputEl as HTMLInputElement).value as string
}

export const getSelectOptions = (doc: JSDOM, name: string) => {
  const selectEl = doc.window.document.querySelector(`[name=${name}]`)

  if (!(selectEl instanceof doc.window.HTMLSelectElement)) {
    throw new Error(`cant find select element with name ${name}`)
  }

  const options = Array.from(selectEl.options).map((opt) => ({
    label: opt.label,
    value: opt.value,
  }))

  return options
}

export const appendToBody = (
  body: FormData,
  input: { name: string; value: string | undefined }
) => {
  if (input.value) {
    body.append(input.name, input.value)
  }
}
