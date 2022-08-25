
// import './overAllCountCard.scss'
import { COURSE_LIST } from '../../../../services/constants'
import moment from "moment";
export const ExtendedDaysCandidate = ({ extendedDayCandList = [], usersList = [] }) => {

    const handleStatusCount = (candidate = [], status) => {
        let count = candidate?.filter((data) => data?.status === status)?.length

        return count ? count : 0;

    };

    const handleExtendDateCount = (joinDate, course) => {

        var date = moment(joinDate, "YYYY-MM-DD");
        var current = moment();
        var diff = current.diff(date, 'days');
        let courseDuration = COURSE_LIST.find(({ value }) => value === course)?.courseDuration;
        if (courseDuration < diff) {

            return diff - courseDuration;

        } else {
            return 0;
        }

    };

    const handleGetUserName = (trainer) => {
        try {
            let { first_name = '', last_name = '' } = usersList.find(({ id }) => id === trainer);

            return `${first_name} ${last_name}`;
        } catch (e) {

        }



    }


    return (
        <div className={`card `}>
            <div className="card-header">
                <h5 className='card-title mb-0'>Extended Days Candidate</h5>
            </div>
            <div className="card-body pt-0">
                <div className="row ">
                    <div className='col-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">join Date</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Trainer</th>
                                    <th scope="col">Extended Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extendedDayCandList?.map(({ name, phone, course, joinDate, trainer }, i) =>
                                    handleExtendDateCount(joinDate, course) > 0 &&
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{name}</td>
                                        <td>{phone}</td>
                                        <td>{joinDate}</td>
                                        <td>{course}</td>
                                        <td>{handleGetUserName(trainer)}</td>
                                        <td>{handleExtendDateCount(joinDate, course)}</td>
                                    </tr>
                                )}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )


}