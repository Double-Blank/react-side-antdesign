/* eslint-disable */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import './App.css';
import './style.css';
import Counter from './01/count'
import Table from './02/table'
// import Timer2 from './03/Time1'
import intelligence from './04/index'

const routes: any[] = [
  ["01 Counter", Counter],
  ["02 Table", Table],
  // ["03 Time", Timer2],
  // ["03 ImgTest", ImgTest],
  ["04 intelligence", intelligence],
  // ["04 VideoJS", VideoJS]
]

function App() {
  return (
    <Router>
      <div className="App">
        <ul className="sider">
          {routes.map(([label]) => (
            <li key={label}>
              <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <div id="pageContainer" className="page-container">
          <Routes>
            {routes.map(([label, Component, additionalRoute = ""]) => {
              return (
                <Route
                  key={label}
                  path={`/${label.replace(" ", "/")}${additionalRoute}`}
                  element={<Component />}
                >
                </Route>
              )
            })}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
