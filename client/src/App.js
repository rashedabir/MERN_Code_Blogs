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
import Login from "./screens/Login";
import { useEffect, useState } from "react";
import Category from "./screens/Category";
import CreatePost from "./screens/CreatePost";

function App() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let currentUrl = window.location.href;
    if (currentUrl.endsWith("/login")) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [active]);

  return (
    <Router>
      <Header />
      <div className="container">
        <div className="row my-3 p-3">
          <div className={active ? "col-lg-12" : "col-lg-8"}>
            <div className="main__content my-2">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/tips" component={Tips} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/category" component={Category} />
                <Route exact path="/create_post" component={CreatePost} />
                <Route exact path="/edit_post/:id" component={CreatePost} />
              </Switch>
            </div>
          </div>
          {active ? null : (
            <div className="col-lg-4">
              <div className="info bg-white border my-2">
                <Sidebar />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
