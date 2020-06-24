const basicAuth = require("express-basic-auth")

module.exports = {
  siteMetadata: {
    title: `TinaCMS Cloud Editor Tutorial`,
    author: `Señor Sean`,
    description: `A starter blog demonstrating TinaCMS.`,
    siteUrl: `https://seanmichael.me/`,
    social: {
      twitter: `seansean11`,
    },
  },
  developMiddleware: app => {
    app.use(
      basicAuth({
        users: { test: "test" },
        challenge: true,
        realm: "your app name",
      })
    )
  },
  plugins: [
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        plugins: [
          {
            resolve: "gatsby-tinacms-git",
            options: {
              gitRemote:
                "git@github.com:Integral-Stack/tinacms-cloud-editor-tutorial.git",
              defaultCommitMessage: "Edited with TinaCMS",
              defaultCommitName: "Cloud Editor",
              defaultCommitEmail: "cloud-editor@integralstack.io",
            },
          },
          "gatsby-tinacms-remark",
          "gatsby-tinacms-json",
        ],
        sidebar: {
          hidden: process.env.NODE_ENV === "production",
          position: "displace",
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/data`,
        name: `data`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
