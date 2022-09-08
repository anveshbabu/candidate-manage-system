import { useState,useEffect } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { CourseWhatYouLearn, CourseContent } from '../../../components/pages'
import { useParams } from "react-router-dom";
import {couserDetailObjList} from '../../../assets/data/courseDetail'

export function CourseDetail() {
    const [courseContent,setCourseContent]=useState([]);
    const [comboCourseContent,setComboCourseContent]=useState([]);
    const [tabData,setTabData]=useState([]);
    const [selectedTab, setSelectedTab] = useState('Processing');
    const params = useParams();
 
    
    useEffect(()=>{
        let courseContent =couserDetailObjList.find(({id})=>id === params?.courseId);
    
        setCourseContent(courseContent)
        if(courseContent?.isCombo){
           let overAllDetail= couserDetailObjList.filter(({mapId=[]})=>mapId.includes(courseContent?.id));
           let tabList =comboCourseContent.map(({courseName})=>courseName);
           let selectedCourse =couserDetailObjList.find(({id})=>id === overAllDetail[0]?.id);
           setCourseContent(selectedCourse)
           setSelectedTab(tabList[0])
           setTabData(tabList)

           setComboCourseContent(overAllDetail)
           console.log('overAllDetail',overAllDetail)

        }else{
           
        }
        




    },[])
    
    const handleTabChange = (i) => {
        let selectedCourse =couserDetailObjList.find(({id})=>id === comboCourseContent[i]?.id);
        setCourseContent(selectedCourse)
        setSelectedTab(tabData[i]);
        // handleGetList(tabData[i])
    
      };

    return (
        <div>
            <NormalBreadcrumb label={courseContent?.courseName}/>
            <div className="">
                <div className="row">
                <div className="col-md-8 col-sm-12 mb-4">
                    <Normaltabs data={comboCourseContent.map(({courseName})=>courseName)} onChange={handleTabChange}/>
                    </div>
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

