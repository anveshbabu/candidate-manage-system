
import './extendedDaysCandidate.scss'
export const ExtendedDaysCandidate = ({ extendedDayCandList = [], usersList = [],componentType='extendedDayCandList' }) => {





    const handleGetUserName = (trainer) => {
        try {
            let { first_name = '', last_name = '' } = usersList.find(({ id }) => id === trainer);

            return `${first_name} ${last_name}`;
        } catch (e) {

        }



    }


    return (
        <div className={`card dashboard-card`}>
            <div className="card-header">
                <h5 className='card-title mb-0'>{componentType==='extendedDayCandList'?'Extended Days':"Hold | Pending | Yet To Start"} Candidate</h5>
            </div>
            <div className="card-body pt-0 ">
              {extendedDayCandList?.length>0 ? <div className="row ">
                    <div className='col-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">join Date</th>
                                    <th scope="col">Course</th>
                                    {componentType ==="yetToStartList" &&   <th scope="col">Status</th>}
                                    <th scope="col">Trainer</th>
                                    {componentType==='extendedDayCandList' &&  <th scope="col">Extended Days</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {extendedDayCandList?.map(({ name, phone,status, course,joinDate, courseStartDate, trainer, extendDays, joinedCourses = [] }, i) =>
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{name}</td>
                                        <td>{phone}</td>
                                        <td>{componentType==='extendedDayCandList'? courseStartDate:joinDate}</td>
                                        <td>{course}</td>
                                        {componentType === "yetToStartList" &&   <td>{status}</td>}
                                        <td>{handleGetUserName(trainer)}</td>
                                        {componentType==='extendedDayCandList'&&   <td>{extendDays}</td>}
                                    </tr>
                                )}


                            </tbody>
                        </table>
                    </div>
                </div>:
                <div className='nodate-image'>
                    <div className='image-wrap'>
                    <img src={require('../../../../assets/images/noData.png')} />
                    </div>
                  
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>No data found</h4>
                        </div>
                    </div>

                </div>}
            </div>
        </div>
    )


}