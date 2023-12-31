# Bonbaz

<p align="center">
<img src="https://github.com/mahiyou/bonbaz-react/blob/master/misc/first-page.jpg" width="250" text-align-center>
</p>

## Requirements
Bonbaz is fronend of a site of currencies prices. All the prices comes from [bonbast](https://www.bonbast.com/). This site has some extra features compared with bonbast.
Bonbaz is built with [react](https://react.dev/) using version 18.2.0 and [typescript](https://www.typescriptlang.org/) version 4.9.5.
In this project we used some dependencies like react-bootstrap version 2.8.0 , formik version 2.4.4 , recharts version 2.8.0 , ...
This project requires Node.js v18.17.0+ to be installed locally.

## Installation
To get the project up and running, and view components in the browser, complete the following steps:

1. Download and install Node: <https://nodejs.org/>
2. Clone this repo: `git clone git@github.com/mahiyou/bonbaz-react.git` (SSH) or `git clone https://github.com/mahiyou/bonbaz-react.git` (HTTPS)
3. Install project dependancies: `npm install`
4. Start the development environment: `npm start`
5. Open your browser and visit <http://localhost:3000>

## Development
When developing components, you may want assets automatically compiled and the browser to refresh automatically. To do this, run the following task:

* `npm run dev`

## Creating a static build
To create a static instance of this project, run the following task:

* `npm run build`

This will create a folder called `www`, into which the required files will be created.

## Deployment
To make this project publicly accessible, you can deploy a static instance by running the following task:

* `npm run publish`

This will publish the contents of `public` to your `gh-pages` branch.

## Repo structure
Sometimes it’s helpful to know what all these different files are for…

```
/
├─ public
│   ├─ imgs
│   │   └─ currencies
│   └─ mocks
├─ src
│   ├─ assets
│   ├─ components
│   │   ├─ Ads
│   │   ├─ Archive
│   │   ├─ CalendarOfArchive
│   │   ├─ CardForCryptoCurrencies
│   │   ├─ CardForImportantCurrencies
│   │   ├─ ContactUs
│   │   ├─ CurrencyConverter
│   │   ├─ Date
│   │   ├─ DateRangePicker
│   │   ├─ Footer
│   │   ├─ Graph
│   │   ├─ Home
│   │   ├─ Navbar
│   │   ├─ TableOfCoins
│   │   └─ TableOfCurrencies
│   │
│   ├─ app.css       
│   ├─ App.tsx        
│   ├─ custom.scss  
│   ├─ index.css      
│   ├─ index.tsx           
│   ├─ interfaces.ts     
│   ├─ react-app-env.d.ts
│   ├─ reportWebVitals.ts  
│   └─ Router.tsx   
│ 
├─ .gitignore           
├─ package-lock-json     
├─ package.json  
├─ tsconfig.json
└─ README.md    
```

