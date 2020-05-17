const users = [
  {
    caption: "Ugnis",
    image: "/img/ugnis.png",
    infoLink: "https://www.ugnis.com",
    pinned: true,
  },
];

const siteConfig = {
  title: "Lape",
  tagline: "State Manager for React",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",

  projectName: "lape",
  organizationName: "UgnisSoftware",

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "doc1", label: "Docs" },
    { href: "https://github.com/UgnisSoftware/lape", label: "GitHub" },
  ],

  users,

  headerIcon: "img/logo.ico",
  footerIcon: "img/logo.ico",
  favicon: "img/logo.ico",

  colors: {
    primaryColor: "#101931",
    secondaryColor: "#f29c1f",
  },

  copyright: `Copyright © ${new Date().getFullYear()} Ugnis. All Rights Reserved.`,

  highlight: {
    theme: "default",
  },

  fonts: {
    myFont: ["Muli"],
    codeFont: ["Source Code Pro"],
  },

  stylesheets: [
    "https://fonts.googleapis.com/css?family=Muli:300,400,500,700",
    "https://fonts.googleapis.com/css2?family=Source+Code+Pro",
  ],

  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  repoUrl: "https://github.com/UgnisSoftware/lape",
};

module.exports = siteConfig;
