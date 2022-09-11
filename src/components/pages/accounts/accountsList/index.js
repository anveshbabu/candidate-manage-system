import { useState, useEffect } from "react";
import { NormalTable } from '../../../common'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { history } from '../../../../helpers'
export function AccountList({ handleFormToggle, accountsList = [] }) {


    const columnData = [{
        label: "S.no",
        key: "index"
    }, {
        label: "Month",
        key: "month"
    }, {
        label: "Total Income",
        key: "income"
    },
    {
        label: "Received Amount",
        key: "income"
    },
    {
        label: "Pending Amount",
        key: "pIncome"
    },

    {
        label: "Expence",
        key: "expence"
    },


    {
        label: "Profit",
        key: "profit"
    },

    {
        label: "Loss",
        key: "loss"
    },
    {
        label: "Action",
        key: "loss"
    },


    ];


    const handleGetExpenceCall = (data) => {
        let salaryList = [...data?.salaryList];
        return salaryList.reduce((sum, { salary, salaryAdv }) => sum + (Number(salary) + Number(salaryAdv)), 0);
    }

    const handleGetProfitLossCall = (type, data) => {
        let expence = handleGetExpenceCall(data);
        const value = (data?.rAmo - expence)
        if (type === 'Profit') {
            return value > 0 ? value : 0
        } else {
            return value < 0 ? value : 0
        }


    }

    const handleGetPendingCall = (data) => {
        let pendingAmo = data.tIncome - data.rAmo;
        return pendingAmo > 0 ? pendingAmo : `+${Math.abs(pendingAmo)}`


    }

    return (
        <div>
            <div className="row">
                <div className='col-md-12'>



                    <NormalTable
                        // className='table-sm'
                        columnData={columnData}
                        rowData={accountsList}
                        count={200}
                        pageNo={2}
                        rowsPerPage={25}
                        onChangePagination={(e, v) => console.log('---', v)}
                        rowRender={(data) => (
                            data?.map(({ month, tIncome = 0, rAmo = 0 }, i) =>
                                <tr key={i} >
                                    <td>{i+1}</td>
                                    <td>{month}</td>
                                    <td>{tIncome}</td>
                                    <td>{rAmo}</td>
                                    <td>{handleGetPendingCall(data[i])}</td>
                                    <td>{handleGetExpenceCall(data[i])}</td>
                                    <td className={handleGetProfitLossCall('Profit',data[i])  > 0 && 'text-success fw-bold'}>{handleGetProfitLossCall('Profit',data[i])}</td>
                                    <td className={handleGetProfitLossCall('Profit',data[i]) ===0 && 'text-danger fw-bold'}>{handleGetProfitLossCall('Loss',data[i])}</td>
                                    <td>
                                        <IconButton title="View" color="primary" onClick={()=>handleFormToggle(i)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </td>

                                </tr>
                            )


                        )}


                    />
                </div>
            </div>



        </div>


        // </div>
    );
}

