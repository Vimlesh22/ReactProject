import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login.js';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      userName :'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />

           <TextField
             hintText="Enter UserName"
             floatingLabelText="User Name"
             onChange = {(event,newValue) => this.setState({userName:newValue})}
             />
           <br/>

           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event){
      var apiBaseUrl = "http://localhost:3030/api/";
      var self = this
      if(this.state.email.length>0 && this.state.password.length>0 && this.state.userName.length>0){
        var payload={
        "userName": this.state.userName,
        "email":this.state.email,
        "password":this.state.password,
        }
        axios.post(apiBaseUrl+'/signup', payload)
       .then(function (response) {
         console.log(response);
         if(response.data.code === 200){
           var loginscreen=[];
           loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}/>);
           var loginmessage = "Not Registered yet.Go to registration";
           self.props.parentContext.setState({loginscreen:loginscreen,
           loginmessage:loginmessage,
           buttonLabel:"Register",
           isLogin:true
            });
         }
         else{
           console.log("some error ocurred",response.data.code);
         }
       })
       .catch(function (error) {
         console.log(error);
       });
      }
      else{
        alert("Input field value is missing");
      }
    }

}
const style = {
  margin: 15,
};
export default Register;
