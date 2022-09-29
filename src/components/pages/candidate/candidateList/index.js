
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
import { setStorage } from '../../../../services/helperFunctions'
import './candidateList.scss'

export const CandidateList = ({ candidateList = [], onGetEditData = '', candidateDelete, isFromBatch = '', isMultyUpdateIndex = [], handleToggleAttendance, handleToggleComplited }) => {

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
        label: "Branch",
        key: "instituteBranch"
    },
    {
        label: "Billing Month",
        key: "billingMonth"
    },
    {

        label: "Branch Incharge",
        key: "branchIncharge"
    },

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

   
    isFromBatch &&   {

        label: "Action",
        key: "Action",
    },
    ];



    useEffect(()=>{
        handleGetUserList()
    },[])


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
            <div className='col-md-12'>

                {/* <div class="card my-4">
                    <div class="card-body">
                        This is some text within a card body.
                    </div>
                </div> */}

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
                                <td>{data.instituteBranch}</td>
                                <td>{data.billMonth}</td>
                                <td>{handleGetBranchInChargeName(data.branchIncharge)}</td>
                                <td>{data.status}</td>


                                {isFromBatch && <td>

                                    <NormalToggleSwitch disabled={data.status != 'Processing'} checked={data?.attObj?.atd === ATTENDANCE.PRESENT} onChange={(e) => handleToggleAttendance(e, i)} label={data?.attObj?.atd} />
                                </td>}

                                {/* {isFromBatch &&
                                    <td>

                                        <NormalToggleSwitch disabled={!!isMultyUpdateIndex?.find((index) => index == i)?.toString()} checked={data?.status == 'Completed'} onChange={(e) => handleToggleComplited(e, i)} />

                                        {!!isMultyUpdateIndex?.find((index) => index == i)?.toString() && <div class="spinner-border text-primary spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
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

            </div>
            <NormalAlert isShow={isDeleteAlert} title='Are You sure want to delete the candidate' toggle={handleClearDeleteData} onClick={handleDeleteCandidate} />
        </div>
    )




} 