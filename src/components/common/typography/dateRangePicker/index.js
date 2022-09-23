
import { useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import './dateRangePicker.scss'
export const CustomDateRangePicker = ({ onChange }) => {
    const [state, setState] = useState({
        start: moment('01/01/2020','DD/MM/YYYY'),
        end: moment(),
    });
    const { start, end } = state;
    const handleCallback = (start, end) => {
        onChange({ start, end })
        setState({ start, end });
    };
    const handleApply = (e) => {
        console.log(e)
        // onChange({ start, end })
    }


    const label = start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');

    const dataCOnfig = {
        startDate: start.toDate(),
        endDate: end.toDate(),
        ranges: {
            Today: [moment().toDate(), moment().toDate()],
            Yesterday: [
                moment().subtract(1, 'days').toDate(),
                moment().subtract(1, 'days').toDate(),
            ],
            'Last 7 Days': [
                moment().subtract(6, 'days').toDate(),
                moment().toDate(),
            ],
            'Last 30 Days': [
                moment().subtract(29, 'days').toDate(),
                moment().toDate(),
            ],
            'This Month': [
                moment().startOf('month').toDate(),
                moment().endOf('month').toDate(),
            ],
            'Last Month': [
                moment().subtract(1, 'month').startOf('month').toDate(),
                moment().subtract(1, 'month').endOf('month').toDate(),
            ],
            'Over All': [
                moment('01/01/2020','DD/MM/YYYY').startOf('month').toDate(),
                moment().endOf('month').toDate(),
            ],

        },
    }
    return (
        <DateRangePicker
            initialSettings={dataCOnfig}
            onCallback={handleCallback}
            onApply={handleApply}
        >
            <div
                id="reportrange"
                className="custom-dateRange"

            >
                <i className="fa fa-calendar"></i>&nbsp;
                <span> {label} </span>  <i className="fa fa-caret-down"></i>
            </div>
        </DateRangePicker>

    )


}