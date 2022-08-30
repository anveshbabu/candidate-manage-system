import { useState,useEffect } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { CourseWhatYouLearn, CourseContent } from '../../../components/pages'
import { useParams } from "react-router-dom";
import {couserDetailObjList} from '../../../assets/data/courseDetail'
export function CourseDetail() {
    const [courseContent,setCourseContent]=useState([]);
    const params = useParams();
    
    
    useEffect(()=>{
        let courseContent =couserDetailObjList.find(({id})=>id === params?.courseId);
        console.log('courseContent------------->',courseContent)
        setCourseContent(courseContent)
    
    },[])
    


    return (
        <div>
            <NormalBreadcrumb label={courseContent?.courseName}/>
            <div className="">
                <div className="row">
                    <div className="col-md-8 col-sm-12 mb-4">
                        <div className="row">

                            <div className="col-md-12 col-sm-12">

                                <CourseWhatYouLearn courseContent={courseContent}/>
                                <CourseContent  courseContent={[courseContent]}/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-4 col-sm-12">


                        {/* <CourseContent /> */}
                    </div>
                </div>
            </div>






        </div>
    );
}

