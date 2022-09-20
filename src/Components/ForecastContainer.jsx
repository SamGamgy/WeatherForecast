import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_API } from "../constants";
import { WEATHER_URL } from "../constants";


class ForecastContainer extends React.Component {
    state= {
        data: [],
        location:[],
        // must include loading and error states and visual representations
        loading: false,
        error: false,
        unitType: 'imperial',
        zip:'23320',
    }
    // after component is rendered
    componentDidMount() {
       this.fetchData(); 
    };
    async fetchData() {
        // let loading before anything has been pulled
        this.setState({loading:true,})
        // try {this code} catch{any errors}
       try {
        const response = await fetch(`${WEATHER_URL}${WEATHER_API}&zip=${this.state.zip}`);
        console.log(response)
        if (response.ok) {
            const json=  await response.json();
            const data = json.list
                .filter(day => day.dt_txt.includes("18:00:00"))
                    .map(item => ({
                        temp: item.main.temp,
                        feelsTemp: item.main.feels_like,
                        humidity: item.main.humidity,
                        dt: item.dt,
                        date: item.dt_txt,
                        imgID: item.weather[0].id,
                        desc: item.weather[0].description,
                        wind: item.wind.speed,
                        windDir: item.wind.deg,
                        
                    }));
            const location = [json.city.name, json.city.country];
        this.setState({
            data,
            loading:false,
            error:false,
            location,
        });
        } else {
            this.setState({
                error:true,
                errorM:response.statusText,
                loading:false,
            });
        }
       } catch(err) {
        console.error('There was an error, err');
       }
    }
    updateForecastUnits = ({target:{value}}) => {
        this.setState({unitType: value})
    };
      
    handleChange = (e) => {
        this.setState({zip: e.target.value})
    }
    handleClick = () => {
        this.fetchData();
    }
    render() {
        const {data, loading, error, errorM, unitType, location} = this.state
        return(
            <div className="container mt-5">
                <h1 className="display-1 jumbotron bg-light py-5 mb-5">5-day Forecast</h1>
                <h5 className="display-5 text-muted mb-5">{location[0]}, {location[1]}</h5>
                <div>
                    <input 
                        className='mb-3 rounded p-1 text-center' 
                        style={{width: '100px'}} 
                        type="text" 
                        placeholder='Zip Code'
                        value={this.state.zip}
                        onChange={this.handleChange}
                        maxLength='5'

                    />
                    <button className="rounded p-1" onClick={this.handleClick}>Go</button>
                </div>
                <DegreeToggle updateForecastUnits={this.updateForecastUnits}/>
                <div className="row justify-content-center"> 
                    { !loading && !error ? data.map((item) => (
                        <DayCard 
                            key={item.dt}
                            data={item} 
                            unitType={unitType}
                        />)) 
                    : error ? <h3 className="text-danger mt-5">Error : {errorM} ☹️</h3> 
                    :<div className="spinner-border text-primary mt-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    }
                </div>
                
                
            </div>

        )
    }
};

export default ForecastContainer