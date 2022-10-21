import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getStorage } from '../../../../services/helperFunctions'
import { LazyLoadImage } from '../../../../components/common'
import { EXIST_LOCAL_STORAGE, ATTENDANCE } from '../../../../services/constants'
import { attendanceFormObject } from '../../../../services/entity/attendance'
import { getCandidateAttendance } from '../../../../api/attendance'
import './candidateAttendanceList.scss'

export const CandidateAttendanceList = ({ getAttendanceList }) => {
    const params = useParams();
    const [attendanceList, setAttendanceList] = useState([])
    const [attendanceInitList, setAttendanceInitList] = useState([]);
    const [candidateDetail, setCandidateDetail] = useState('')
    useEffect(() => {
        let candData = JSON.parse(getStorage(EXIST_LOCAL_STORAGE?.ATTENDANCE_CANDIDATE));
        var courseStartDate = moment(candData?.joinedCourses[0]?.courseStartDate, "YYYY-MM-DD");
        var current = moment()
        setCandidateDetail(candData);
        var diff = current.diff(courseStartDate, 'days');
        let setCourseStartDate = moment(candData?.joinedCourses[0]?.courseStartDate, "YYYY-MM-DD");
        let attendanceLis = []
        for (let i = 0; i < diff + 1; i++) {
            let obj = {
                ...attendanceFormObject,
                atd: "",
                atdDate: setCourseStartDate.format('DD/MM/YYYY'),
            };
            attendanceLis.push({ ...obj })
            setCourseStartDate.add(1, 'd');
        };
        setAttendanceInitList([...attendanceLis])

        handleGetAttendancelist(candData?.id);
    }, []);


    useEffect(() => {
        let candData = JSON.parse(getStorage(EXIST_LOCAL_STORAGE?.ATTENDANCE_CANDIDATE));
        handleGetAttendancelist(candData?.id);
    }, [attendanceInitList]);

    const handleGetAttendancelist = (candId) => {
        getCandidateAttendance(candId).then((attResObj) => {
            let newAttList = attendanceInitList.map(({ atdDate }, i) => {
                if (atdDate) {
                    let attobj = attResObj.find((atd) => atd?.atdDate === atdDate)
                    return {
                        ...attendanceInitList[i],
                        ...attobj
                    };
                } else {
                    return {
                        ...attendanceInitList[i],
                    }
                }

            });
            setAttendanceList([...newAttList.reverse()]);
            getAttendanceList(newAttList)

        }).catch((error) => {
            console.log('--------- err', error);
            // setFormLoader(false);

        });
    };



    const handleAttendanceLabel = (atd, atdDate) => {
        if (atd === ATTENDANCE.PRESENT) {
            return 'Present'
        } else if (atd === ATTENDANCE.ABSENT) {
            return 'Absent'
        } else if (atd === ATTENDANCE.LEAVE) {
            return 'Leave'
        } else if (!atd && !candidateDetail?.joinedCourses[0]?.classDays.includes(moment(atdDate, "DD/MM/YYYY").day())) {
            return 'Week Off'
        } else {
            return "Missing"
        }
    }



    return (
        <div className="card candidateSummary">
            <div className="card-header d-flex align-items-center">
                <div className="d-flex">
                    <div className="flex-shrink-0">
                        <LazyLoadImage alt={candidateDetail?.name} className='rounded-circle' name={candidateDetail?.name} />
                    </div>
                    <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0">{candidateDetail?.name}</h5>
                        <small>{candidateDetail?.phone}</small>
                    </div>
                </div>

            </div>

            <ul className="list-group list-group-flush">

                {attendanceList?.map(({ atdDate, atd }, i) =>
                    <li className="list-group-item" key={i}>
                        <label>{atdDate} {i}</label>
                        <span className={`float-end text-center ${atd === ATTENDANCE.PRESENT ? "text-success" : atd === ATTENDANCE.ABSENT ? "text-warning" : "text-danger"}`}>{handleAttendanceLabel(atd, atdDate)}
                            {/* <small className="d-flex">{atd ? atd : "Missing"}</small> */}
                        </span>
                    </li>
                )}


            </ul>
            {/* </div> */}
        </div>
    );
};
