import React from "react";
import './courseCard.scss'
import { history } from '../../../../helpers'




export function CourseCard({ data = {} }) {



  return (

    <div className="card course-card  mb-4" onClick={()=>history.push(`/course/detail/${data?.id}`)}>
      <img src="https://s3.ap-south-1.amazonaws.com/guvi-2.0/course-thumbnail/python.png" className="card-img-top" alt="course" />
      <div className="card-body">
        <h5 className="card-title">{data?.courseName}</h5>
        <div className="text-muted mt-2 mb-2 w-100">
          <p className="d-inline me-2"><i class="fa-solid fa-clock"></i> {data?.overAllTime}</p>
          <p className="d-inline me-2"><i class="fa-solid fa-indian-rupee-sign"></i> {data?.fees}</p>
        </div>
        <h3 class="d-flex align-items-start font-weight-bold view-detail-text pt-2">View Detail</h3>
      </div>
    </div>

  );
}

