
// import './overAllCountCard.scss'
import { INSTITUTE_BRANCH, YES_NO } from '../../../../services/constants'

export const InstituteWiseEnrollCountCard = ({ branchCandList = [] }) => {

    const handleStatusCount = (candidate = [], status) => {
        let count = candidate?.filter((data) => data?.status === status)?.length

        return count ? count : 0;

    };

    const handleSettlementCount = (candidate = [], status) => {

        let settlementCount = 0, complitedCount = 0;

        candidate?.map(({ settlementStatus = '', status }) => {

            if (settlementStatus === 'No' && status === 'Completed') {
                settlementCount++
            }
            if (status === 'Completed') {
                complitedCount++;
            }

        });
        return settlementCount ? `${settlementCount}/${complitedCount}` :`${settlementCount}/${complitedCount}`;

    }


    return (
        <div className={`card `}>
            <div className="card-body">
                <div className="row ">
                    <div className='col-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Pending</th>

                                    <th scope="col">Completed</th>
                                    <th scope="col">Hold</th>
                                    <th scope="col">Discontinued</th>
                                    <th scope="col">Settlement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchCandList?.map(({ branch, data = [] }, i) =>
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{branch}</td>
                                        <td>{handleStatusCount(data, 'Processing')}</td>
                                        <td>{handleStatusCount(data, 'Completed')}</td>
                                        <td>{handleStatusCount(data, 'Hold')}</td>
                                        <td>{handleStatusCount(data, 'Discontinued')}</td>
                                        <td>{handleSettlementCount(data)}</td>
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