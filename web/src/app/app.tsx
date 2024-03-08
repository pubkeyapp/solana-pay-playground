import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

export function App() {
  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <h1>Page 2</h1>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  )
}

export function Home() {
  const [result, setResult] = useState()
  return (
    <div>
      <h1>Home</h1>
      This is the generated root route. <Link to="/page-2">Click here for page 2.</Link>
      <button
        onClick={() => {
          fetch('/api')
            .then((res) => res.json())
            .then(setResult)
        }}
      >
        Fetch Data
      </button>
      <pre>{JSON.stringify(result ?? 'No Result', null, 2)}</pre>
    </div>
  )
}
