import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import $ from 'jquery'; 
import { useParams } from "react-router-dom";



function Giveid(){
   let  param=useParams();
    return <Teacherprofile id={param.id}/>
}



class Teacherprofile extends React.Component 
{


constructor(props){
    super(props);
    this.state = {
        data:{},
        isloaded:0,
        rating:0,
    }
}

  async collectdata()
  {
     let   param=this.props.id;
     let token=localStorage.getItem("token");

      const userprofile=await fetch(`http://127.0.0.1:8000/matutor/userpro/${param}/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `bearer ${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          mode: 'cors',
         

      });
      if(!userprofile.ok)
      {
          if(userprofile.status === 401){
          alert("you may be unauthorised or server is down");}
          else{
          alert(userprofile.status);
          }
      }
      else
      {
            let data=userprofile.json();
            data.then((data)=>{
                console.log(data);
                this.setState({
                    data:data,
                    isloaded:1,
                })
            });
      }


  }
  handlechange(e){
      if(e.target.value>10)
      {
          alert("please select rating between 1 to 10");
      }
      else{
      this.setState({rating:e.target.value});
      }
  }
 async handlerating()
  {
     let  rating=this.state.rating;
      alert("you are rating this tutor"+rating+"points");
        const token = localStorage.getItem("token");
        const data={'userid':localStorage.getItem('userid'),'tutorid':this.props.id,'rating':this.state.rating};
       const response = await fetch("http://127.0.0.1:8000/matutor/rateuser",{
           method: "POST",
           headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `bearer ${token}`

            },
            mode: 'cors',
            body: JSON.stringify(data)
       });

       if(!response.ok)
       {
           console.log("wait");
           let  yoyo=response.json();
           yoyo.then((data) => {
               console.log(data);
               for(var key in data)
               {
                   alert(key);
               }

           });
       }
       else
       {
          let  yoyo=response.json();
           yoyo.then((data) => {
               console.log(data);
           

           });
       }



  }



   render()
   {
       
    if(this.state.isloaded===0)
    {
      this.collectdata();
    }

       return(
               <>
                   <div className='contentclass'>
                  <div className='imageclass'>
                 <img src={this.state.data.img} alt=" jacket" height="250px" width="fit-content"/>
                 </div> 
                 
                    <h2>NAME:{this.state.data.matutor}</h2>
                    <h2>qualifications:{this.state.data.aboutyou}</h2>
                    <h2>ADDRESS :{this.state.data.address} </h2>
                    <h2>PHONE: {this.state.data.contact_no}</h2>
                    <h2>CURRENT RATING: {parseInt(this.state.data.rating)}</h2>
                    <h2>RATE USER: <input type="number"  onChange={(e)=>this.handlechange(e)} min="1" max="10"/> <button onClick={()=>this.handlerating()}>SUBMIT NEW RATING</button> Refresh To see rating changes </h2>
                
                    <div>
                    <a href={this.state.data.doc}>MY DEGREES</a>
                    </div>
                    <iframe src={this.state.data.doc}  style={{width:"400px",height:"400px"}}/>
                 </div> 
               </>
       )
   }













}





export default Giveid