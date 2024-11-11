Repository Documentation
This document provides a comprehensive overview of the repository's structure and contents.
The first section, titled 'Directory/File Tree', displays the repository's hierarchy in a tree format.
In this section, directories and files are listed using tree branches to indicate their structure and relationships.
Following the tree representation, the 'File Content' section details the contents of each file in the repository.
Each file's content is introduced with a '[File Begins]' marker followed by the file's relative path,
and the content is displayed verbatim. The end of each file's content is marked with a '[File Ends]' marker.
This format ensures a clear and orderly presentation of both the structure and the detailed contents of the repository.

Directory/File Tree Begins -->

public/
├── index.html
├── manifest.json
└── robots.txt

<-- Directory/File Tree Ends

File Content Begin -->
[File Begins] index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!--
    Provide multiple sizes/resolutions for broad support
    -->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16.png">

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="InSilico Stratagy"
      content="InSilico Strategy website"
    />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>InSilico Strategy</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

[File Ends] index.html

[File Begins] manifest.json
{
  "short_name": "InSilico Strategy",
  "name": "InSilico Strategy Webpage",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "favicon-16.png",
      "type": "image/png",
      "sizes": "16x16"
    },
    {
      "src": "favicon-32.png",
      "type": "image/png",
      "sizes": "32x32"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

[File Ends] manifest.json

[File Begins] robots.txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

[File Ends] robots.txt


<-- File Content Ends

