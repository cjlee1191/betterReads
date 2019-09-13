import React, { Component } from 'react';
import '../stylesheets/App.css';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup'
import BookList from './BookList';
import BookInfo from './BookInfo';
import BookAdd from './BookAdd';
import BookEdit from './BookEdit';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Main />
        </div>
      </Router>
    );
  }
}

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/books/new">Add Book</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/books">Books</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/signup">Signup</NavLink></li>

      {
        localStorage.getItem("jwt") ?
          <li className="nav-item"><NavLink exact className="nav-link" to="/logout">Log Out</NavLink></li>
        :
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/login">Log In</NavLink></li>
      }
    </ul>
  </nav>
);
const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/books" component={BookList} />
    <Route exact path="/books/new" component={BookAdd} />
    <Route exact path="/books/:id" component={BookInfo} />
    <Route exact path="/books/:id/edit" component={BookEdit} />
  </Switch>
);

export default App;