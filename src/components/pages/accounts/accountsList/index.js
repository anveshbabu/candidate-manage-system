import { useState, useEffect } from "react";
import { NormalTable } from '../../../common'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import { history } from '../../../../helpers'
import { setStorage,currencyFormat } from '../../../../services/helperFunctions'
import { EXIST_LOCAL_STORAGE } from '../../../../services/constants'
import moment from "moment";
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


    };

    const handleAccountDetail=(i)=>{
        console.log('data---------->',accountsList[i])
        setStorage(EXIST_LOCAL_STORAGE.ACCOUNT_DETAIL,JSON.stringify(accountsList[i]))
        history.push(`/accounts/detail/${accountsList[i]?.id}`);

        // if(a ==)
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
                                    <td>{ moment(month,'YYYY-MM').format('MMM YYYY') }</td>
                                    <td>{currencyFormat(tIncome)}</td>
                                    <td>{currencyFormat(rAmo)}</td>
                                    <td>{currencyFormat(handleGetPendingCall(data[i]))}</td>
                                    <td>{currencyFormat(handleGetExpenceCall(data[i]))}</td>
                                    <td className={handleGetProfitLossCall('Profit',data[i])  > 0 && 'text-success fw-bold'}>{currencyFormat(handleGetProfitLossCall('Profit',data[i]))}</td>
                                    <td className={handleGetProfitLossCall('Profit',data[i]) ===0 && 'text-danger fw-bold'}>{currencyFormat(handleGetProfitLossCall('Loss',data[i]))}</td>
                                    <td>
                                        <IconButton title="View" color="success" onClick={()=>handleFormToggle(i)}>
                                            <CreateIcon />
                                        </IconButton>
                                        
                                        <IconButton title="View" color="primary" onClick={()=>handleAccountDetail(i)}>
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

