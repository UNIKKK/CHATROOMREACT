import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import Form from '../Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from '../../config';
import Nav from '../Nav/Nav';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    }
  }

  componentDidMount() {

    if(firebase.auth().currentUser) {
      this.setState({ user : firebase.auth().currentUser });
    }

      firebase.auth().onAuthStateChanged(user => {
        console.log(user)
        this.setState({ user : user });
      });
  }

  handleSignIn() {
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    googleAuthProvider.addScope('https://www.googleapis.com/auth/plus.login')
    //firebase.auth().languageCode = 'fr'
    firebase.auth().signInWithPopup(googleAuthProvider)
   /* const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider); */
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <h2>
            CHATROOM QUI ME FAIT CRISER KLANEFMKDJSN?FSMKLDNF?MOSQDKLJ?FLMQSDK?FMLQSD?FMLQSD?FMLQSDK?
          </h2>

          <Nav />
          {!this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              SE CONNECTER
            </button>
          ) : (
              <button
                className="app__button"
                onClick={this.handleLogOut.bind(this)}
              >
                SE DECONNECTER
            </button>
            )}
        </div>


        {this.state.user ?
          <div className="app__list">
            <Form userName={this.state.user} />
          </div>
          :
          'Connectez-vous pour accéder à la messagerie.'}



      </div>
    );
  }
}
export default App;