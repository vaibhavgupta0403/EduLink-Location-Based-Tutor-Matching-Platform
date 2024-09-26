
import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import $ from 'jquery'; 
import { Link ,Outlet} from "react-router-dom";

class Mapopup extends React.Component {

    render() {
        const url=this.props.obj.img==="http://127.0.0.1:8000/media/SOME%20STRING" ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png": this.props.obj.img
        return (
            <div className="mapopup">
                <img src={url} alt=" jacket" width="100" height="100"/>
                <p >Name: {this.props.obj.matutor}</p>
                <p>ADDRESS: {this.props.obj.address}</p>
                <p> ABOUT ME:{this.props.obj.aboutyou}</p>
                <p> RATING: {parseInt(this.props.obj.rating)}</p>
                <p> DISTANCE : {parseInt(this.props.obj.distance)}KM</p>
                <Link to={`/teacher/${this.props.obj.id}`}>PROFILE</Link>
            </div>
        )
    }
}

class Matutorlist extends React.Component {
    constructor(props){
        super(props);
        this.state={
          range: '110',
          data:[],
          isloaded: false,
        }
    }
 
    handlechange(e){
        this.setState({range: e.target.value,isloaded: false});
    }
    //  this funtion is making api call to fecthing list
    async matutorlist(range)  {
        const token = localStorage.getItem("token");
        const data = {
            range:range,
            subject:this.props.sub,
            x1:localStorage.getItem("latitude"),
            y1:localStorage.getItem("longitude"),
        };
        const response = await fetch('http://127.0.0.1:8000/matutor/list', {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
               // 'Content-Type': 'application/x-www-form-urlencoded',
             },
             mode: 'cors',
             body: JSON.stringify(data)
        });
        if(!response.ok) {
            alert("this user may not exits ");
            alert(response.status);
        }
        else {
            const yoyo=response.json();
            yoyo.then((data) => {
                console.log(data);
                //const obj1=JSON.parse(data)
                var ar=[];
                ar[0]=data;
                var yoyo=Array.isArray(data)===false?ar:data
                this.setState({data: yoyo,isloaded:true});
               // console.log(data[0].)
                return data;
            });
        }
    }
    //  now i need to utilize the data i got from the server 

    ok(){
    return("yoyo");
}

    render(){

       const yoyo=this.state.isloaded===false ? this.matutorlist(this.state.range):this.ok()
       //  now i have to make a list of all math teachers to render on screen 
       var data=this.state.data;
       var dodo=[20];
       var List=data.map(element=>{
   
       return(
             <li className="tutorlist">
            <Mapopup obj={element}/></li>
       );
   
       });

        return(
            <>
                <div>
                    <input type="range" min="10" max="1000"  className="slider" id="myRange" onChange={(e)=>this.handlechange(e)} /> { } <h3>value:{this.state.range}</h3>
                    <ol style={{overflow: "scroll"}} > {List} </ol> 
                </div>
            </>
        )
    }
}

export default Matutorlist
