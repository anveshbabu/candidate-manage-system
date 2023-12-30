import { useState, useEffect, useRef } from "react";
import { NormalTable, NormalInput, NormalButton } from '../../../common'
import { getAllUser } from '../../../../api/user';
import SimpleReactValidator from 'simple-react-validator';
import { accountsFormObj } from '../../../../services/entity'
import moment from "moment";

import { createExpence, upDateExpence } from '../../../../api/accounts'
import { isEmpty } from "../../../../services/helperFunctions";
export function AccountForm({ accountFormToggle, editFormObj = {} }) {
    const simpleValidator = useRef(new SimpleReactValidator({ className: "error-message", }));
    const [, forceUpdate] = useState();
    const [isFormLoader, setFormLoader] = useState(false);
    const [accountFormObj, setAccountFormObj] = useState({
        ...accountsFormObj
    })


    useEffect(() => {
      
        if (!isEmpty(editFormObj)) {

            setAccountFormObj({ ...editFormObj });
            handleGetUserList('isEdit');

        }else{
            setAccountFormObj({...accountsFormObj});
            handleGetUserList();
        };

       

    }, []);

    useEffect(() => {
        simpleValidator?.current?.purgeFields()
    }, [accountFormObj])

    const handleGetUserList = (isEdit) => {
        try {
            getAllUser().then((data) => {
                let salaryList = isEdit?[...editFormObj?.salaryList]:[...accountFormObj?.salaryList]
               
                data?.map(({ userId ,user_type}, i) => {
                    salaryList=   salaryList.map((slData)=>{
                        if(slData?.userId === userId){
                            return {...slData ,user_type} 
                        }else{
                            return {...slData} 
                        }
                    })
                    let isAvilable = salaryList?.find((data) => data?.userId === userId);
                    if (!isAvilable) {
                        let { first_name, last_name, userId } = data[i];
                        let per = {
                            first_name,
                            last_name,
                            userId,
                            salary: 0,
                            salaryAdv: 0,
                            user_type
                        };
                        salaryList.push({ ...per })
                       

                    }else{

                    }
                    setAccountFormObj({
                        ...!isEmpty(editFormObj) ? editFormObj : accountFormObj,
                        salaryList
                    })


                })



            }).catch((error) => {
                // setFormLoader(false);

            });

        } catch (e) {

        }
    }


    const handleAmmountChanges = (event) => {
        let { name, value } = event?.target;
        setAccountFormObj({
            ...accountFormObj,
            [name]: value

        });

    };



    const handleSalaryChange = (event, i) => {

        let { name, value } = event?.target;
        let salaryList = [...accountFormObj?.salaryList]
        salaryList[i][name] = value;
        setAccountFormObj({
            ...accountFormObj,
            salaryList
        });
    };

    const handleGetExpenceCall = () => {
        let salaryList = [...accountFormObj?.salaryList];
        return salaryList.reduce((sum, { salary, salaryAdv }) => sum + (Number(salary) + Number(salaryAdv)), 0);
    }

    const handleGetProfitLossCall = (type) => {
        let expence = handleGetExpenceCall();
        const value = (accountFormObj?.rAmo - expence)
        if (type === 'Profit') {
            return value > 0 ? value : 0
        } else {
            return value < 0 ? value : 0
        }


    }

    const handleGetPendingCall = (type) => {
        let pendingAmo = accountFormObj.tIncome - accountFormObj.rAmo;
        return pendingAmo > 0 ? pendingAmo : `+${Math.abs(pendingAmo)}`


    }


    const handleCreateAccount = () => {
        const formValid = simpleValidator.current.allValid();
        if (formValid) {
            setFormLoader(true);
            let apiCall = accountFormObj.hasOwnProperty("id") ? upDateExpence({ ...accountFormObj }, accountFormObj?.id) : createExpence(accountFormObj)
            apiCall.then((data) => {
                setFormLoader(false);
                accountFormToggle('success')
            }).catch((error) => {
                setFormLoader(false);

            });
            // 
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }


    }


    const handleToCloseModal = () => {
        setAccountFormObj({...accountsFormObj})
        accountFormToggle()
    }



    return (
        <div>
            <div className="row">
                <div className='col-md-6'>
                    <NormalInput label='Month' value={accountFormObj.month} name='month' onChange={handleAmmountChanges} type='month'

                        errorMessage={simpleValidator.current.message('Month', accountFormObj.month, 'required')}
                    />
                </div>
                <div className='col-md-6'>
                    <NormalInput label='Total Income' value={accountFormObj.tIncome} name='tIncome' onChange={handleAmmountChanges}

                        errorMessage={simpleValidator.current.message('Total Income', accountFormObj.tIncome, 'required')}
                        type='number' />
                </div>
                <div className='col-md-6'>
                    <NormalInput label='Received Amount' value={accountFormObj.rAmo} name='rAmo' errorMessage={simpleValidator.current.message('Received Amounr', accountFormObj.rAmo, 'required')} onChange={handleAmmountChanges} type='number' />
                </div>
                <div className='col-md-6'>
                    <NormalInput label='Pending Amount' value={handleGetPendingCall()} name='pAmo' disabled type='text' />
                </div>
                <div className='col-md-6'>
                    <NormalInput label='Expence' value={handleGetExpenceCall()} disabled type='number' />
                </div>
                <div className='col-md-6'>
                    <NormalInput label='Profit' value={handleGetProfitLossCall('Profit')} disabled type='number' />
                </div>
                <div className='col-md-6'>
                    <NormalInput label='Loss' value={handleGetProfitLossCall('loss')} disabled type='number' />
                </div>
            </div>
            {accountFormObj?.salaryList?.map(({ first_name, last_name, userId,user_type }, i) => (user_type === 1 || user_type === 2) &&
                <div className="row mt-4" key={i}>
                    <div className="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 class="card-title">{first_name} {last_name}</h5>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className='col-md-6'>
                                        <NormalInput label='Salary' value={accountFormObj?.salaryList[i]?.salary} name='salary' type='number'
                                            errorMessage={simpleValidator.current.message('Salary', accountFormObj?.salaryList[i]?.salary, 'required')}

                                            onChange={(e) => handleSalaryChange(e, i)} />
                                    </div>
                                    <div className='col-md-6'>
                                        <NormalInput label='Salary Advance' value={accountFormObj?.salaryList[i]?.salaryAdv} name='salaryAdv' onChange={(e) => handleSalaryChange(e, i)} type='number' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            )}

            <div className='col-md-12 col-sm-12 mt-5'>
                <NormalButton disabled={isFormLoader} color='error' onClick={handleToCloseModal} className='me-2' label='Cancel' />
                <NormalButton isLoader={isFormLoader} label={accountFormObj.hasOwnProperty("id") ? "Update" : 'Save'} onClick={handleCreateAccount} />

            </div>
        </div>


    );
}

