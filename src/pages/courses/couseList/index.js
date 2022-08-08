import { useState } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { CourseCard } from '../../../components/pages'

import courseData from '../../../assets/data/db.json'

export function Course() {
    const [selectedTab, setSelectedTab] = useState('Course Library');
    const courseDataList = courseData.data;
    const tabData = ['Course Library', 'Combo'];


    const handleTabChange = (i) => {
        setSelectedTab(tabData[i]);
        // handleGetList(tabData[i])

    };


    return (
        <div>
            <NormalBreadcrumb label='Courses' />

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
                    </div>:data?.isCombo && <div className="col-md-3 col-sm-6 col-12">
                        <CourseCard data={data} />
                    </div>
                )}

            </div>
        </div>
    );
}

