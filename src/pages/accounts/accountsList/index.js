import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs, NormalModal } from '../../../components/common'
import { AccountList, AccountForm } from '../../../components/pages'

import { getBatchListWithCandidate } from '../../../api/masters';
import { getAllUser } from '../../../api/user';
import { ALL_BG_PLACEHOLDERS, CURRENT_USER, WEEK_LIST } from '../../../services/constants';

import { getAllAccounts } from '../../../api/accounts'


export function Account() {

    const [isShowForm, setShowForm] = useState(false)
    const [isFormLoader, setFormLoader] = useState(false);
    const [accountsList, setAccountsList] = useState([]);
    const [editFormObj, setEditFormObj] = useState({});



useEffect(()=>{

    handleGetAllAccounts()
},[])


    const handleFormToggle = (isSuccess=false) => {

        setShowForm(!isShowForm)
       
        if(isSuccess){
            handleGetAllAccounts();
        }

    };


    const handleGetAllAccounts = () => {
        try {
            setFormLoader(true);
            getAllAccounts().then((data) => {
                setFormLoader(false);
                setAccountsList(data);

            }).catch((error) => {
                setFormLoader(false);

            });

        } catch (e) {

        }
    }


    const handleEditAccount=(index)=>{
        setEditFormObj({...accountsList[index]})
        handleFormToggle()
    }


    return (
        <div>
            <NormalBreadcrumb label='Accounts' rightSideBtn={true} buttonLabel='Add New' onBtnClick={handleFormToggle} />


            <div className="row mt-5">
                <div className="col-md-12">


                    <AccountList handleFormToggle={handleEditAccount} accountsList={accountsList}/>



                </div>
            </div>

            <NormalModal toggle={handleFormToggle} className='modal-right' title="Add Accounts" isShow={isShowForm}>
                <AccountForm editFormObj={editFormObj} accountFormToggle={handleFormToggle} />
            </NormalModal>


        </div>



    );
}

