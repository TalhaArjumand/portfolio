import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import CredibilityStrip from "./components/CredibilityStrip";
import ProjectsRail from "./components/ProjectsRail";
import Capabilities from "./components/Capabilities";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import SocialDock from "./components/SocialDock";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";

const App = () => {
  usePortfolioMotion();

  return (
    <div className="page-shell">
      <Cursor />
      <div className="page-shell__blur page-shell__blur--one" />
      <div className="page-shell__blur page-shell__blur--two" />
      <div className="page-shell__grid" />
      <div className="nav-fade" />

      <header className="topbar">
        <a className="topbar__brand hover-link" href="#top">
          <span className="hover-in">
            <span>Portfolio</span>
            <div>Portfolio</div>
          </span>
        </a>
        <p className="topbar__connect">Let's Connect</p>
        <nav className="topbar__nav">
          <a className="hover-link" href="#about">
            <span className="hover-in">
              <span>About</span>
              <div>About</div>
            </span>
          </a>
          <a className="hover-link" href="#work">
            <span className="hover-in">
              <span>Work</span>
              <div>Work</div>
            </span>
          </a>
          <a className="hover-link" href="#contact">
            <span className="hover-in">
              <span>Contact</span>
              <div>Contact</div>
            </span>
          </a>
        </nav>
      </header>

      <SocialDock />

      <main className="page">
        <Hero />
        <CredibilityStrip />
        <ProjectsRail />
        <Capabilities />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default App;
