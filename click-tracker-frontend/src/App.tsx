import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Stats from "./components/Stats"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
        <Stats />
      </div>
    </Router>
  )
}

export default App

