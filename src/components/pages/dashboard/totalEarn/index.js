

import ReactApexChart from 'react-apexcharts'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Normalselect } from '../../../common'


export const TotalEarn = ({ branchCandList }) => {
    const [series, setseries] = useState(
        [
            {
                name: "Earn",
                data: []
            }
        ]
    );
    const [selectedBranch,setBranch]=useState('Perumbakam')


    // const series = [];
    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 2
        },

        yaxis:
        {
            labels: {
                style: {
                    colors: "#b2bac2"
                },
                formatter: (value) => { return `${value}  ₹` },
            },
        },

        grid: {
            row: {
                // colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: "#b2bac2"
                }
            },

        }
    };


    useEffect(() => {
        getEarnMoney()
    }, [branchCandList])

    const getEarnMoney = (value='Perumbakam') => {
        setBranch(value)
        let currentYear = moment().set({ 'month': 0 });
        let lineDate = {
            name: "Earn",
            data: []
        };
        for (let i = 0; i < 12; i++) {
            const startOfMonth = moment(currentYear).startOf('month');
            const endOfMonth = moment(currentYear).endOf('month');

            let candidateList = branchCandList?.find(({ branch }) => branch == value);
            let selectedMonthCandList = candidateList?.data?.filter(({ courseStartDate }) => moment(courseStartDate, 'YYYY-MM-DD').isBetween(startOfMonth, endOfMonth));
            let selectedMonthFeesTotal = 0
            if (Array.isArray(selectedMonthCandList)) {
                selectedMonthCandList.map(({ fees }) => {
                    selectedMonthFeesTotal = selectedMonthFeesTotal + Number(fees)
                });
                lineDate.data.push(selectedMonthFeesTotal);
                // console.log('lineDate---------->',lineDate)
            }

            setseries([...[lineDate]])
            currentYear = moment().set({ 'month': i + 1 });
        }
    }



    return (
        <div className={`card dashboard-card `} >
            <div className="card-header">


                <div className='row'>
                    <div className='col-md-9'>
                        <h5 className='card-title mb-0'>Month Wise Revenue</h5>
                    </div>
                    <div className='col-md-3'>
                        <Normalselect label='Branch' value={selectedBranch} onChange={(e)=>getEarnMoney(e?.target?.value)} options={branchCandList?.map(({branch})=>({label:branch,value:branch}))}   size="small"/>
                    </div>

                </div>
            </div>
            <div className="card-body pt-0">
                <ReactApexChart options={options} series={series} type="line" height={400} />


            </div>
        </div >
    )



}