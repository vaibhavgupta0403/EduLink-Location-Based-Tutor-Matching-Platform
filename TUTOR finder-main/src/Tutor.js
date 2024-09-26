import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import $ from 'jquery'; 
import { Link ,Outlet} from "react-router-dom";
import Matutorlist from './mathteacher'

const API_BASE_URL="http://127.0.0.1:8080/check/login/";

  // i want to move this maincontent to diffrent page
class Maincontent extends React.Component {
    render(){
        return(
            <div>
              <h1>FINALLY AT THIS STEP</h1>
              <div className="tutormain">
                <h3>math tutors</h3>
                <h3>range</h3>
                <Matutorlist sub='maths' className="tutorlist" />
              </div>
              <div className="tutormain">
                <h3>physics tutors</h3>
                <h3>range</h3>
                <Matutorlist sub='physics' className="tutorlist" />
              </div>
              <div className="tutormain">
                <h3>chemistry tutors</h3>
                <h3>range</h3>
                <Matutorlist sub='chemistry'  />
              </div>
              <div className="tutormain">
                <h3>biolgy tutors</h3>
                <h3>range</h3>
                <Matutorlist sub='biology' className="tutorlist" />
              </div>
            </div>
        )
    }
}

class Homepage extends React.Component
{   
    async handlelogout(){
      var token=localStorage.getItem('token');
    
      const logout=await fetch('http://127.0.0.1:8000/check/logout/',{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
               'Authorization': `bearer ${token}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },

      });
      alert('logoutsuccessfully');
      localStorage.removeItem('token');
      localStorage.removeItem('userid');

      window.location = "/";
  }
    render(){
        if(localStorage.getItem('token')==null){
            window.location="/";
        }
        return(
            <div className="maindiv">
              <header>
                <div className="navbar">
                <button onClick={()=> this.handlelogout()}  className="butstyle" >LOGOUT</button>
                <Link to="/Mappage">change location </Link>
                </div>
             </header>
             <h3>you are searching tutors in {localStorage.getItem('add')}</h3>
             <Maincontent  />
            </div>
        )
    }
}

export default Homepage
