import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './batchCard.scss'
import { history } from '../../../../helpers'
import { setStorage, isEmpty } from '../../../../services/helperFunctions'
import { EXIST_LOCAL_STORAGE, ATTENDANCE } from '../../../../services/constants'
import { attendanceFormObject } from '../../../../services/entity/attendance'
import { getAttendance } from '../../../../api/attendance'



export function BatchCard({ data = {} }) {
    const params = useParams();

    const [overAllAbsentCount, setOverAllAbsentCount] = useState(0);
    const [overAllPresentCount, setOverAllPresentCount] = useState(0);
    const [overAllActiveCount, setOverAllActiveCount] = useState(0);
    const [overAllDeActiveCount, setOverAllDeActiveCount] = useState(0);
    const [batchObj, setBatchObj] = useState({...data})
    const [isBatchLeave, setIsBatchLeave] = useState(false);

    useEffect(() => {
        let activeCount = 0, deActiveCount = 0;
        let overAllAbsentCount = 0;
        let overAllPresentCount = 0;
        batchObj?.batchData?.map(({ status, attObj }) => {
            if (status.includes("Processing")) {
                activeCount = activeCount + 1;
            } else {
                deActiveCount = deActiveCount + 1;

            };

            if (attObj?.atd === ATTENDANCE.PRESENT) {
                overAllPresentCount++

            } else if (attObj?.atd === ATTENDANCE.ABSENT) {
                overAllAbsentCount++

            }


        });

        setOverAllActiveCount(activeCount);
        setOverAllDeActiveCount(deActiveCount);
        setOverAllPresentCount(overAllPresentCount);
        setOverAllAbsentCount(overAllAbsentCount);



    }, [batchObj])

    useEffect(() => {
        handleGetAttendanceList()
    }, [])

    const handleCardClick = () => {
        history.push(`/batche/${data?.id}/candidate`);
        setStorage(EXIST_LOCAL_STORAGE?.BATCH_CANDIDATE_LIST, JSON.stringify(batchObj?.batchData))
    }

    const handleGetAttendanceList = () => {

        getAttendance(params?.batchId).then((attResObj) => {
            let batchDetail = data?.batchData.map((candObj) => {
                let attObj = attResObj?.find(({ candId }) => candId === candObj?.id);
                if (!!attObj && !isEmpty(attObj)) {
                    return candObj = { ...candObj, attObj }
                } else {
                    return candObj = { ...candObj, attObj: attendanceFormObject }
                }
            });
            setBatchObj({ ...data, batchData: batchDetail })
        }).catch((error) => {
            console.log('--------- err', error);
            // setFormLoader(false);

        });
    }

    return (

        <div className="card batch-card  mb-4" onClick={handleCardClick}>
            <div className="card-header">
                {isBatchLeave && <div className="float-end"><div className="badge bg-danger">Leave</div></div>}
                <h5 className="card-title mb-0">{batchObj?.batchTiming}</h5>
                <small>#110{batchObj?.order}</small>
            </div>
            <div className="card-body">
                <table className="table">
                    <tbody>
                        <tr>
                            <td><strong>Total Present</strong></td>
                            <td>{overAllPresentCount}</td>
                        </tr>
                        <tr>

                            <td><strong>Total Absent</strong></td>
                            <td>{overAllAbsentCount}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Active Members</strong></td>
                            <td>{overAllActiveCount ? overAllActiveCount : 0}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Inactive Members</strong></td>
                            <td>{overAllDeActiveCount ? overAllDeActiveCount : 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    );
}

