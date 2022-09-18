import React from "react";

const DegreeToggle = ({ updateForecastUnits }) => {

    return (
        <div className="mt-5">
            <div className="form-check form-check-inline">
                <input 
                    type="radio" 
                    className="form-check-input"
                    name='degree-type'
                    id="metric"
                    value="metric"
                    onChange={updateForecastUnits}
                />
                <label htmlFor="metric">Metric</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    type="radio" 
                    className="form-check-input"
                    name='degree-type'
                    id="imperial"
                    value="imperial"
                    onChange={updateForecastUnits}
                    defaultChecked
                />
                <label htmlFor="imperial">Imperial</label>
            </div>
        </div>
    )
}

export default DegreeToggle