import React from "react";
import moment from 'moment';

const DayCard = ({ data, unitType }) => {
    const {dt, temp, imgID, desc, wind, windDir, humidity, feelsTemp} = data;

    const newDate = new Date();
    newDate.setTime(dt*1000);

    const icon = `owf owf-${imgID} owf-5x`;

    const fahrenheit = Math.round(temp);
    const celsius = Math.round((fahrenheit - 32) * ( 5 / 9 ));

    const feelsFahrenheit = Math.round(feelsTemp);
    const feelsCelsius = Math.round((fahrenheit - 32) * ( 5 / 9 ));

    const mph = Math.round(wind);
    const kph = Math.round(mph * 1.609344);

    function computeCompDir(degrees) {
        let val=Math.round((degrees/22.5));
        let arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
        return arr[(val % 16)];
    }


    
    return (
        <div className="col-sm-2 mt-5">
            <div className="card py-3">
                <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <i className={icon} />
                <p className="card-text text-capitalize">{desc}</p>
                <h2>{unitType === "metric" ? `${celsius} °C` : `${fahrenheit} °F`} </h2>
                <h6> Feels Like <br/>{unitType === "metric" ? `${feelsCelsius} °C` : `${feelsFahrenheit} °F`} </h6>
                <div className="card-body">
                    <p className="card-text">Humidity: {humidity} %</p>
                    <i className='d-block display-4' style={{transform:`rotate(${windDir}deg)`}}>🠝</i>
                    <p className="card-text">{computeCompDir(windDir)} {unitType === 'imperial' ? `${mph} mph` : `${kph} kph`} </p>
                </div>
            </div>
        </div>
    )
}

export default DayCard