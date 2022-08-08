import { useState } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { CourseWhatYouLearn,CourseContent } from '../../../components/pages'


export function CourseDetail() {



    return (
        <div>
            <NormalBreadcrumb label=' HTML & CSS' />
            <div className="container">
            <div className="row">
                <div className="col-md-8 col-sm-12 mb-4">
                    <CourseWhatYouLearn />
                </div>
                <div className="col-md-8 col-sm-12">
        

                    <CourseContent/>
                </div>
            </div>
            </div>
           





        </div>
    );
}

