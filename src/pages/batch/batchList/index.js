import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs, Normalselect } from '../../../components/common'
import { BatchCard } from '../../../components/pages'

import { getBatchListWithCandidate } from '../../../api/masters';
import { getAllUser } from '../../../api/user';
import { ALL_BG_PLACEHOLDERS, CURRENT_USER, WEEK_LIST } from '../../../services/constants'


export function Batche() {
    const [selectedTab, setSelectedTab] = useState('Active Batch (0)');
    const [usersList, setUsersList] = useState([]);
    const [tabData, setTabData] = useState([`Active Batch (0)`, 'In Active (0)']);
    const [batchTimingList, setBatchTimingList] = useState([]);
    const [InActiveBatchTimeList, setInActiveBatchTimeList] = useState([]);
    const [isFormLoader, setIsFormLoader] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [filterObj, setFilterObj] = useState({
        userId: "",
        classDay: new Date().getDay()
    })

    //onlode call
    useEffect(() => {
        let { userId = '', user_type } = JSON.parse(localStorage.getItem(CURRENT_USER));
        setIsAdmin(user_type === 1)
        let filterNewObj = {
            ...filterObj,
            userId
        }
        setFilterObj(filterNewObj)
        handleGetBatchList(filterNewObj);
        handleUserList();
    }, [])

    const handleTabChange = (i) => {
        setSelectedTab(tabData[i]);
        // handleGetList(tabData[i])

    };

    const handleUserList = () => {
        try {
            setIsFormLoader(true);

            getAllUser().then((data) => {
                setIsFormLoader(false);
                if (data?.length > 0) {
                    let users = data.map(({ first_name, last_name, id }) => ({ label: `${first_name} ${last_name}`, value: id }))
                    setUsersList(users);
                }
            })
                .catch((error) => {
                    setIsFormLoader(false);
                });
        } catch (e) {
            setIsFormLoader(false);
        }
    };

    const handleGetBatchList = (req) => {
        try {
            setIsFormLoader(true)
            // let req = {
            //     userId
            // }
            getBatchListWithCandidate(req).then(({ InActiveBatchTimeList, batchTimeList, inActiveCandCount = 0, activeCandCount = 0 }) => {

                setTabData([`Active Batch (${activeCandCount})`, `In Active (${inActiveCandCount})`])
                setSelectedTab(`Active Batch (${activeCandCount})`)
                setBatchTimingList(batchTimeList);
                setInActiveBatchTimeList(InActiveBatchTimeList)
                setIsFormLoader(false)

            }).catch((error) => {

                setIsFormLoader(false)

            });

        } catch (e) {

        }
    };

    const handleUserChange = (e) => {
        let {value,name}=e.target;
        let filterNewObj = {
            ...filterObj,
            [name]:value
        }
        console.log('filterNewObj----------->',filterNewObj)
        setFilterObj(filterNewObj)
        handleGetBatchList(filterNewObj)

    }

    // handleFilterChange


    return (
        <div>
            <NormalBreadcrumb label='Batches' />

            <div className="row mb-3">
                <div className="col-md-3 offset-md-6">
                    <Normalselect size="small" label='Class Day' value={filterObj?.classDay} name='classDay' options={WEEK_LIST} onChange={handleUserChange} />
                </div>
                {isAdmin && <div className="col-md-3">
                    <Normalselect size="small" label='users' disabled={usersList?.length === 0} name='userId' value={filterObj?.userId} options={usersList} onChange={handleUserChange} />
                </div>}
                <div className="col-md-12">
                    <Normaltabs data={tabData} onChange={handleTabChange} />
                </div>

            </div>

            <div className="row">
                {/* {!isFormLoader && batchTimingList?.map((data) =>
                    data?.batchData?.length > 0 && !!data?.batchData?.find(({ status }) => status.includes("Processing")) && selectedTab == 'Active Batch' ?
                        <div className="col-md-3 col-sm-6 col-12">
                            <BatchCard data={data} />
                        </div> : data?.batchData?.length > 0 && !data?.batchData?.find(({ status }) => status.includes("Processing")) && selectedTab !== 'Active Batch' && <div className="col-md-3 col-sm-6 col-12">
                            <BatchCard data={data} />
                        </div> */}
                {!isFormLoader && selectedTab == tabData[0] && batchTimingList?.map((data) =>
                    data?.batchData?.length > 0 &&
                    <div className="col-md-3 col-sm-6 col-12">
                        <BatchCard data={data} />
                    </div>
                )}

                {!isFormLoader && selectedTab !== tabData[0] && InActiveBatchTimeList?.map((data) =>
                    data?.batchData?.length > 0 &&
                    <div className="col-md-3 col-sm-6 col-12">
                        <BatchCard data={data} />
                    </div>
                )}


                {isFormLoader && ALL_BG_PLACEHOLDERS?.map((data) =>

                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="card batch-card  mb-4" >
                            <div className="card-header">
                                <h5 class="card-title placeholder-glow">
                                    <span class={`placeholder col-6 ${data}`}></span>
                                </h5>
                            </div>
                            <div className="card-body">
                                <table className="table placeholder-glow">
                                    <tbody>
                                        <tr>
                                            <td>  <span class={`placeholder col-7 ${data}`}></span></td>
                                        </tr>
                                        <tr>

                                            <td>  <span class={`placeholder col-5 ${data}`}></span></td>
                                        </tr>
                                        <tr>
                                            <td>  <span class={`placeholder col-3 ${data}`}></span></td>
                                        </tr>
                                        <tr>

                                            <td><span class={`placeholder col-7 ${data}`}></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                )}
            </div>


        </div>


        // </div>
    );
}

