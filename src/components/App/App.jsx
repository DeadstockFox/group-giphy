import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Home from "../Home/Home.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
          {/* Home page with search and gif result */}
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/ROUTE" element={<Router_Name />} />
          <Route path="/ROUTE" element={<Router_Name />} />
          <Route path="/ROUTE" element={<Router_Name />} /> */}
      </Router>      
    </div>
  );
}


export default App;
