
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import moment from 'moment';
import { history } from '../../../../helpers'
import { NormalTable, NormalToggleSwitch, NormalAlert } from '../../../common';
import { CandidateFrom } from '../candidateForm'
import { getCandidate, deleteCandidate } from '../../../../api/candidate'
import { getAllUser } from '../../../../api/user';
import { ATTENDANCE, EXIST_LOCAL_STORAGE } from '../../../../services/constants'
import { setStorage, candidateComplitPer, letterAvatar } from '../../../../services/helperFunctions'
import './candidateList.scss'

export const CandidateList = ({ isCandidateShowList = false, candidateList = [], onGetEditData = '', candidateDelete, isFromBatch = '', isMultyUpdateIndex = [], handleToggleAttendance, handleToggleComplited }) => {

    const [isDeleteAlert, setIsDeleteAlert] = useState(false)
    const [deleteObj, setDeleteObj] = useState({});
    const [userList, setUserList] = useState([]);



    const columnData = [{
        label: "S.no",
        key: "index"
    }, {
        label: "Name",
        key: "name"
    }, {
        label: "Email",
        key: "email"
    }, {
        label: "Phone",
        key: "phone"
    },

    {
        label: "Course",
        key: "course"
    },
    {
        label: "Trainer",
        key: "triner"
    },
    {
        label: "Branch",
        key: "instituteBranch"
    },
    // {
    //     label: "Billing Month",
    //     key: "billingMonth"
    // },
    // {

    //     label: "Branch Incharge",
    //     key: "branchIncharge"
    // },

    {
        label: "Status",
        key: "status"
    },

    // {
    //     label: "Type",
    //     key: "type"
    // }, {
    //     label: "Fees",
    //     key: "fees"
    // }, {
    //     label: "Pending Fees",
    //     key: "pendingFees"
    // }, {
    //     label: "Settlement Status",
    //     key: "settlementStatus"
    // },

    {

        label: !isFromBatch ? "Action" : "Attendance",
        key: !isFromBatch ? "Action" : "atd",
    },


    isFromBatch && {

        label: "Action",
        key: "Action",
    },
    ];

    // 100*100/100

    useEffect(() => {
        handleGetUserList()
    }, [])


    const handleDeleteCandidate = (value) => {

        if (value) {
            console.log('deleteObj?.id-------->', deleteObj?.id)
            deleteCandidate(deleteObj?.id).then((data) => {
                let index = candidateList.findIndex(({ id }) => id === deleteObj?.id);
                if (index !== -1) {
                    candidateDelete(index)

                    handleClearDeleteData()
                }
            }).catch((error) => {
                // setFormLoader(false);

            });
        } else {
            console.log(false)
            handleClearDeleteData()
        }
    }



    const handleOpenDeleteAlert = (obj) => {
        console.log('obk---------->', obj)
        setIsDeleteAlert(true);
        setDeleteObj(obj)
    }

    const handleClearDeleteData = () => {
        console.log(false)
        setIsDeleteAlert(false);
        setDeleteObj({})
    }


    const handleRouteAttendance = (data) => {
        setStorage(EXIST_LOCAL_STORAGE?.ATTENDANCE_CANDIDATE, JSON.stringify(data));
        history.push(`/batche/${isFromBatch}/candidate/attendance`)
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




    const handleGetBranchInChargeName = (userId) => {
        if (userList.length > 0) {
            return userList.find(({ value }) => value == userId)?.label
        }

    }


    return (

        <div className="row">
            {!isCandidateShowList && !isFromBatch && candidateList.map((data, i) =>
                <div className='col-md-3' key={i}>
                    <div className="card candidate-card shadow border-0 my-4">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-12 col-sm-12 mb-3'>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <img className='user-img rounded-circle mb-2' src={letterAvatar(data.name, 42)} alt="..." />
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            {/* <div  className="badge bg-info float-end">started</div> */}
                                            <div className="float-end edit-delte-btn">
                                                <IconButton color="success" onClick={() => onGetEditData(data)}>
                                                    <CreateIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleOpenDeleteAlert(data)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                            <h6 className='mb-0'>{data.name}</h6>
                                            <small className='text-primary'>{data.phone}</small>

                                        </div>
                                    </div>


                                </div>

                                {data?.status == 'Processing' &&
                                    <div className='col-md-12 col-sm-12'>
                                        <div className="progress mb-3" title={`${candidateComplitPer(data?.courseStartDate, data.course)}%`}>
                                            <div className={`progress-bar  ${candidateComplitPer(data?.courseStartDate, data.course) > 100 && 'bg-danger'}`} role="progressbar" aria-label="Basic example" style={{ width: `${candidateComplitPer(data?.courseStartDate, data.course)}%` }}>{candidateComplitPer(data?.courseStartDate, data.course)}%</div>
                                        </div>
                                    </div>}


                                <div className='col-md-12 col-sm-12'>
                                    <table className="table candidate-detail">

                                        <tbody>
                                            <tr>

                                                <td><strong>Course</strong></td>
                                                <td>{data.course}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Join Date</strong></td>
                                                <td>{data?.courseStartDate ? data?.courseStartDate : "node ell"}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Trainer</strong></td>
                                                <td>{handleGetBranchInChargeName(data.trainer)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Branch</strong></td>
                                                <td>{data.instituteBranch}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Branch Incharge</strong></td>
                                                <td>{handleGetBranchInChargeName(data.branchIncharge)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Billing Month</strong></td>
                                                <td>{data.billMonth ? data.billMonth : "-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(isFromBatch || isCandidateShowList) && <div className='col-md-12'>



                <NormalTable
                    // className='table-sm'
                    columnData={columnData}
                    count={200}
                    pageNo={2}
                    rowsPerPage={25}
                    onChangePagination={(e, v) => console.log('---', v)}
                    rowRender={() => {
                        return candidateList.map((data, i) =>
                            <tr>
                                <td>{i + 1}</td>
                                <td> <a className='link-primary' onClick={() => handleRouteAttendance(data)}>{data.name}</a></td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.course}</td>
                                <td>{handleGetBranchInChargeName(data.trainer)}</td>
                                <td>{data.instituteBranch}</td>
                             <td>{data.fees}</td> 
                                {/* <td>{handleGetBranchInChargeName(data.branchIncharge)}</td> */}
                                <td>{data.status}</td>


                                {isFromBatch && <td>

                                    <NormalToggleSwitch disabled={data.status != 'Processing'} checked={data?.attObj?.atd === ATTENDANCE.PRESENT} onChange={(e) => handleToggleAttendance(e, i)} label={data?.attObj?.atd} />
                                </td>}

                                {/* {isFromBatch &&
                                    <td>

                                        <NormalToggleSwitch disabled={!!isMultyUpdateIndex?.find((index) => index == i)?.toString()} checked={data?.status == 'Completed'} onChange={(e) => handleToggleComplited(e, i)} />

                                        {!!isMultyUpdateIndex?.find((index) => index == i)?.toString() && <div  className="spinner-border text-primary spinner-border-sm" role="status">
                                            <span  className="sr-only">Loading...</span>
                                        </div>}
                                    </td>
                                } */}
                                <td>
                                    <IconButton color="success" onClick={() => onGetEditData(data)}>
                                        <CreateIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleOpenDeleteAlert(data)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </td>

                            </tr>

                        )
                    }


                    }

                />

            </div>}
            <NormalAlert isShow={isDeleteAlert} title='Are You sure want to delete the candidate' toggle={handleClearDeleteData} onClick={handleDeleteCandidate} />
        </div>
    )




} 