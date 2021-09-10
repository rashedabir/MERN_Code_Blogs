import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import About from "./screens/About";
import Books from "./screens/Books";
import Contact from "./screens/Contact";
import Tips from "./screens/Tips";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <div className="row my-3 p-3">
          <div className="col-lg-8">
            <div className="main__content bg-white border my-2">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/tips" component={Tips} />
              </Switch>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info bg-white border my-2">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
