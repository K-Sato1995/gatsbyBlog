---
title: React Firebase Authentication 
description: Simple guideline about how to implement a simple authentication with React and Firebase.
slug: react-firebase-authentication
date: 2019-11-07
language: english
cover: ./cover.png
tags: 
  - React
  - Firebase
  - Hooks
---
# Set up Firebase


## Create a new app
First go to firebase console and create new app.

![image](https://user-images.githubusercontent.com/32632542/67456573-2d64ea80-f66c-11e9-8459-791729788236.png)


## Add auth 

Click Authentication and then click `SET UP SIGN-IN METHOD`.

![image](https://user-images.githubusercontent.com/32632542/67456662-76b53a00-f66c-11e9-8743-a4e53c281159.png)

And enable things you want to use to sign in.

![image](https://user-images.githubusercontent.com/32632542/67456757-b2e89a80-f66c-11e9-9081-ce215da139bf.png)

## Get firebase credentials
Go to your project settings and get the app's firebase credentials.

![image](https://user-images.githubusercontent.com/32632542/68387457-b36f4e00-01a1-11ea-8b9b-f932972a877d.png)

The credentials look something like below

```js
apiKey: "your_key",
authDomain: "your_app_id.firebaseapp.com",
databaseURL: "https://your_app_id.firebaseio.com",
projectId: "your_app_id",
storageBucket: "your_storage_bucket",
messagingSenderId: "sender_id",
appId: "your_app_id"
```

# Set up the front end

Create your app.

```
$ create-react-app your-app-name
$ cd your-app-name
```

Install `react-router` and `firebase` packages.

```
$ yarn add firebase react-router react-router-dom
```

## Connect the App to firebase 

Paste your firebase credentials to `.env`.

```
// .env
REACT_APP_FIREBASE_KEY="your_key"
REACT_APP_FIREBASE_DOMAIN="your_app_id.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE="https://your_app_id.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID="your_app_id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
REACT_APP_FIREBASE_SENDER_ID="sender_id"
```

Create a new file `src/base.js`. And paste the code below.
It initiates your firebase application with the given credentials.

```js
import * as firebase from "firebase/app";
import "firebase/auth";

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});
```

# Add context 

Create `src/auth/AuthProvider` and put all the authentication logic in here.
And we are going to pass the authentication data and functions through the component tree using `Context`.

```jsx
import React, { useEffect, useState } from "react";
import { app } from "../base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password, history) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (email, password, history) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

# Add Private route

Create `src/auth/PrivateRoute` and paste the code below.
The idea is that only authenticated users can access the private route.

```jsx
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";

const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : Login;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
```

# Add Routing
Open `src/App.js` paste the code below.

 ```js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
```


# Create `Home`, `Login` and `Signup` components.

Create the following compoentns.

## src/components/Home.jsx

```jsx
import React from "react";
import { app } from "../base";

function Home(props) {
  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
}

export default Home;
```

## src/auth/Login.jsx

```jsx
import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
```

# src/auth/Signup.jsx

```jsx 
import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";

const SignUp = ({ history }) => {
  const { signup } = useContext(AuthContext);

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
```



# References 
- [Firebase React Authentication Tutorial](https://maksimivanov.com/posts/firebase-react-tutorial/)
