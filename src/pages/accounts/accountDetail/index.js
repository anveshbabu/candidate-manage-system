import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs, Normalselect } from '../../../components/common'
import { CandidateList, OverAllCountCard } from '../../../components/pages'

import { getBillingWiseCandidate } from '../../../api/accounts';
import { getAllUser } from '../../../api/user';
import { EXIST_LOCAL_STORAGE, CURRENT_USER, USER_ROLE, INSTITUTE_BRANCH } from '../../../services/constants'
import { getStorage, currencyFormat,userGetByRole } from '../../../services/helperFunctions'
import moment from "moment";


export function AccountDetail() {
    const [candidateList, setCandidateList] = useState([])
    const [candidateFilterList, setCandidateFilterList] = useState([]);
    const [accountDetail, setAcountDetail] = useState({});
    const [candidateFilter, setCandidateFilter] = useState({
        searchText: "",
        classType: "",
        InstituteBranch: "",
        trainer:""

    });
    const [userList, setUserList] = useState([]);




    useEffect(() => {

        let accountDetail = JSON.parse(getStorage(EXIST_LOCAL_STORAGE.ACCOUNT_DETAIL));
        console.log('accountDetail------------>', accountDetail)
        setAcountDetail(accountDetail)
        handleGetCandidate();
        handleGetUserList()

    }, [])


    const handleGetCandidate = () => {
        let accountDetail = JSON.parse(getStorage(EXIST_LOCAL_STORAGE.ACCOUNT_DETAIL));
        getBillingWiseCandidate(accountDetail?.month).then((data) => {



            setCandidateList(data)
            setCandidateFilterList(data)


        }).catch((error) => {
            // setFormLoader(false);

        });
    }

    const handleGetPendingCall = (data) => {
        let pendingAmo = data.tIncome - data.rAmo;
        return pendingAmo > 0 ? pendingAmo : `+${Math.abs(pendingAmo)}`


    };

    const handleGetExpenceCall = (data) => {
        // con

        if (data?.salaryList?.length > 0) {
            let salaryList = [...data?.salaryList];
            return salaryList?.reduce((sum, { salary, salaryAdv }) => sum + (Number(salary) + Number(salaryAdv)), 0);

        }


    }

    const handleCandidateFilter = (event) => {
        let { value, name } = event.target;
        setCandidateFilter({
            ...candidateFilter,
            [name]: value
        });


        let filterValue = value.toLowerCase();
        let result = filterValue.length > 0 ? candidateFilterList.filter(({ name, phone, joinedCourses }) => name?.toLowerCase().includes(filterValue)
            || phone?.toLowerCase().includes(filterValue)
            || !!joinedCourses?.find(({ classType, settlementStatus, instituteBranch,trainer }) => classType?.toLowerCase().includes(filterValue)
                || settlementStatus?.toLowerCase().includes(filterValue) || instituteBranch?.toLowerCase().includes(filterValue) || trainer ===value )


        ) : candidateFilterList;
        console.log('candidateFilterList--------------->',result)
        setCandidateList(result)

    };

    const handleExpectedAmount=()=>{
        if(candidateList?.length>0){
          let overAllMaount=  candidateList?.reduce((sum, { fees}) => sum + (Number(fees)), 0);
          return ((overAllMaount/100) *41)
        }

    }


    const handleGetUserList = () => {
        try {
            getAllUser().then((data) => {


                let userList = data.map(({ first_name, last_name, userId, user_type }) => ({ label: `${first_name} ${last_name}`, value: userId, user_type }))


                setUserList(userList);
            }).catch((error) => {
                // setFormLoader(false);

            });

        } catch (e) {

        }
    }

    return (
        <div>
            <NormalBreadcrumb label={`Account Details (${moment(accountDetail?.month).format('MMM YYYY')})`} />

            <div className="row mt-4">
                <div className="col-md-6 col-sm-12">
                    <h4 className="sub-page-titel mb-4">{candidateFilterList.length} Total expected Amount {handleExpectedAmount()}</h4>
                </div>
            </div>
            <div className="row mt-5">

                <div className="col-md-3 col-sm-12 mb-4">
                    <OverAllCountCard color='primary' title="Total Income" count={currencyFormat(accountDetail?.tIncome, '')} icon='fa-indian-rupee-sign' />
                </div>
                <div className="col-md-3 col-sm-12 mb-4">
                    <OverAllCountCard color='warning' title="Received Amount" count={currencyFormat(accountDetail?.rAmo, '')} icon='fa-indian-rupee-sign' />
                </div>
                <div className="col-md-3 col-sm-12 mb-4">
                    <OverAllCountCard color='info' title="Pending Amount" count={currencyFormat(handleGetPendingCall(accountDetail), '')} icon='fa-indian-rupee-sign' />
                </div>
                <div className="col-md-3 col-sm-12 mb-4">
                    <OverAllCountCard color='danger' title="Expence" count={currencyFormat(handleGetExpenceCall(accountDetail), '')} icon='fa-indian-rupee-sign' />
                </div>


            </div>
            <div className="row mt-3">
                <div className="col-md-3 col-sm-12 mb-4">
                    <Normalselect label='Institute Branch'
                        value={candidateFilter.InstituteBranch}
                        options={INSTITUTE_BRANCH}
                        name='InstituteBranch'
                        size="small"
                        onChange={handleCandidateFilter}
                    />
                </div>
                <div className="col-md-3 col-sm-12 mb-4">
                    <Normalselect label='Trainer'
                        value={candidateFilter.trainer}
                        options={userGetByRole(userList,USER_ROLE.TRAINER) }
                        name='trainer'
                        size="small"
                        onChange={handleCandidateFilter}
                    />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12">


                    <CandidateList candidateList={candidateList} isCandidateShowList={true} />



                </div>
            </div>
        </div>



    );
}

