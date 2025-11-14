import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Landing } from './features/landing'
import { Patients } from './features/patients'
import { Layout } from './features/shared'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
