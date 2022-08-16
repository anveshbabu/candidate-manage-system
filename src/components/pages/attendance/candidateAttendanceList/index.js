import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getStorage } from '../../../../services/helperFunctions'
import { EXIST_LOCAL_STORAGE } from '../../../../services/constants'
import { attendanceFormObject } from '../../../../services/entity/attendance'
import './candidateAttendanceList.scss'

export const CandidateAttendanceList = () => {
    const params = useParams();
    const [attendanceList, setAttendanceList] = useState([])
    useEffect(() => {
        let candData = JSON.parse(getStorage(EXIST_LOCAL_STORAGE?.ATTENDANCE_CANDIDATE));
        var joinDate = moment(candData?.joinedCourses[0]?.joinDate, "YYYY-MM-DD");
        var current = moment()

        var diff = current.diff(joinDate, 'days');

        let setJoindate = moment(candData?.joinedCourses[0]?.joinDate, "YYYY-MM-DD");
        let attendanceLis = []
        for (let i = 0; i < diff; i++) {
            let obj = {
                ...attendanceFormObject,
                atd:"",
                atdDate: setJoindate.format('DD/MM/YYYY'),
            };
            attendanceLis.push({ ...obj })
            setJoindate.add(1, 'd');
        };
        setAttendanceList([...attendanceLis])
        console.log('attendanceLis--------->', JSON.stringify(attendanceLis))


    }, [])

    return (
        <div class="card candidateSummary">
            <div class="card-header d-flex align-items-center">

                <h5>Class Summary</h5>
            </div>

            <ul class="list-group list-group-flush">

                {attendanceList?.map(({ atdDate, atd }) =>
                    <li class="list-group-item">
                        <label>{atdDate}</label>
                        <span className="float-end text-center">{atd ? atd : "Missing"}
                            {/* <small className="d-flex">{atd ? atd : "Missing"}</small> */}
                        </span>
                    </li>
                )}


            </ul>
            {/* </div> */}
        </div>
    );
};
