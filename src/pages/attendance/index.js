import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
    NormalBreadcrumb,
    NormalButton,
    NormalTable,
    NormalModal,
} from "../../components/common";
import { CandidateAttendanceSummary, CandidateAttendanceList } from "../../components/pages";

import { getAllUser } from "../../api/user";
// import './models.scss'

export const CandidateAttendance = () => {
    const params = useParams();
    const [attendanceList, setAttendanceList] = useState([])
    const handleGetAttendanceList=(data)=>{
        setAttendanceList(data)
    }

    return (
        <div>
            <NormalBreadcrumb label='Attendance' />

            <div className="row">
                <div className="col-md-2 col-sm-12">
                    <CandidateAttendanceSummary attendanceList={attendanceList} />
                </div>
                <div className="col-md-8 col-sm-12">
                    <CandidateAttendanceList  getAttendanceList={handleGetAttendanceList}/>
                </div>
            </div>
        </div>
    );
};
