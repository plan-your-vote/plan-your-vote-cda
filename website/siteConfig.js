/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const PROJECT_NAME = 'Plan Your Vote';
const GITHUB_USERNAME = 'AmyHong0502';
const GITHUB_REPO_NAME = 'plan-your-vote-cda';

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'City of Foo',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: `/${GITHUB_REPO_NAME}/img/undraw_open_source.svg`, // TODO
    infoLink: 'https://www.facebook.com', // TODO
    pinned: true
  },
  {
    caption: 'Bar Highschool',
    image: `/${GITHUB_REPO_NAME}/img/undraw_open_source.svg`, // TODO
    infoLink: 'https://www.facebook.com', // TODO
    pinned: true
  }
];

const siteConfig = {
  title: PROJECT_NAME,
  tagline: 'A website for documentation', // TODO
  url: `https://${GITHUB_USERNAME}.github.io`,
  baseUrl: `/${GITHUB_REPO_NAME}/`,
  projectName: GITHUB_REPO_NAME,
  organizationName: GITHUB_USERNAME,
  headerLinks: [
    { doc: 'adding-a-candidate', label: 'Docs' },
    { doc: 'setting-up', label: 'Tutorial' },
    { page: 'help', label: 'Help' }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#35489e',
    secondaryColor: '#25326e'
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  copyright: `Copyright © ${new Date().getFullYear()} ${PROJECT_NAME}`,
  highlight: {
    theme: 'default'
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
  enableUpdateTime: true

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
