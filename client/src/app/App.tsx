import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Projects from "./views/Projects";
import ProjectOverview from "./views/ProjectOverview";
import "./tailwind.generated.css";

export default function App() {
  return (
    <Router>
      <header className="bg-gray-900 text-white flex items-center h-12">
        <div className="container w-full">
          <Link className="navbar-brand" to="/">
            Timelogger
          </Link>
        </div>
      </header>
      <main>
        <div className="container mx-auto w-full">
          <Switch>
            <Route path="/project/:id" component={ProjectOverview} />
            <Route path="/" component={Projects} />
          </Switch>
        </div>
      </main>
    </Router>
  );
}
