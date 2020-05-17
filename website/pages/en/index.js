const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="projectBackground" />
        <div className="projectBackgroundGradient" />
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = (props) => (
      <div className="projectTitle">
        <img src="/img/logo.svg" alt="Project Logo" width={64} />
        <h1 style={{ fontSize: "0.8em", marginBottom: "20px" }}>
          State Manager for React
        </h1>
        <h2 style={{ color: "hsla(0,0%,100%,.9)" }}>As simple as it gets</h2>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;

    const GlobalState = () => (
      <Container padding={["bottom", "top"]}>
        <div className="exampleWrapper">
          <h2 className="codeExplanation">Global</h2>
          <p className="codeExplanation">Wrap your state object with lape</p>
          <div className="codeBlock">
            {`import { lape } from 'lape'

const state = `}
            <b>lape</b>
            {`({
  count: 0,
  deep: {
     nest: true
  }
})
`}
          </div>
        </div>
      </Container>
    );

    const ComponentState = () => (
      <Container padding={["bottom", "top"]} background={"light"}>
        <div className="exampleWrapper">
          <h2 className="codeExplanation">Connect</h2>
          <p className="codeExplanation">Wrap your component with connect</p>

          <div className="codeBlock">
            {`import { connect } from 'lape'

const Component = `}
            <b>connect</b>
            {`(() => {


})
`}
          </div>
        </div>
      </Container>
    );

    const LocalState = () => (
      <Container padding={["bottom", "top"]}>
        <div className="exampleWrapper">
          <h2 className="codeExplanation">Local</h2>
          <div className="codeBlock">
            {`import { useLape } from 'lape'

const Component = () => {
  const state = `}
            <b>useLape</b>
            {`({
    count: 1,
  });

  const onClick = () => state.count += 1;
  
  return <div onClick={onClick}>{state.count}</div>
})
`}
          </div>
        </div>
      </Container>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <GlobalState />
        <ComponentState />
        <LocalState />
      </div>
    );
  }
}

module.exports = Index;
