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


    return (
        <div>
            <NormalBreadcrumb label='Attendance' />

            <div className="row">
                <div className="col-md-2 col-sm-12">
                    <CandidateAttendanceSummary />
                </div>
                <div className="col-md-8 col-sm-12">
                    <CandidateAttendanceList />
                </div>
            </div>
        </div>
    );
};
