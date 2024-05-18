import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import FavPage from "../Favorite/Favorite.jsx";
import Home from "../Home/Home.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/ROUTE" element={<Router_Name />} />
          <Route path="/ROUTE" element={<Router_Name />} />*/}
          <Route path="/favorite" element={<FavPage />} /> 
      </Router>      
    </div>
  );
}


export default App;
