import { NormalAccordion } from '../../../../common';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import {couserDetailObjList} from '../../../../../assets/data/courseDetail'
import './courseContent.scss'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export function CourseContent({courseContent=[]}) {

    

    const renderClassList = (data) => {
        return (
            data?.map(({ name,topic=[] }, i) =>

                <ul class="list-group list-group-flush class-list">
                    <li class="list-group-item bg-transparent">
                        <div class="d-flex">
                            <div class="flex-shrink-0 day-list">
                                <h5 class="mb-1 text-center">Topic</h5>
                                <h5 class="mb-1 text-center">{i + 1}</h5>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                {topic?.map(({ name }, t) =>
                                    <p class="mb-1" > {t + 1})  {name}</p>
                                )}

                                {/* <p class="mb-1">2) {name}</p> */}
                            </div>
                        </div>
                        {/* <div class="d-flex w-100 justify-content-between">
                          
                            <small className='float-end'>days 1</small>
                        </div>
                        <p class="mb-1">{name}</p>
                        <p class="mb-1">{name}</p> */}

                    </li>

                </ul>
            )

        )

    }


    return (
        <NormalAccordion data={courseContent}
            renderData={renderClassList}
        />
    );
}

