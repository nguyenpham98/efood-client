import React, { Fragment, useState } from "react";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; 


const Playground = (props) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedTime, handleTimeChange] = useState(new Date());
    return (
        <div>
           
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Fragment>
                <DatePicker
                    variant="inline"
                    label="Basic example"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <TimePicker
                    
                    variant="inline"
                    label="Inline mode"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </Fragment>
            <br/>
                {selectedDate.toLocaleDateString()}<br/>
                {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
        </MuiPickersUtilsProvider>
    </div>
    );
    
}

export default Playground
