import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { COURSE_LIST, EXIST_LOCAL_STORAGE, ATTENDANCE } from '../../../../services/constants'
import { getStorage } from '../../../../services/helperFunctions'
import './candidateSummary.scss'

export const CandidateAttendanceSummary = ({ attendanceList }) => {
    const params = useParams();
    const [candidateDetail, setCandidateDetail] = useState('')
    const [courseExtendDays, setCourseExtendDays] = useState(0)
    const [presentCount, setPresentCount] = useState(0)
    const [absentCount, setAbsentCount] = useState(0)
    const [leaveCount, setleaveCount] = useState(0)

    useEffect(() => {
        let candData = JSON.parse(getStorage(EXIST_LOCAL_STORAGE?.ATTENDANCE_CANDIDATE));
        setCandidateDetail(candData)
        var joinDate = moment(candData?.joinedCourses[0]?.joinDate, "YYYY-MM-DD");
        var current = moment();
        var diff = current.diff(joinDate, 'days');
        setCourseExtendDays(diff)

    }, []);


    useEffect(() => {
        let presentCount = 0, absentCount = 0, leaveCount = 0;
        attendanceList.map(({ atd }) => {
            if (atd === ATTENDANCE.PRESENT) {
                presentCount++

            } else if (atd === ATTENDANCE.ABSENT) {
                absentCount++
            } else if (atd === ATTENDANCE.LEAVE) {
                leaveCount++
            }
            // console.log('data------------>', JSON.stringify(data))
        });
        setPresentCount(presentCount);
        setAbsentCount(absentCount);
        setleaveCount(leaveCount)

    }, [attendanceList])


    const handleGetCourseDuration = () => {
        // candData?.joinedCourses?[0]?.course
        console.log(' candidateDetail?.joinedCourses---------->', candidateDetail?.joinedCourses)
        if (!!candidateDetail) {
            return COURSE_LIST.find(({ value }) => value === candidateDetail?.joinedCourses[0]?.course)?.courseDuration
        }
        return 0

    }
    return (
        <div class="card candidateSummary">
            <div class="card-header d-flex align-items-center">

                <h5>Class Summary</h5>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <label> Joining Date</label>
                    <span className="float-end text-center">{!!candidateDetail && moment(candidateDetail?.joinedCourses[0]?.joinDate, "YYYY-MM-DD").format('DD')}
                        <small className="d-flex">{!!candidateDetail && moment(candidateDetail?.joinedCourses[0]?.joinDate, "YYYY-MM-DD").format('MMM YYYY')}</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Present Days</label>
                    <span className="float-end text-center">{presentCount}
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Absent Days</label>
                    <span className="float-end text-center">{absentCount}
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Leave Days</label>
                    <span className="float-end text-center">{leaveCount}
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label> Course Duration</label>
                    <span className="float-end text-center">{handleGetCourseDuration()}
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Extended Days</label>
                    <span className="float-end text-center">{handleGetCourseDuration() < courseExtendDays ? courseExtendDays-handleGetCourseDuration():0 }
                        <small className="d-flex">Days</small>
                    </span>
                </li>
            </ul>
            {/* </div> */}
        </div>
    );
};
