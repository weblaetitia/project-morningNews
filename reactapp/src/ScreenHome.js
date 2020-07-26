import React, { useState } from "react";
import "./App.css";
import { Input, Button, Alert } from "antd";
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux';


function ScreenHome(props) {

  // set redirect url
  const[redirect, setRedirect] = useState()

  // Alert box 1
  const [alertOne, setAlertOne] = useState(false)
  const [textAlertOne, setTextAlertOne] = useState()
  const [alertTwo, setAlertTwo] = useState(false)
  const [textAlertTwo, setTextAlertTwo] = useState()

  var alertStyle = {
    marginTop: '2em'
  }
  var alertTwoStyle

  if (!alertOne) {
    alertStyle = {
      ...alertStyle,
      display: 'none'
    }
  } else {
    alertStyle = {
      ...alertStyle,
      display: 'block'
    }
  }

  if (!alertTwo) {
    alertTwoStyle = { ...alertStyle, display: 'none'}
  } else {
    alertTwoStyle = { ...alertStyle, display: 'block'}
  }
  

  // sign up function
  const[signUpName, setSignUpName] = useState()
  const[signUpEmail, setSignUpEmail] = useState()
  const[signUpPassword, setSignUpPassword] = useState()

  var handleSubmitSignUp = async () => {
    var rawResponse = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'name=' + signUpName + '&email='+ signUpEmail + '&password=' + signUpPassword
    })
    var response = await rawResponse.json()
        
    if (response.succes) {
      // enregistrer resonse.token dans le store
      props.addToToken(response.token)
      // et redirige
      setRedirect('/sources')

    } else {
      setAlertTwo(true)
      setTextAlertTwo(response.alert)
    }
  }
  
  // sign-in function
  const[userEmail, setUserEmail] = useState()
  const[userPassword, setUserPassword] = useState()

  var handleSubmitSignIn = async () => {
    var rawResponse = await fetch(`/sign-in/${userEmail}/${userPassword}`)
    var response = await rawResponse.json()
    if (response.succes) {
      // enregistrer resonse.token dans le store
      props.addToToken(response.token)
      // then redirect
      setRedirect('/sources')
    } else {
      setAlertOne(true)
      setTextAlertOne(response.alert)
    }
  }

  return (
    <div className="Login-page">
      <Redirect to={redirect} />
      
      {/* SIGN-IN */}

      <div className="Sign">
        <Input 
        className="Login-input" 
        placeholder="arthur@lacapsule.com" 
        onChange={ (e) => setUserEmail(e.target.value)}
        value={userEmail}
        />
        <Input.Password 
        className="Login-input" 
        placeholder="password" 
        onChange={ (e) => setUserPassword(e.target.value)}
        value={userPassword}
        />
        <Button style={{ width: "80px" }} type="primary" 
        onClick={ () => handleSubmitSignIn() }>
          Sign-in
        </Button>
        <Alert message={textAlertOne} type="error" 
        style={alertStyle} />
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
      <Input 
        className="Login-input" 
        placeholder="arthur93" 
        onChange={ (e) => setSignUpName(e.target.value)}
        value={signUpName}
        />
        <Input 
        className="Login-input" 
        placeholder="arthur@lacapsule.com" 
        onChange={ (e) => setSignUpEmail(e.target.value)}
        value={signUpEmail}
        />
        <Input.Password 
        className="Login-input" 
        placeholder="password" 
        onChange={ (e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
        />
        <Button style={{ width: "80px" }} type="primary" onClick={ () => handleSubmitSignUp()}>
          Sign-in
        </Button>
        <Alert message={textAlertTwo} type="error" 
        style={alertTwoStyle} />
      </div>
    </div>
  );
}




/* REDUX  */


// add token number to token
function mapDispatchToProps(dispatch) {
  return {
    addToToken: function(token) { 
        dispatch( {type: 'addToken', userToken: token} ) 
    }
  }
}
/* REDUX  */


export default connect(
  null, 
  mapDispatchToProps
)(ScreenHome);


