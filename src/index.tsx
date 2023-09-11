import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const elem = document.getElementById('root');
if (elem === null) {
  throw Error("#root element is not present");
}
const root = ReactDOM.createRoot(elem);
root.render(
  <React.StrictMode>
    <script src="https://kit.fontawesome.com/dca13773b0.js" crossOrigin="anonymous"></script>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
