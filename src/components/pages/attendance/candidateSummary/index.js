import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './candidateSummary.scss'

export const CandidateAttendanceSummary = () => {
    const params = useParams();


    return (
        <div class="card candidateSummary">
            <div class="card-header d-flex align-items-center">

                <h5>Class Summary</h5>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                   <label> Joining Date</label>
                    <span className="float-end text-center">17
                        <small className="d-flex">Jan 2022</small>
                    </span>
                </li>
                <li class="list-group-item">
                   <label>Present Days</label> 
                    <span className="float-end text-center">12
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Absent Days</label>
                    <span className="float-end text-center">12
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Leave Days</label>
                    <span className="float-end text-center">0
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                   <label> Course Duration</label>
                    <span className="float-end text-center">75
                        <small className="d-flex">Days</small>
                    </span>
                </li>
                <li class="list-group-item">
                    <label>Extended Days</label>
                    <span className="float-end text-center">75
                        <small className="d-flex">Days</small>
                    </span>
                </li>
            </ul>
            {/* </div> */}
        </div>
    );
};
