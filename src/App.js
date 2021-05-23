import React from 'react';
import axios from 'axios';

class App extends React.Component{
 constructor(props){
   super(props);
   this.state = {
    searchUrl : '',
    nameLocation:'',
    showResult : false ,
   }
 }

  getexplorer= async(ev) =>{
    ev.preventDefault();
    let urlForSearch= `https://eu1.locationiq.com/v1/search.php?key=pk.091d59a25243d149bb748755251ac17c&q=${this.state.searchUrl}&format=json`;
    

    let result = await axios.get(urlForSearch);
    // console.log(result.data[0]);

    this.setState({
      nameLocation : result.data[0],
      showResult : true,
    })
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
        <img src ={`https://maps.locationiq.com/v3/staticmap?key=pk.091d59a25243d149bb748755251ac17c&center=${this.state.nameLocation.lat},${this.state.nameLocation.lon}&zoom=1-18`}/>
      }
      </div>
      </>
    )
  }
}
export default App;
