# Bonbaz

## Requirements
Bonbaz is built with [react](https://react.dev/) using version 18.2.0 and [typescript](https://www.typescriptlang.org/) version 4.9.5.
In this project we used some dependencies like react-bootstrap version 2.8.0 , formik version 2.4.4 , recharts version 2.8.0 , ...
This project requires Node.js v18.17.0+ to be installed locally.

## Installation
To get the project up and running, and view components in the browser, complete the following steps:

1. Download and install Node: <https://nodejs.org/>
2. Clone this repo: `git clone git@github.com:24ways/frontend.git` (SSH) or `git clone https://github.com/24ways/frontend.git` (HTTPS)
3. [Optional] Install Gulp globally: `npm install gulp -g`
4. [Optional] Install Fractal globally: `npm install fractal -g`
5. Install project dependancies: `npm install`
6. Start the development environment: `npm start`
7. Open your browser and visit <http://localhost:3000>

## Development
When developing components, you may want assets automatically compiled and the browser to refresh automatically. To do this, run the following task:

* `npm run dev`

## Repo structure
Sometimes it’s helpful to know what all these different files are for…

```
├─ public
│   ├─ imgs
│   │   └─ currencies
│   └─ mocks
└─ src
    ├─ assets
    ├─ components
    │   ├─ Ads
    │   ├─ Archive
    │   ├─ CalendarOfArchive
    │   ├─ CardForCryptoCurrencies
    │   ├─ CardForImportantCurrencies
    │   ├─ ContactUs
    │   ├─ CurrencyConverter
    │   ├─ Date
    │   ├─ DateRangePicker
    │   ├─ Footer
    │   ├─ Graph
    │   ├─ Home
    │   ├─ Navbar
    │   ├─ TableOfCoins
    │   └─ TableOfCurrencies
    │
    ├─ app.css       
    ├─ App.tsk        
    ├─ custom.scss  
    ├─ index.css      
    ├─ index.tsx           
    ├─ interfaces.ts     
    ├─ react-app-env.d.ts
    ├─ reportWebVitals.ts  
    ├─ Router.tsx     
    ├─ .gitignore           
    ├─ package-lock-json     
    ├─ package.json  
    └─ tsconfig.json  
```

