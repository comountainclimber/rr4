import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch
} from 'react-router-dom';

import './App.css'

const isActiveFunc = match => match

const Home = () =>
  <h1> Welcome home </h1>


// regular expression to validate url and render accordingly
const MoreUrlParams = () =>
    <Route path="/:a(\d{2}):b(\.[a-z]+)" render={({match}) => (
      match &&
      <div>
        <p> (play around with the url to declaratively render) </p>
        <h1>
          PARAM A: {match.params.a || 'PAGE'} <br />
          PARAM B: {match.params.b || 'NO SUB PAGE'}
        </h1>
      </div>
    )} />

/* There are at least 3 different ways to display which
link is "active". activeClassName prop is probably the
most simple */


// in RR4 a route without a known path will always render
const Links = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/"> HOME </NavLink>
    <NavLink activeClassName="active" to={{pathname: '/about'}}> ABOUT </NavLink>
    <NavLink activeClassName="active" to={{pathname: '/page/foo'}}> PAGE </NavLink>
    <NavLink activeClassName="active" to={{pathname: '/query', search: 'id=666'}}> QUERY </NavLink>
    <NavLink activeClassName="active" to={{pathname: '/66.html'}}> REGEX FUN </NavLink>
    <NavLink
      isActive={isActiveFunc}
      activeClassName="active"
      replace to={{pathname: '/contact'}}
    > 
      CONTACT
    </NavLink>
    <Link to="/weird"> UNKNOWN </Link>
  </nav>
)
 
const App = () => 
  <Router>
    <div className="app">
      <Links />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" render={(match) => match && <h1> about </h1>} />
        <Route path="/contact" render={(match) => match && <h1> contact </h1>} />
        <Route path="/query" render={({match, location}) => (
            match &&
            <div>
              <p> {JSON.stringify(match)} </p>
              <p> {JSON.stringify(location)} </p>
              <h3> {new URLSearchParams(location.search).get('id')} </h3>
            </div>
          )}
        />
        <Route path="/page/:subpage?" render={({match}) => (
            match &&
            <div>
              <p> (play around with the url to declaratively render) </p>
              <h1>
                SUBPAGE: {match.params.subpage || 'NO SUB PAGE'}
              </h1>
            </div>
          )}
        />
        <Route path="/:a(\d{2}):b(\.[a-z]+)" render={({match}) => (
            match &&
            <div>
              <p> (only paths that match the configured regular expression will work :D)
                <pre> 
                  /:a(\d{2}):b(\.[a-z]+)
                </pre> 
              </p>
              <h1>
                PARAM A: {match.params.a || 'PAGE'} <br />
                PARAM B: {match.params.b || 'NO SUB PAGE'}
              </h1>
            </div>
          )}
        />
        <Route render={() => <h1> 404 page not found :( </h1>} />
      </Switch>
    </div>
  </Router>

export default App;