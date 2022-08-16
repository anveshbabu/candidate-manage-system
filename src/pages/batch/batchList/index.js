import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs, Normalselect } from '../../../components/common'
import { BatchCard } from '../../../components/pages'

import { getBatchListWithCandidate } from '../../../api/masters';
import { getAllUser } from '../../../api/user';
import { ALL_BG_PLACEHOLDERS, CURRENT_USER } from '../../../services/constants'


export function Batche() {
    const [selectedTab, setSelectedTab] = useState('Active Batch');
    const [usersList, setUsersList] = useState([]);
    const tabData = ['Active Batch', 'In Active'];
    const [batchTimingList, setBatchTimingList] = useState([]);
    const [isFormLoader, setIsFormLoader] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    //onlode call
    useEffect(() => {
        let {userId='',user_type} = JSON.parse(localStorage.getItem(CURRENT_USER));
        setIsAdmin(user_type ===1)
        setSelectedUserId(userId)
        handleGetBatchList(userId);
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

    const handleGetBatchList = (userId) => {
        try {
            setIsFormLoader(true)
            let req={
                userId
            }
            getBatchListWithCandidate(req).then((data) => {
                setBatchTimingList(data);
                setIsFormLoader(false)

            }).catch((error) => {

                setIsFormLoader(false)

            });

        } catch (e) {

        }
    };

const handleUserChange=(e)=>{
    setSelectedUserId(e?.target?.value);
    handleGetBatchList(e?.target?.value)

}


    return (
        <div>
            <NormalBreadcrumb label='Batches' />
            <div className="row mb-3">
             {isAdmin && <div className="col-md-3 offset-md-9">
                    <Normalselect size="small" label='users' disabled={usersList?.length === 0} value={selectedUserId} options={usersList} onChange={handleUserChange}/>
                </div>}
                <div className="col-md-12">
                    <Normaltabs data={tabData} onChange={handleTabChange} />
                </div>

            </div>

            <div className="row">
                {!isFormLoader && batchTimingList?.map((data) =>
                    data?.batchData?.length > 0 && !!data?.batchData?.find(({ status }) => status.includes("Processing")) && selectedTab == 'Active Batch' ?
                        <div className="col-md-3 col-sm-6 col-12">
                            <BatchCard data={data} />
                        </div> : data?.batchData?.length > 0 && !data?.batchData?.find(({ status }) => status.includes("Processing")) && selectedTab !== 'Active Batch' && <div className="col-md-3 col-sm-6 col-12">
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

