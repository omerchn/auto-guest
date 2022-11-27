import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RTL from './components/RTL'
import './index.scss'
import { TrpcProvider } from './lib/trpc'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TrpcProvider>
      <RTL>
        <App />
      </RTL>
    </TrpcProvider>
  </React.StrictMode>
)
