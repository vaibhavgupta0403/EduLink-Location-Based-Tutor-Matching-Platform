import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import $ from 'jquery'; 
import { useParams } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import mapboxgl from 'mapbox-gl';
import  { useState, useRef, useCallback } from 'react'
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { Link ,Outlet} from "react-router-dom";
const MAPBOX_TOKEN  = 'pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA'



   
   
   
   const Mappopup = (props) => {
   
       const [viewport, setViewport] = useState({
         latitude: 26.9124,
         longitude:75.7873,
         zoom: 8
       });
   
       const mapRef = useRef();
       const handleViewportChange = useCallback(
         (newViewport) => setViewport(newViewport),
         []
     
       
       );
       
       
     
       // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
       const handleGeocoderViewportChange = useCallback(
         (newViewport) => {
           const geocoderDefaultOverrides = { transitionDuration: 1000 };
     
           return handleViewportChange({
             ...newViewport,
             ...geocoderDefaultOverrides
           });
         },
     
         [handleViewportChange]
       );
     
       return (
         
         <>
          <button type="button" style={{display: 'flex'}} onClick={() => props.onclick(viewport)} >SUBMIT TO FINALIZE LOCATION</button>
         <div style={{ height: "100vh" }}>
   
           <MapGL
             ref={mapRef} 
             {...viewport}
             width="60%"
             height="70vh"
           
             mapStyle="mapbox://styles/codelover4655/ckyykqauo000j14qo4cpkinbu"
             onViewportChange={handleViewportChange}
             mapboxApiAccessToken={MAPBOX_TOKEN}
           >
             <Geocoder
               mapRef={mapRef}
               onViewportChange={handleGeocoderViewportChange}
               mapboxApiAccessToken={MAPBOX_TOKEN}
               position="top-left"
             />
           </MapGL>
         
         
        
         </div>
         </>
       
     
       );
     };









class TutorLoginform extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
        }
    }
    f1(e){
        this.setState({username:e.target.value});
    }

    f2(e)
    {
        this.setState({password:e.target.value});
    }
   
    async handle(){
        const data={username: this.state.username,password: this.state.password};
       const response = await fetch("http://127.0.0.1:8000/matutor/login",{
           method: "POST",
           headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            body: JSON.stringify(data)
       });
       // response is a promise here 
       if(!response.ok)
       {
        const yoyo=response.json();
        yoyo.then((data) => {

            console.log(data['non_field_errors'][0]);
           //localStorage.setItem('tutortoken',data.Token);
           alert(data['non_field_errors'][0]);
      
          });
        
           alert("you can google the respone code :"+response.status);
       }
       else
       {
          const yoyo=response.json();
          // yet not response is extrected properly
          yoyo.then((data) => {

              console.log(data);
             localStorage.setItem('tutortoken',data.Token);
             window.location="/tutordashboard";
        
            });
      
       }
      
      
        }
   
  render() {
        return (
            <div className="contentloginform">
            <form style={{display:"grid", margin:"100px",border: "5px solid grey"}}>
            <div className="us1">
              <h2> USERNAME: <input type="text" onChange={(e) => this.f1(e)}  placeholder="username"/> </h2></div>
               <div className="us2"> <h2> PASSWORD:  <input type="password" onChange={(e) => this.f2(e)}placeholder="password" /> </h2></div>
               <div className="us3"> <button type="button" onClick={() => this.handle()} >SUBMIT </button></div>
            </form>
            </div>
        )
    }
}

class Tutorregisterform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            first_name:'',
            email:'',
            contact_no:'',
            aboutyou:'',
            img:null,
            doc:null,
            subject:'maths',
            latitude:'',
            longitude:'',
            address:'',
            istutor:'no',

        }
    }
    handlechange(e){
       let  feild=e.target.name;
       let  value=e.target.value;
        this.setState({
            [feild]:value,
        });
    }
    handleImageChange(e)
    {
       this.setState({
           img: e.target.files[0]
       });
    }
    handledocChange(e)
    {
       this.setState({
           doc: e.target.files[0]
       });
    }
   async fetchlocation(latitude,longitude)
    {
        let add= await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA
        `);
        if(!add.ok)
        {
            alert("pleas select some location and click submit button ");
            alert(add.status);
        }
        else
        {
         
       const yoyo=add.json();
    yoyo.then((data) => {
           alert("your location is stored as"+data.features[0].place_name  )
      this.setState({address:data.features[0].place_name});
 
      });
        }

    }
    handlelocation(view){
        this.fetchlocation(view.latitude,view.longitude);
        this.setState({
            latitude:view.latitude,
            longitude:view.longitude,
        });
    }
     async handlesubmit(e){
   e.preventDefault();
        let form_data = new FormData();
        form_data.append('img', this.state.img,this.state.img.name);
        form_data.append('username', this.state.username);
        form_data.append('password',this.state.password);
        form_data.append('first_name',this.state.first_name);
        form_data.append('email',this.state.email);
        form_data.append('contact_no',this.state.contact_no);
        form_data.append('aboutyou',this.state.aboutyou);
        form_data.append('doc',this.state.doc,this.state.doc.name);
        form_data.append('subject',this.state.subject);
        form_data.append('lati',this.state.latitude);
        form_data.append('longi',this.state.longitude);
        form_data.append('address',this.state.address);
        form_data.append('istutor',this.state.istutor);
        const response = await fetch("http://127.0.0.1:8000/matutor/register",{
            method: "POST",
            headers: {
               // 'Content-Type':"multipart/form-data",

             },
             mode: 'cors',
             body: form_data
               
        });
        if(!response.ok)
        {
            alert("ruko jra sbr karo");
            if(response.status==409)
            {
                alert("you  already registered as  tutor of this subject ");
            }
            let yoyo=response.json();
            yoyo.then((data) => {
                console.log(data);
                for (const key in data) {

                    console.log(` ${data[key]}`);
                    alert(data[key]);
                }
            })

        }
        else
        {
            let yoyo=response.json();
            yoyo.then((data) => {
                console.log(data);
                localStorage.setItem('tutortoken',data.Token);
                window.location="/tutordashboard";
           
                
               
            })
        }
   





    }

    render() {
        return (
            <>
            <div className='contentclass'>
                <form  onSubmit={(e)=> this.handlesubmit(e)}>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>ARE YOU ALREADY REGISTER AS ANY TUTOR HERE : <select name="istutor" onChange={(e)=>this.handlechange(e)}  >
                  <option value="no">NO</option>
                  <option value="yes">YES</option>
                </select><br></br>
                </h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>First name: <input type="text"  style={{margin:"8px"}} name="first_name" placeholder="firstname"  required onChange={(e)=>this.handlechange(e)}/><br></br>
                </h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>username:
                <input type="text" placeholder="username" name="username" style={{margin:"8px"}} required onChange={(e)=>this.handlechange(e)}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>password:
                <input type="password" placeholder="password"  required  name="password" onChange={(e)=>this.handlechange(e)} style={{margin:"8px"}} /><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>email:
                <input type="email" placeholder="email" name="email" style={{margin:"8px"}}   required onChange={(e)=>this.handlechange(e)}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>contact_no:
                <input type="tel" placeholder="contact_no"  required name="contact_no" onChange={(e)=>this.handlechange(e)}style={{margin:"8px"}}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>aboutyou:
                <input type="text" placeholder="aboutyou"  required name="aboutyou" onChange={(e)=>this.handlechange(e)} style={{margin:"8px"}}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>IMAGE
                <input type="file" name="image" style={{margin:"8px"}}
                   accept="image/png, image/jpeg,image/jpg"   required onChange={(e)=>this.handleImageChange(e)}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>SUBJECT : 
                <select name="subject" onChange={(e)=>this.handlechange(e)}  >
                  <option value="maths">MATHS</option>
                  <option value="physics">PHYSICS</option>
                  <option value="chemistry">CHEMISTRY</option>
                  <option value="biology">BIOLOGY</option>
                </select>
                </h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>DEGREES
                <input type="file" name="doc" style={{margin:"8px"}}  required
            accept="application/pdf,application/vnd.ms-excel"  placeholder="place one singal pdf file"  onChange={(e)=>this. handledocChange(e)}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>SELECT YOUR LOCATION FROM MAP</h2>
                <div className='mapstyle'>
                <Mappopup onclick={(view)=>this.handlelocation(view)}/>
                </div>
                </div>
                <input type="submit"/>
                </form>
            </div>
            </>
            
        )
    }

}



class TutorLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            islogin:1,
        }
    }
    f1(){
        this.setState({
            islogin:1,
        })
    }
    f2(){
        this.setState({
            islogin:0,
        })
    }

    render()
    {
      let obj
        if(this.state.islogin===1)
        { 
            obj=<TutorLoginform/>
        }
        else
        {
            obj=<Tutorregisterform />
        }



        return (
            <div class="POPUPTUTOR">
                <div className="BUTLIST">
                    <button  onClick={()=>this.f1()}>LOGIN TUTOR</button>
                    <button onClick={()=>this.f2()}> REGISTER TUTOR</button>
                    <div className="butoontutor">
                    <Link
            style={{ display: "block-inline", margin: "auto",border: "1px solid blue",color: "black",background: "grey"}}
            to="/" >
          SHIFT TO USER PORTAL
          </Link>
                </div>
            {obj}



            </div>
            </div>
        )




    }





}


export default TutorLogin