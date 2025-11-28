import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { navigationWrapper } from './core/navigator/broserRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={navigationWrapper} />
  </StrictMode>,
)
