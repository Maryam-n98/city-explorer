import React from 'react';
import axios from 'axios';
import Weather from './comp/Weather'

class App extends React.Component{
 constructor(props){
   super(props);
   this.state = {
    searchUrl : '',
    nameLocation:'',
    showResult : false ,
    errorMessage:false ,
    weatherResult:false ,
    weatherInfo:{},
   }
 }

  getexplorer= async(ev) =>{
    ev.preventDefault();
    let urlForSearch= `https://eu1.locationiq.com/v1/search.php?key=pk.8917af52731848f6b221fa3294f98d21&q=${this.state.searchUrl}&format=json`;

      let serverWeather= process.env.REACT_APP_SERVER;

      let weatherUrl=`${serverWeather}/weather?cityname=${this.state.searchUrl}`
   try {

     let result = await axios.get(urlForSearch);
     let weatherData = await axios.get(weatherUrl)
     console.log(result.data[0]);
     
     this.setState({
       nameLocation : result.data[0],
       showResult : true,
       weatherResult:true ,
       weatherInfo:weatherData.data,

       
      })
      console.log(this.state.nameLocation);
      console.log(this.state.weatherInfo);
    } 
    catch {
      this.setState({
        showResult:false,
        errorMessage:true,
        weatherResult:false ,

      })
    }
  }
  changeSearchUrl =(event)=>{
    this.setState({
      searchUrl: event.target.value,
      
    })
    
    console.log(this.state.searchUrl);
  }

  render(){
    return(
      <>
      <h1> City Explorer</h1>
      
      <form onSubmit={this.getexplorer}>
        <input type='text' placeholder='type a city' onChange= {this.changeSearchUrl}/>
         <input type='submit' value='Explore'/>
      </form>
      <div>
      {this.state.showResult
         &&<p>
         Name: {this.state.nameLocation.display_name}
        </p>}
        {this.state.showResult
         && <p>
        latitude:{this.state.nameLocation.lat}
        </p>} 
        {this.state.showResult
         && <p>
        longitude: {this.state.nameLocation.lon}
        </p>}
        {this.state.showResult
         &&
        <img src ={`https://maps.locationiq.com/v3/staticmap?key=pk.8917af52731848f6b221fa3294f98d21&center=${this.state.nameLocation.lat},${this.state.nameLocation.lon}&zoom=1-18`}/>
      }
          {this.state.errorMessage &&
        <p>  "error": "Unable to geocode" </p>
      } 
      </div>
      {
      this.state.weatherResult && 
         <Weather nameOfCity={this.state.searchUrl}
          weatherInfo={this.state.weatherInfo} />
        
      }
      </>
    )
  }
}
export default App;
