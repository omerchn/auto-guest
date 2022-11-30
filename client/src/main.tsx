import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MuiRtl from './containers/MuiRtl'
import { TrpcProvider } from './lib/trpc'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TrpcProvider>
      <MuiRtl>
        <App />
      </MuiRtl>
    </TrpcProvider>
  </React.StrictMode>
)
