import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import React from 'react'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

export default function MuiRtl(props: { children: React.ReactNode }) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
}
