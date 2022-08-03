
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { NormalTable, NormalModal, NormalAlert } from '../../../common';
import { CandidateFrom } from '../candidateForm'
import { getCandidate, deleteCandidate } from '../../../../api/candidate'
import { CANDIDATE_COURSE_STATUS, COURSE_LIST, CLASS_TYPE, YES_NO, INSTITUTE_BRANCH } from '../../../../services/constants'
import './candidateList.scss'

export const CandidateList = ({ candidateList = [], onGetEditData = '', candidateDelete }) => {

    const [isDeleteAlert, setIsDeleteAlert] = useState(false)
    const [deleteObj, setDeleteObj] = useState({});



    const columnData = [{
        label: "S.no",
        key: "index"
    }, {
        label: "Name",
        key: "name"
    }, {
        label: "Eamil",
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
        label: "Action",
        key: ""
    }];





    const handleDeleteCandidate = (value) => {

        if (value) {
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
        setIsDeleteAlert(true);
        setDeleteObj(obj)
    }

    const handleClearDeleteData = () => {
        console.log(false)
        setIsDeleteAlert(false);
        setDeleteObj({})
    }

    return (

        <div className="row">
            <div className='col-md-12'>
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
                                <td> <a href='#'>{data.name}</a></td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.course}</td>
                                <td>{data.status}</td>
                               
                                {/* <td>{data.course}</td>
                              
                                <td>{data.type}</td>
                                <td>{data.fees}</td>
                                <td>{data.pendingFees}</td>
                                <td>{data.settlementStatus}</td> */}
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