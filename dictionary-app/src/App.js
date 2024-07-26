import logo from "./logo.png";
import  "./App.css";
import Dictionary from "./Dictionary";

export default function App() {
  return (
    <div className="container">
    <div className="App">
      <header className="App-header">
       <img src={logo}
       className="App-logo img-fluid"
       alt="logo"  />
     
      </header>
      <main> 
        <Dictionary />
      </main>
      <footer className="App-footer">
      <small> Coded by Zama Andile Dlamini
      </small>
     </footer>
    </div>
    </div>
  );
}

 
