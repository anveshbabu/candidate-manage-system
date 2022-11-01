
// import './overAllCountCard.scss'
import { useEffect, useState } from 'react'
import { INSTITUTE_BRANCH, USER_ROLE } from '../../../../services/constants'
import { userGetByRole } from '../../../../services/helperFunctions'

export const TrainerWiseStatusCount = ({ overAllCandidateList = [], usersList = [] }) => {
    const [trainerList, setTrainerList] = useState()
    const [trainerCandCountList, setTrainerCandCountList] = useState([])
    useEffect(() => {
        let trinerList = userGetByRole(usersList, USER_ROLE.TRAINER)
        trinerList = trinerList?.map(({ first_name, last_name, userId, user_type }) => ({ label: `${first_name} ${last_name}`, value: userId, user_type }));
        setTrainerList(trinerList)

        let statusList = trinerList.map(({ value, label }) => ({
            data: overAllCandidateList.filter(({ trainerIDs }) => trainerIDs.includes(value)),
            label,
            overAllCount: overAllCandidateList.filter(({ trainerIDs }) => trainerIDs.includes(value))?.length

        }))
        setTrainerCandCountList(statusList)

    }, [usersList, overAllCandidateList]);


    const handleStatusCount = (candidate = [], type) => {
        // console.log('candidate-------->',candidate)
        let count = candidate?.filter(({ status }) => status.includes(type))?.length

        return count ? count : 0;

    };

    const handleSettlementCount = () => {
        return 0
    }


    return (
        <div className={`card dashboard-card `}>
            <div className="card-header">
                <h5 className='card-title mb-0'>Trainer Wise Details</h5>
            </div>
            <div className="card-body pt-0">
                <div className="row ">
                    <div className='col-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Trainer Name</th>
                                    <th scope="col">Processing</th>
                                    <th scope="col">Yet To Start </th>

                                    <th scope="col">Completed</th>
                                    <th scope="col">Hold</th>
                                    <th scope="col">Discontinued</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainerCandCountList?.map(({ label, data = [], overAllCount }, i) =>
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{label}</td>
                                        <td>{handleStatusCount(data, 'Processing')}</td>
                                        <td>{handleStatusCount(data, 'Yet to start')}</td>
                                        <td>{handleStatusCount(data, 'Completed')}</td>

                                        <td>{handleStatusCount(data, 'Hold')}</td>
                                        <td>{handleStatusCount(data, 'Discontinued')}</td>
                                        <td>{overAllCount}</td>
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