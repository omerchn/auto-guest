import { procedure } from '../../trpc'
import { optionsInputSchema, optionsOutputSchema } from './options.types'
import {
  fetchDocument,
  getViewState,
  getEventValidation,
  getOptions,
} from './options.methods'

export const options = procedure
  .input(optionsInputSchema)
  .output(optionsOutputSchema)
  .query(async ({ input }) => {
    const doc = await fetchDocument(input)
    const viewState = getViewState(doc)
    const eventValidation = getEventValidation(doc)
    const options = getOptions(doc)

    return {
      viewState,
      eventValidation,
      options,
    }
  })
