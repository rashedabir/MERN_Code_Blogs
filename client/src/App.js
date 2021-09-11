import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Tips from "./screens/Tips";
import Login from "./screens/Login";
import { useContext, useEffect, useState } from "react";
import Category from "./screens/Category";
import CreatePost from "./screens/CreatePost";
import BlogDetails from "./screens/BlogDetails";
import { GlobalState } from "./context/GlobalState";
import NotFound from "./screens/NotFound";
import Loader from "react-loader-spinner";

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [loading] = state.userAPI.loading;
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
    <>
      {loading ? (
        <Loader
          type="Bars"
          color="#122"
          height={100}
          width="100%"
          timeout={loading} //3 secs
        />
      ) : (
        <Router>
          <Header />
          <div className="container">
            <div className="row my-3 p-3">
              <div className={active ? "col-lg-12" : "col-lg-8"}>
                <div className="main__content my-2">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/tips" component={Tips} />
                    <Route
                      exact
                      path="/login"
                      component={isLogged ? NotFound : Login}
                    />
                    <Route
                      exact
                      path="/category"
                      component={isLogged ? Category : NotFound}
                    />
                    <Route
                      exact
                      path="/create_post"
                      component={isLogged ? CreatePost : NotFound}
                    />
                    <Route
                      exact
                      path="/edit_post/:id"
                      component={isLogged ? CreatePost : NotFound}
                    />
                    <Route exact path="/blog/:id" component={BlogDetails} />
                    <Route exact path="*" component={NotFound} />
                  </Switch>
                </div>
              </div>
              {active ? null : (
                <div className="col-lg-4">
                  <div className="info my-2">
                    <Sidebar />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
