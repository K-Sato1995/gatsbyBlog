---
title: React Routing
description: In this post, I am going to talk about how to implement routing in your react applications with [react-router-dom](https://www.npmjs.com/package/react-router-dom).  I will explain how to implement routing as well as passing data around in your components. (I expect you to have react-development-environment on your computer as a prerequisite.)
slug: react-routing
date: 2018-11-10
language: english
cover: ./cover.png
tags: 
  - React
  - react-routing-dom
  - Tutorial
---
# Introduction
In this post, I am going to talk about how to implement `routing` in your react applications with [react-router-dom](https://www.npmjs.com/package/react-router-dom).    
I will explain how to implement routing as well as passing data around in your components. (I expect you to have react-development-environment on your computer as a prerequisite.)

![output.gif](https://qiita-image-store.s3.amazonaws.com/0/258219/99114ff7-f968-f469-2912-44a08a0d6af1.gif)

# Install react-router-dom
 You can install `react-router-dom` by running the command below.

```console
$ npm install react-router-dom
```

# Setting up the links
 First and foremost, import `Link` from `react-router-dom` and create links that are connected with designated paths.  
 For instance, if a user clicks `Home` in the code below, the user will be transferred to '/' page and if a user clicks `About`, the user will be sent to `/About` page.

```JS
import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return(
      <div>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
      </div>
    )
  }
}

export default Navbar;
```

# Setting up Router and Route
 All you gotta do to connect one page to another in your react app is connecting the paths and components using `Router` and `Route`.

__There really are only two things you should keep in your mind.__

- `Routes` must be defined in `Routers`.
- Write the path and the corresponding component in each `Route`

```JS
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar /><hr/>
            <Route exact path='/' component={Home}/>
            <Route path='/About' component={About}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
```

# Passing data with props
 You can accomplish this very easily by writing `Route` element like the code below.

```JS
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar /><hr/>
            <Route exact path='/' component={Home}/>
            <Route path='/About' render={ () => <About name={'Tom'}/> }/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
```
 You can get the data in `About` component like the code below.

```JS
import React from 'react'

class About extends React.Component {
  render(){
    return(
      <div>
        <h1>About</h1>
        <h2>I am {this.props.name}</h2>
      </div>
    )
  }
}

export default About;
```
