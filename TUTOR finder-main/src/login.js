import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import GoogleLogin from "react-google-login";

class GoogleSocialAuth extends React.Component {
  async takeid(token) {
    const data = { token: token };
    const response = await fetch("http://127.0.0.1:8000/check/giveid/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "cors",
      body: JSON.stringify(data),
    });
    // response is a promise here
    if (!response.ok) {
      alert("This user does not exit. Response code:" + response.status);
      // alert("you can google the respone code :" + response.status);
    } else {
      const yoyo = response.json();
      // yet not response is extrected properly
      yoyo.then((data) => {
        console.log(data);
        localStorage.setItem("userid", data.id);
        window.location = "/Mappage";
      });
    }
  }

  async handlelogin(accessToken, tokenId) {
    const data = { access_token: accessToken, id_token: tokenId };
    const response = await fetch(
      "http://127.0.0.1:8000/check/social-login/google/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: "cors",
        body: JSON.stringify(data),
      }
    );
    // response is a promise here
    if (!response.ok) {
      alert("This user does not exit. Response code:" + response.status);
    } else {
      const yoyo = response.json();
      // yet not response is extrected properly
      yoyo.then((data) => {
        console.log(data);
        localStorage.setItem("token", data.key);
        this.takeid(data.key);
        //localStorage.setItem('userid',data.id);
        // window.location = "/Mappage";
      });
    }
  }

  render() {
    const googleResponse = (response) => {
      console.log(response);
      console.log(response.accessToken);
      console.log(response.tokenId);
      this.handlelogin(response.accessToken, response.tokenId);
    };
    return (
      <div className="App">
        <h3>LOGIN WITH GOOGLE</h3>

        <GoogleLogin
          clientId="1069247781281-4ies7pb49nckgplk1okavrm8krm2a547.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
      </div>
    );
  }
}

class LOGIN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  f1(e) {
    this.setState({ username: e.target.value });
  }
  f2(e) {
    this.setState({ password: e.target.value });
  }

  async handle() {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const response = await fetch("http://127.0.0.1:8000/check/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "cors",
      body: JSON.stringify(data),
    });
    // response is a promise here
    if (!response.ok) {
      alert("This user does not exit. Response code:" + response.status);
    } else {
      const yoyo = response.json();
      // yet not response is extrected properly
      yoyo.then((data) => {
        console.log(data);
        localStorage.setItem("token", data.Token);
        localStorage.setItem("userid", data.id);
        window.location = "/Mappage";
      });
    }
  }

  render() {
    return (
      <>
        <h1>EduLink</h1>
        <div className="login">
          <h3>Login</h3>
          <div className="card">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  onChange={(e) => this.f1(e)}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  onChange={(e) => this.f2(e)}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <button type="button" onClick={() => this.handle()}>
                  Submit
                </button>
              </div>
            </form>
            <GoogleSocialAuth />
            <div className="link">
              <Link to="/Tutorportal">
                <Button className="custom-gray-button">
                  Shift to Tutor Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LOGIN;
