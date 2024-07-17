import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import Home from './page/Home.tsx'
import Calculate from './page/Calculate.tsx'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/calculate",
    element: <Calculate />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
