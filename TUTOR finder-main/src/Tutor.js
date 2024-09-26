// import React from "react";
// import "./main.css";
// import { Link } from "react-router-dom";
// import Matutorlist from "./mathteacher";

// class Maincontent extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="tutormain">
//           <h1>Math Tutors</h1>
//           <Matutorlist sub="maths" className="tutorlist" />
//         </div>
//         <div className="tutormain">
//           <h3>Physics Tutors</h3>
//           <Matutorlist sub="physics" className="tutorlist" />
//         </div>
//         <div className="tutormain">
//           <h3>Chemistry Tutors</h3>
//           <Matutorlist sub="chemistry" />
//         </div>
//         <div className="tutormain">
//           <h3>Biology Tutors</h3>
//           <Matutorlist sub="biology" className="tutorlist" />
//         </div>
//       </div>
//     );
//   }
// }

// class Homepage extends React.Component {
//   async handleLogout() {
//     var token = localStorage.getItem("token");
//     await fetch("http://127.0.0.1:8000/check/logout/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `bearer ${token}`,
//       },
//     });
//     alert("Logout successfully");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userid");
//     window.location = "/";
//   }

//   render() {
//     if (localStorage.getItem("token") == null) {
//       window.location = "/";
//     }

//     return (
//       <div className="maindiv">
//         <header>
//           <div className="navbar">
//             <button onClick={() => this.handleLogout()} className="butstyle">
//               LOGOUT
//             </button>
//             <button>
//               {" "}
//               <Link to="/Mappage">Change Location</Link>
//             </button>
//           </div>
//         </header>
//         <h3>You are searching tutors in {localStorage.getItem("add")}</h3>
//         <Maincontent />
//       </div>
//     );
//   }
// }

// export default Homepage;

import React from "react";
import "./main.css";
import { Link } from "react-router-dom";
import Matutorlist from "./mathteacher";

class Maincontent extends React.Component {
  render() {
    return (
      <div>
        <div className="tutormain">
          <h1>Math Tutors</h1>
          <Matutorlist sub="maths" className="tutorlist" />
        </div>
        <div className="tutormain">
          <h3>Physics Tutors</h3>
          <Matutorlist sub="physics" className="tutorlist" />
        </div>
        <div className="tutormain">
          <h3>Chemistry Tutors</h3>
          <Matutorlist sub="chemistry" className="tutorlist" />
        </div>
        <div className="tutormain">
          <h3>Biology Tutors</h3>
          <Matutorlist sub="biology" className="tutorlist" />
        </div>
      </div>
    );
  }
}

class Homepage extends React.Component {
  async handleLogout() {
    var token = localStorage.getItem("token");
    await fetch("http://127.0.0.1:8000/check/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    alert("Logout successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    window.location = "/";
  }

  render() {
    if (localStorage.getItem("token") == null) {
      window.location = "/";
    }

    return (
      <div className="maindiv">
        <header>
          <div className="navbar">
            <button onClick={() => this.handleLogout()} className="butstyle">
              LOGOUT
            </button>
            <button>
              <Link to="/Mappage">Change Location</Link>
            </button>
          </div>
        </header>
        <h4>
          You are searching for tutors in "{localStorage.getItem("add")}".
        </h4>
        <Maincontent />
      </div>
    );
  }
}

export default Homepage;
