import { useState } from "react";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import ProjectsRail from "./components/ProjectsRail";
import Capabilities from "./components/Capabilities";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import SocialDock from "./components/SocialDock";
import TechStack from "./components/TechStack";
import LoadingScreen from "./components/LoadingScreen";
import { portfolio } from "./content/portfolio";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);

  usePortfolioMotion(introComplete);

  return (
    <div className="page-shell">
      {!introComplete ? (
        <LoadingScreen onComplete={() => setIntroComplete(true)} />
      ) : null}
      <Cursor />
      <div className="page-shell__blur page-shell__blur--one" />
      <div className="page-shell__blur page-shell__blur--two" />
      <div className="page-shell__grid" />
      <div className="nav-fade" />

      <header className="topbar">
        <a className="topbar__brand hover-link" href="#top" data-cursor="disable">
          <span className="hover-in">
            <span>Portfolio</span>
            <div>Portfolio</div>
          </span>
        </a>
        <p className="topbar__connect" data-cursor="disable">
          {portfolio.contact.email}
        </p>
        <nav className="topbar__nav">
          <a className="hover-link" data-href="#about" href="#about">
            <span className="hover-in">
              <span>About</span>
              <div>About</div>
            </span>
          </a>
          <a className="hover-link" data-href="#work" href="#work">
            <span className="hover-in">
              <span>Work</span>
              <div>Work</div>
            </span>
          </a>
          <a className="hover-link" data-href="#contact" href="#contact">
            <span className="hover-in">
              <span>Contact</span>
              <div>Contact</div>
            </span>
          </a>
        </nav>
      </header>

      <SocialDock />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="page">
            <Hero />
            <About />
            <Capabilities />
            <Experience />
            <ProjectsRail />
            <TechStack />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
