

import ReactApexChart from 'react-apexcharts'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Normalselect } from '../../../common'


export const TotalEnroll = ({ branchCandList, isCandidateCount = false }) => {
    const [series, setseries] = useState(
        [
            {
                name: "Enrol",
                data: []
            },
            {
                name: "Completed",
                data: [50, 100, 500, 600]
            }
        ]
    );
    const [selectedBranch, setBranch] = useState('Perumbakam')
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // const series = [];
    const options = {
        chart: {
            height: 350,
            type: 'bar',
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
                // formatter: (value) => { return `${value}  ₹` },
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
        // console.log('branchCandList------------->',JSON.stringify(branchCandList))

        getEarnMoney()
    }, [branchCandList])

    const getEarnMoney = (value = 'Perumbakam', sYear = new Date().getFullYear()) => {
        try {
            console.log('--------', sYear)
            setBranch(value);
            setSelectedYear(sYear);
            let currentYear = moment().set({ 'month': 0, year: sYear });

            let lineDate = {
                name: "Enrol",
                data: []
            };
            let completedCount = {
                name: "Completed",
                data: []
            }
            for (let i = 0; i < 12; i++) {
                const startOfMonth = moment(currentYear).startOf('month');
                const endOfMonth = moment(currentYear).endOf('month');

                let candidateList = branchCandList?.find(({ branch }) => branch == value);
                let selectedMonthCandList = candidateList?.data?.filter(({ joinDate }) => moment(joinDate, 'YYYY-MM-DD').isBetween(startOfMonth, endOfMonth));
                let selectedMonthCompliList = candidateList?.data?.filter(({ billMonth }) => !!billMonth && moment(billMonth, 'YYYY-MM').isSame(currentYear, 'M'));
                // selectedMonthCandList
                console.log('selectedMonthCandList------------->', JSON.stringify(selectedMonthCandList));
                lineDate.data.push(Array.isArray(selectedMonthCandList) ? selectedMonthCandList?.length : 0);
                completedCount.data.push(Array.isArray(selectedMonthCompliList) ? selectedMonthCompliList?.length : 0);

                setseries([...[lineDate, completedCount]])
                currentYear = moment().set({ 'month': i + 1, year: sYear });
            }
        } catch (e) {
            console.log('err or ------------->', JSON.stringify(e));
        }
    }


    const YearsList = [{ label: 2022, value: 2022 }, { label: 2023, value: 2023 }]
    return (
        <div className={`card dashboard-card `} >
            <div className="card-header">


                <div className='row'>
                    <div className='col-md-6'>
                        <h5 className='card-title mb-0'>Month Wise Enroll</h5>
                    </div>
                    <div className='col-md-3'>
                        <Normalselect label='Year' value={selectedYear} onChange={(e) => getEarnMoney(selectedBranch, e?.target?.value)} options={YearsList} size="small" />
                    </div>
                    <div className='col-md-3'>
                        <Normalselect label='Branch' value={selectedBranch} onChange={(e) => getEarnMoney(e?.target?.value)} options={branchCandList?.map(({ branch }) => ({ label: branch, value: branch }))} size="small" />
                    </div>

                </div>
            </div>
            <div className="card-body pt-0">
                <ReactApexChart options={options} series={series} type="bar" height={400} />


            </div>
        </div >
    )



}