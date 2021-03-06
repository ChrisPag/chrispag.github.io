import { useState } from 'react';
import Content from './Content';
import { FaFilter } from 'react-icons/fa'

const Dashboard = () => {
    /* Get and format current date, and date a given 
    number of days prior to the current date */
    const getDate = (daysPrior) =>{
        const date = new Date();
        date.setDate(date.getDate() - daysPrior)
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let day = date.getDate();
        if(day<10){
            day = '0'+day;
        }
        if(month<10){
            month = '0'+month;
        }
        let formattedDate = year + '-' + month + '-' + day;
        return (formattedDate)
    }
    
    //Get date from two days ago and today's date
    const initialStart = getDate(2);
    const initialEnd = getDate(0);

    /*Set value displayed in date input to initial start value
    and set actual start and end dates to initial values*/
    const [startValue, setStartValue] = useState(initialStart);
    const [endValue, setEndValue] = useState(initialEnd);

    const [startDate, setStartDate] = useState(initialStart);
    const [endDate, setEndDate] = useState(initialEnd);

    //Toggle open state
    const [isOpen, setIsOpen] = useState(false);

    const openForm = () =>{
        setIsOpen(!isOpen);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsOpen(false);
        setStartDate(startValue);
        setEndDate(endValue);
    }

    return (
        <div className ="dashboard">
            <button id="open" onClick ={openForm}>
                Filter by date <FaFilter id="filter" />
            </button>

            {isOpen && <form onSubmit = {handleSubmit}>
                <p>View posts:</p>
                <label>From date </label>
                <input type ="date"
                    min = "2021-12-01"
                    max = { initialEnd }
                    value = { startValue }
                    onChange={(e) => setStartValue(e.target.value)}
                    required>
                </input><br />

                <label>To date </label>
                <input type ="date"
                    min = { startValue }
                    max = { initialEnd }
                    value={ endValue }
                    onChange={(e) => setEndValue(e.target.value)}
                    required>
                </input>

                <button id="submit">Submit</button>
            </form>}

            <Content startDate = {startDate} endDate = {endDate}/>
        </div>
    );
}
  
export default Dashboard;