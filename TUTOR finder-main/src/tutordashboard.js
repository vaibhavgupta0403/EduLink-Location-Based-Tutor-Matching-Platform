import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import { Link, Outlet } from "react-router-dom";

class Tutordashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      name: "",
      aboutme: "",
      address: "",
      doc: "",
      contact: "",
      sub: "",
      mathprofile: 1,
      physicsprofile: 0,
      chemistryprofile: 0,
      biologyprofile: 0,
      id: "",
      class1: "nondisplay",
      class2: "nondisplay",
      class3: "nondisplay",
      class4: "nondisplay",
      updatedaboutme: "",
      updatedcontact: "",
      updatedadd: "",
      updatedimagefile: null,
    };
  }
  f1() {
    this.setState({
      mathprofile: 1,
      physicsprofile: 0,
      chemistryprofile: 0,
      biologyprofile: 0,
    });
  }
  f2() {
    this.setState({
      mathprofile: 0,
      physicsprofile: 1,
      chemistryprofile: 0,
      biologyprofile: 0,
    });
  }
  f3() {
    this.setState({
      mathprofile: 0,
      physicsprofile: 0,
      chemistryprofile: 1,
      biologyprofile: 0,
    });
  }
  f4() {
    this.setState({
      mathprofile: 0,
      physicsprofile: 0,
      chemistryprofile: 0,
      biologyprofile: 1,
    });
  }
  async handleImageChange(e) {
    const token = localStorage.getItem("tutortoken");
    let form_data = new FormData();
    form_data.append("img", e.target.files[0], e.target.files[0].name);
    form_data.append("id", this.state.id);
    form_data.append("feild", "img");
    const response = await fetch("http://127.0.0.1:8000/matutor/imageupdate", {
      method: "PUT",
      headers: {
        // 'Content-Type':"multipart/form-data",

        Authorization: `bearer ${token}`,
      },
      mode: "cors",
      body: form_data,
    });
    if (!response.ok) {
      alert("Please wait.");
      let yoyo = response.json();
      yoyo.then((data) => {
        console.log(data);
      });
    } else {
      let yoyo = response.json();
      yoyo.then((data) => {
        console.log(data);
        this.setState({
          img: data.img,
        });
      });
    }
  }
  async handle(subject) {
    const data = { sub: subject };
    let token = localStorage.getItem("tutortoken");
    const response = await fetch("http://127.0.0.1:8000/matutor/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(data),
    });
    // response is a promise here
    if (!response.ok) {
      alert("This user does not exit. Response code:" + response.status);
      //    alert("you can google the respone code :"+response.status);
    } else {
      const yoyo = response.json();
      // yet not response is extrected properly
      yoyo.then((data) => {
        console.log(data);
        if (data.length !== 0) {
          this.setState({
            img: data[0].img,
            name: data[0].matutor,
            aboutme: data[0].aboutyou,
            address: data[0].address,
            doc: data[0].doc,
            contact: data[0].contact_no,
            mathprofile: 0,
            physicsprofile: 0,
            chemistryprofile: 0,
            biologyprofile: 0,
            sub: data[0].subject,
            id: data[0].id,
          });
        } else {
          this.setState({
            img: "",
            name: "",
            aboutme: "",
            address: "",
            doc: "",
            contact: "",
            sub: "",
            id: "",
            mathprofile: 0,
            physicsprofile: 0,
            chemistryprofile: 0,
            biologyprofile: 0,
          });
        }
      });
    }
  }
  handleupdatedvalue(e) {
    let feild = e.target.name;
    let value = e.target.value;
    this.setState({ [feild]: value });
  }
  async handleupdate(feild, value) {
    const token = localStorage.getItem("tutortoken");
    const data = { feild: feild, value: value, id: this.state.id };
    const response = await fetch("http://127.0.0.1:8000/matutor/dashboard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(data),
    });
    // response is a promise here
    if (!response.ok) {
      let yoyo = response.json();
      yoyo.then((data) => {
        if (feild === "contact_no") {
          console.log(data.contact_no);
          alert(data.contact_no[0]);
        }
        //alert(data.feild[0]);
      });
      alert("you can google the respone code :" + response.status);
    } else {
      console.log(response.status);
      let yoyo = response.json();
      yoyo.then((data) => {
        console.log(data);
        if (feild === "aboutyou") {
          this.setState({
            aboutme: data.aboutyou,
            class1: "nondisplay",
            class2: "nondisplay",
            class3: "nondisplay",
            class4: "nondisplay",
            updatedaboutme: "",
            updatedcontact: "",
            updatedadd: "",
          });
        }
        if (feild === "contact_no") {
          this.setState({
            contact: data.contact_no,
            class1: "nondisplay",
            class2: "nondisplay",
            class3: "nondisplay",
            class4: "nondisplay",
            updatedaboutme: "",
            updatedcontact: "",
            updatedadd: "",
            updatedname: "",
          });
        }
        if (feild === "name") {
          this.setState({
            name: data.first_name,
            class1: "nondisplay",
            class2: "nondisplay",
            class3: "nondisplay",
            class4: "nondisplay",
            updatedaboutme: "",
            updatedcontact: "",
            updatedadd: "",
            updatedname: "",
          });
        }
      });
    }
  }
  toggleclass(val) {
    this.setState({ [val]: "yesdisplay" });
  }
  async handlelogout() {
    var token = localStorage.getItem("tutortoken");

    const logout = await fetch("http://127.0.0.1:8000/check/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    alert("logoutsuccessfully");
    localStorage.removeItem("tutortoken");
    window.location = "/Tutorportal";
  }
  //   render() {
  //     if (this.state.mathprofile === 1) {
  //       this.handle("maths");
  //     }
  //     if (this.state.physicsprofile === 1) {
  //       this.handle("physics");
  //     }

  //     if (this.state.chemistryprofile === 1) {
  //       this.handle("chemistry");
  //     }
  //     if (this.state.biologyprofile === 1) {
  //       this.handle("biology");
  //     }
  //     return (
  //       <>
  //         <header className="headertutor">
  //           <div className="BUTLIST">
  //             <button onClick={() => this.f1()}>MATHS PROFILE</button>
  //             <button onClick={() => this.f2()}>PHYSICS PROFILE</button>
  //             <button onClick={() => this.f3()}> CHEMISTRY PROFILE</button>
  //             <button onClick={() => this.f4()}>BIOLOGY PROFILE</button>
  //           </div>
  //           <button onClick={() => this.handlelogout()}>LOGOUT</button>
  //         </header>
  //         <div className="maindashboard">
  //           {this.state.name === "" ? (
  //             <h1>
  //               YOU ARE NOT A TUTOR OF THIS DEPARTMENT IF YOU WANT TO BE PLEASE
  //               APPLY
  //               <Link to="/Tutorportal">REGISTER</Link>
  //             </h1>
  //           ) : (
  //             <>
  //               <h1>WELCOME {this.state.sub} TUTOR</h1>
  //               <div className="contentclass">
  //                 <div className="imageclass">
  //                   <img
  //                     src={this.state.img}
  //                     alt=" jacket"
  //                     height="300px"
  //                     width="300px"
  //                   />
  //                   <p style={{ background: "white", display: "flex" }}>
  //                     {" "}
  //                     UPDATE IMAGE:{" "}
  //                     <input
  //                       type="file"
  //                       name="image"
  //                       accept="image/png, image/jpeg,image/jpg"
  //                       onChange={(e) => this.handleImageChange(e)}
  //                     />
  //                   </p>
  //                 </div>

  //                 <div>
  //                   <h2>NAME :{this.state.name}</h2>
  //                   <div className={this.state.class1}>
  //                     <input
  //                       placeholder="type your updated value here"
  //                       name="updatedname"
  //                       onChange={(e) => this.handleupdatedvalue(e)}
  //                     />
  //                     <button
  //                       onClick={() =>
  //                         this.handleupdate("name", this.state.updatedname)
  //                       }
  //                     >
  //                       SUBMIT
  //                     </button>
  //                   </div>
  //                   <button
  //                     type="button"
  //                     onClick={() => this.toggleclass("class1")}
  //                   >
  //                     UPDATE
  //                   </button>
  //                 </div>

  //                 <div>
  //                   <h2>ABOUT ME :{this.state.aboutme}</h2>
  //                   <div className={this.state.class2}>
  //                     <input
  //                       placeholder="type your updated value here"
  //                       name="updatedaboutme"
  //                       onChange={(e) => this.handleupdatedvalue(e)}
  //                     />
  //                     <button
  //                       onClick={() =>
  //                         this.handleupdate("aboutyou", this.state.updatedaboutme)
  //                       }
  //                     >
  //                       SUBMIT
  //                     </button>
  //                   </div>
  //                   <button
  //                     type="button"
  //                     onClick={() => this.toggleclass("class2")}
  //                   >
  //                     UPDATE
  //                   </button>
  //                 </div>

  //                 <div>
  //                   <h2>ADDRESS :{this.state.address}</h2>
  //                   <div className={this.state.class3}>
  //                     <input
  //                       placeholder="type your updated value here"
  //                       onChange={(e) => this.handleupdates(e)}
  //                     />
  //                     <button onClick={() => this.handleupdates()}>SUBMIT</button>
  //                   </div>
  //                   <button
  //                     type="button"
  //                     onClick={() => this.toggleclass("class3")}
  //                   >
  //                     UPDATE
  //                   </button>
  //                 </div>

  //                 <div>
  //                   <h2>CONTACT-NO. :{this.state.contact}</h2>
  //                   <div className={this.state.class4}>
  //                     <input
  //                       placeholder="Type your updated value here"
  //                       name="updatedcontact"
  //                       onChange={(e) => this.handleupdatedvalue(e)}
  //                     />
  //                     <button
  //                       onClick={() =>
  //                         this.handleupdate(
  //                           "contact_no",
  //                           this.state.updatedcontact
  //                         )
  //                       }
  //                     >
  //                       SUBMIT
  //                     </button>
  //                   </div>
  //                   <button
  //                     type="button"
  //                     onClick={() => this.toggleclass("class4")}
  //                   >
  //                     UPDATE
  //                   </button>
  //                 </div>

  //                 <div>
  //                   <a href={this.state.doc}>MY DEGREES </a>
  //                   <iframe src={this.state.doc} />
  //                 </div>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       </>
  //     );
  //   }

  render() {
    if (this.state.mathprofile === 1) {
      this.handle("maths");
    }
    if (this.state.physicsprofile === 1) {
      this.handle("physics");
    }

    if (this.state.chemistryprofile === 1) {
      this.handle("chemistry");
    }
    if (this.state.biologyprofile === 1) {
      this.handle("biology");
    }
    return (
      <>
        <header className="headertutor">
          <div className="BUTLIST">
            <button onClick={() => this.f1()}>MATHS PROFILE</button>
            <button onClick={() => this.f2()}>PHYSICS PROFILE</button>
            <button onClick={() => this.f3()}> CHEMISTRY PROFILE</button>
            <button onClick={() => this.f4()}>BIOLOGY PROFILE</button>
          </div>
          <button className="logout-btn" onClick={() => this.handlelogout()}>
            LOGOUT
          </button>
        </header>
        <div className="maindashboard">
          {this.state.name === "" ? (
            <h1>
              YOU ARE NOT A TUTOR OF THIS DEPARTMENT. IF YOU WANT TO BE, PLEASE
              <Link to="/Tutorportal"> REGISTER</Link>.
            </h1>
          ) : (
            <>
              <h1>WELCOME {this.state.sub} TUTOR</h1>
              <div className="contentclass">
                <div className="imageclass">
                  <img
                    src={this.state.img}
                    alt="Tutor"
                    height="250px"
                    width="250px"
                  />

                  <p style={{ display: "flex" }}>
                    Update Image:
                    <input
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg,image/jpg"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                  </p>
                </div>

                <div className="update-section">
                  <h2>NAME : {this.state.name}</h2>
                  <div className={this.state.class1}>
                    <input
                      placeholder="Type your updated value here"
                      name="updatedname"
                      onChange={(e) => this.handleupdatedvalue(e)}
                    />
                    <button
                      onClick={() =>
                        this.handleupdate("name", this.state.updatedname)
                      }
                    >
                      SUBMIT
                    </button>
                  </div>
                  <button onClick={() => this.toggleclass("class1")}>
                    UPDATE
                  </button>
                </div>

                <div className="update-section">
                  <h2>ABOUT ME : {this.state.aboutme}</h2>
                  <div className={this.state.class2}>
                    <input
                      placeholder="Type your updated value here"
                      name="updatedaboutme"
                      onChange={(e) => this.handleupdatedvalue(e)}
                    />
                    <button
                      onClick={() =>
                        this.handleupdate("aboutyou", this.state.updatedaboutme)
                      }
                    >
                      SUBMIT
                    </button>
                  </div>
                  <button onClick={() => this.toggleclass("class2")}>
                    UPDATE
                  </button>
                </div>

                <div className="update-section">
                  <h2>ADDRESS : {this.state.address}</h2>
                  <div className={this.state.class3}>
                    <input
                      placeholder="Type your updated value here"
                      name="updatedaddress"
                      onChange={(e) => this.handleupdatedvalue(e)}
                    />
                    <button
                      onClick={() =>
                        this.handleupdate("address", this.state.updatedaddress)
                      }
                    >
                      SUBMIT
                    </button>
                  </div>
                  <button onClick={() => this.toggleclass("class3")}>
                    UPDATE
                  </button>
                </div>

                <div className="update-section">
                  <h2>CONTACT-NO. : {this.state.contact}</h2>
                  <div className={this.state.class4}>
                    <input
                      placeholder="Type your updated value here"
                      name="updatedcontact"
                      onChange={(e) => this.handleupdatedvalue(e)}
                    />
                    <button
                      onClick={() =>
                        this.handleupdate(
                          "contact_no",
                          this.state.updatedcontact
                        )
                      }
                    >
                      SUBMIT
                    </button>
                  </div>
                  <button onClick={() => this.toggleclass("class4")}>
                    UPDATE
                  </button>
                </div>

                <div className="update-section">
                  <h2>
                    <a href={this.state.doc}>DEGREE:</a>
                  </h2>
                  <iframe src={this.state.doc} width="50%" height="400px" />
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Tutordashboard;
