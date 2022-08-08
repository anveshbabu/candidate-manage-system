import { NormalAccordion } from '../../../../common';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import './courseContent.scss'

export function CourseContent() {


    const data = [
        {
            title: "Course Content",
            data: [
                {
                    name: "Course Introduction"
                },
                {
                    name: "Application Development Life Cycle"
                }
            ]
        }
    ]

    const renderClassList = (data) => {
        return (
            data.map(({ name }, i) =>

                <ul class="list-group list-group-flush class-list">
                    <li class="list-group-item bg-transparent">
                        <div class="d-flex">
                            <div class="flex-shrink-0 day-list">
                            <h5 class="mb-1 text-center">Day</h5>
                            <h5 class="mb-1 text-center">{i + 1}</h5>
                            </div>
                            <div class="flex-grow-1 ms-3">
                            <p class="mb-1"> 1)  {name}</p>
                            <p class="mb-1">2) {name}</p>
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
        <NormalAccordion data={data}
            renderData={renderClassList}
        />
    );
}

