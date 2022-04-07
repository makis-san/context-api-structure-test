import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { renderHomeRoute } from './routes'

export const Router: React.FC = () => {
  const fallbackRoute = (
    <Navigate to='/404' state={{ useAlternativeLayout: true }} />
  )

  return (
    <Suspense fallback={<h3>loading...</h3>}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={renderHomeRoute()} />
            <Route path='404' element={<h3>4O4 :(</h3>} />
          </Route>
          <Route path='*' element={fallbackRoute} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
