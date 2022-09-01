import { useEffect, useState } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { CourseCard } from '../../../components/pages'
import { couserDetailObjList } from '../../../assets/data/courseDetail'
import { getStorage, isEmpty } from '../../../services/helperFunctions'
import { CURRENT_USER } from '../../../services/constants'
export function Course() {
    const [selectedTab, setSelectedTab] = useState('Course Library');
    const courseDataList = couserDetailObjList;
    const tabData = ['Course Library', 'Combo'];
    const [isAuth, setIsAuth] = useState(false);

    const handleTabChange = (i) => {
        setSelectedTab(tabData[i]);
        // handleGetList(tabData[i])

    };
    useEffect(() => {
        if(!!getStorage(CURRENT_USER)){
            let isAuth = !isEmpty(JSON.parse(getStorage(CURRENT_USER)));
            setIsAuth(isAuth)
        }
   
    }, [])

    return (
        <div>
            <NormalBreadcrumb label={isAuth ? 'Courses' : "Greens Technology Courses "} />

            <div className="row mb-3">
                <div className="col-md-12">
                    <Normaltabs data={tabData} onChange={handleTabChange} />

                </div>

            </div>
            <div className="row">

                {courseDataList?.map((data) =>
                    selectedTab === 'Course Library' && !data?.isCombo ?
                        <div className="col-md-3 col-sm-6 col-12">
                            <CourseCard data={data} />
                        </div> : data?.isCombo && <div className="col-md-3 col-sm-6 col-12">
                            <CourseCard data={data} />
                        </div>
                )}

            </div>
        </div>
    );
}

