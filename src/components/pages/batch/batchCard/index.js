import React, { useEffect, useState } from "react";
import './batchCard.scss'
// import { NormalBreadcrumb } from '../../components/common'
import { NormalButton } from '../../../common'
import courseData from '../../../../assets/data/db.json'



export function BatchCard({ data = {} }) {
    const [overAllAbsentCount, setOverAllAbsentCount] = useState(0);
    const [overAllPresentCount, setOverAllPresentCount] = useState(0);
    const [overAllActiveCount, setOverAllActiveCount] = useState(0);
    const [overAllDeActiveCount, setOverAllDeActiveCount] = useState(0);
    const [isBatchLeave, setIsBatchLeave] = useState(false);

    useEffect(() => {
        let overAllAbsentCount = 0;
        let overAllPresentCount = 0;
        data?.batchDetails?.map(({ absentCount, presentCount, todayLeave }) => {
            overAllPresentCount = overAllPresentCount + presentCount;
            overAllAbsentCount = overAllAbsentCount + absentCount;
            if (todayLeave) {
                setIsBatchLeave(todayLeave)

            }
        });
        let activeCount = 0, deActiveCount = 0;
        data?.batchData?.map(({ status }) => {
            if (status.includes("Processing")) {
                activeCount = activeCount + 1;

            } else {
                deActiveCount = deActiveCount + 1;

            }
        });
        setOverAllActiveCount(activeCount);
        setOverAllDeActiveCount(deActiveCount);
        setOverAllPresentCount(overAllPresentCount);
        setOverAllAbsentCount(overAllAbsentCount);

    }, [data])


    return (

        <div className="card batch-card  mb-4">
            <div className="card-header">
                {isBatchLeave && <div className="float-end"><div className="badge bg-danger">Leave</div></div>}
                <h5 className="card-title mb-0">{data?.batchTiming}</h5>
                <small>#110{data?.order}</small>
            </div>
            <div className="card-body">
                <table className="table">
                    <tbody>
                        <tr>
                            <td><strong>Total Present</strong></td>
                            <td>{overAllAbsentCount}</td>
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
            {/* <div className="card-footer text-center">
            <NormalButton label='Mange Batch'/>
            </div> */}
        </div>

    );
}

