// import React from 'react';
// import ReactDOM from 'react-dom';
// import './main.css';
// import $ from 'jquery';
// import { useParams } from "react-router-dom";

// function Giveid(){
//    let  param=useParams();
//     return <Teacherprofile id={param.id}/>
// }

// class Teacherprofile extends React.Component
// {

// constructor(props){
//     super(props);
//     this.state = {
//         data:{},
//         isloaded:0,
//         rating:0,
//     }
// }

//   async collectdata()
//   {
//      let   param=this.props.id;
//      let token=localStorage.getItem("token");

//       const userprofile=await fetch(`http://127.0.0.1:8000/matutor/userpro/${param}/`,{
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//              'Authorization': `bearer ${token}`
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           mode: 'cors',

//       });
//       if(!userprofile.ok)
//       {
//           if(userprofile.status === 401){
//           alert("you may be unauthorised or server is down");}
//           else{
//           alert(userprofile.status);
//           }
//       }
//       else
//       {
//             let data=userprofile.json();
//             data.then((data)=>{
//                 console.log(data);
//                 this.setState({
//                     data:data,
//                     isloaded:1,
//                 })
//             });
//       }

//   }
//   handlechange(e){
//       if(e.target.value>10)
//       {
//           alert("please select rating between 1 to 10");
//       }
//       else{
//       this.setState({rating:e.target.value});
//       }
//   }
//  async handlerating()
//   {
//      let  rating=this.state.rating;
//       alert("you are rating this tutor"+rating+"points");
//         const token = localStorage.getItem("token");
//         const data={'userid':localStorage.getItem('userid'),'tutorid':this.props.id,'rating':this.state.rating};
//        const response = await fetch("http://127.0.0.1:8000/matutor/rateuser",{
//            method: "POST",
//            headers: {
//               'Content-Type': 'application/json',
//               // 'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': `bearer ${token}`

//             },
//             mode: 'cors',
//             body: JSON.stringify(data)
//        });

//        if(!response.ok)
//        {
//            console.log("wait");
//            let  yoyo=response.json();
//            yoyo.then((data) => {
//                console.log(data);
//                for(var key in data)
//                {
//                    alert(key);
//                }

//            });
//        }
//        else
//        {
//           let  yoyo=response.json();
//            yoyo.then((data) => {
//                console.log(data);

//            });
//        }

//   }

//    render()
//    {

//     if(this.state.isloaded===0)
//     {
//       this.collectdata();
//     }

//        return(
//                <>
//                    <div className='contentclass'>
//                   <div className='imageclass'>
//                  <img src={this.state.data.img} alt=" jacket" height="250px" width="fit-content"/>
//                  </div>

//                     <h2>NAME:{this.state.data.matutor}</h2>
//                     <h2>qualifications:{this.state.data.aboutyou}</h2>
//                     <h2>ADDRESS :{this.state.data.address} </h2>
//                     <h2>PHONE: {this.state.data.contact_no}</h2>
//                     <h2>CURRENT RATING: {parseInt(this.state.data.rating)}</h2>
//                     <h2>RATE USER: <input type="number"  onChange={(e)=>this.handlechange(e)} min="1" max="10"/> <button onClick={()=>this.handlerating()}>SUBMIT NEW RATING</button> Refresh To see rating changes </h2>

//                     <div>
//                     <a href={this.state.data.doc}>MY DEGREES</a>
//                     </div>
//                     <iframe src={this.state.data.doc}  style={{width:"400px",height:"400px"}}/>
//                  </div>
//                </>
//        )
//    }

// }

// export default Giveid

import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import $ from "jquery";
import { useParams } from "react-router-dom";

function Giveid() {
  let param = useParams();
  return <Teacherprofile id={param.id} />;
}

// class Teacherprofile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: {},
//             isLoaded: false,
//             rating: 0,
//         }
//     }

//     async collectData() {
//         const param = this.props.id;
//         const token = localStorage.getItem("token");

//         const userProfile = await fetch(`http://127.0.0.1:8000/matutor/userpro/${param}/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             mode: 'cors',
//         });

//         if (!userProfile.ok) {
//             if (userProfile.status === 401) {
//                 this.showAlert("Unauthorized or server is down");
//             } else {
//                 this.showAlert(`Error: ${userProfile.status}`);
//             }
//         } else {
//             const data = await userProfile.json();
//             this.setState({ data, isLoaded: true });
//         }
//     }

//     showAlert(message) {
//         // Replace with a toast/modal for better UX
//         alert(message);
//     }

//     handleChange(e) {
//         const value = e.target.value;
//         if (value < 1 || value > 10) {
//             this.showAlert("Please select a rating between 1 to 10");
//         } else {
//             this.setState({ rating: value });
//         }
//     }

//     async handleRating() {
//         const { rating } = this.state;
//         const token = localStorage.getItem("token");
//         const data = {
//             'userid': localStorage.getItem('userid'),
//             'tutorid': this.props.id,
//             'rating': rating
//         };

//         const response = await fetch("http://127.0.0.1:8000/matutor/rateuser", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             mode: 'cors',
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             this.showAlert(`Error: ${JSON.stringify(errorData)}`);
//         } else {
//             this.showAlert("Rating submitted successfully!");
//             this.setState({ rating: 0 }); // Reset rating after submission
//         }
//     }

//     render() {
//         if (!this.state.isLoaded) {
//             this.collectData();
//             return <div className="loading">Loading...</div>; // Loading state
//         }

//         return (
//             <div className='teacher-profile'>
//                 <div className='image-container'>
//                     <img src={this.state.data.img} alt="Profile" className='profile-image'/>
//                 </div>
//                 <div className='profile-details'>
//                     <h2>Name: {this.state.data.matutor}</h2>
//                     <h2>Qualifications: {this.state.data.aboutyou}</h2>
//                     <h2>Address: {this.state.data.address}</h2>
//                     <h2>Phone: {this.state.data.contact_no}</h2>
//                     <h2>Current Rating: {parseInt(this.state.data.rating)}</h2>
//                     <h2>
//                         Rate User:
//                         <input
//                             type="number"
//                             value={this.state.rating}
//                             onChange={(e) => this.handleChange(e)}
//                             min="1"
//                             max="10"
//                             className='rating-input'
//                         />
//                         <button
//                             onClick={() => this.handleRating()}
//                             disabled={this.state.rating < 1 || this.state.rating > 10}
//                             className='submit-rating'
//                         >
//                             Submit New Rating
//                         </button>
//                     </h2>
//                     <div>
//                         <a href={this.state.data.doc} className='degree-link'>My Degrees</a>
//                     </div>
//                     <iframe src={this.state.data.doc} className='degree-iframe' />
//                 </div>
//             </div>
//         );
//     }
// }

class Teacherprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoaded: false,
      rating: 0,
    };
  }

  async collectData() {
    const param = this.props.id;
    const token = localStorage.getItem("token");

    const userProfile = await fetch(
      `http://127.0.0.1:8000/matutor/userpro/${param}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    );

    if (!userProfile.ok) {
      if (userProfile.status === 401) {
        this.showAlert("Unauthorized or server is down");
      } else {
        this.showAlert(`Error: ${userProfile.status}`);
      }
    } else {
      const data = await userProfile.json();
      this.setState({ data, isLoaded: true });
    }
  }

  showAlert(message) {
    // Replace with a toast/modal for better UX
    alert(message);
  }

  handleChange(e) {
    const value = e.target.value;
    if (value < 1 || value > 10) {
      this.showAlert("Please select a rating between 1 to 10");
    } else {
      this.setState({ rating: value });
    }
  }

  async handleRating() {
    const { rating } = this.state;
    const token = localStorage.getItem("token");
    const data = {
      userid: localStorage.getItem("userid"),
      tutorid: this.props.id,
      rating: rating,
    };

    const response = await fetch("http://127.0.0.1:8000/matutor/rateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      this.showAlert(`Error: ${JSON.stringify(errorData)}`);
    } else {
      this.showAlert("Rating submitted successfully!");
      this.setState({ rating: 0 }); // Reset rating after submission
    }
  }

  render() {
    if (!this.state.isLoaded) {
      this.collectData();
      return <div className="loading">Loading...</div>; // Loading state
    }

    return (
      <div className="teacher-profile">
        <div className="image-container">
          <img
            src={this.state.data.img}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <strong>Name:</strong>
              </td>
              <td>{this.state.data.matutor}</td>
            </tr>
            <tr>
              <td>
                <strong>Qualifications:</strong>
              </td>
              <td>{this.state.data.aboutyou}</td>
            </tr>
            <tr>
              <td>
                <strong>Address:</strong>
              </td>
              <td>{this.state.data.address}</td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
              </td>
              <td>{this.state.data.contact_no}</td>
            </tr>
            <tr>
              <td>
                <strong>Current Rating:</strong>
              </td>
              <td>{parseInt(this.state.data.rating)}</td>
            </tr>
            <tr>
              <td>
                <strong>Rate User:</strong>
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.rating}
                  onChange={(e) => this.handleChange(e)}
                  min="1"
                  max="10"
                  className="rating-input"
                />
                <button
                  onClick={() => this.handleRating()}
                  disabled={this.state.rating < 1 || this.state.rating > 10}
                  className="submit-rating"
                >
                  Submit New Rating
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Degrees:</strong>
              </td>
              <td>
                <a href={this.state.data.doc} className="degree-link">
                  My Degrees
                </a>
                <iframe
                  src={this.state.data.doc}
                  className="degree-iframe"
                ></iframe>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Giveid;
