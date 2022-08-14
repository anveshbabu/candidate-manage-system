import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { BatchCard } from '../../../components/pages'

import { getBatchListWithCandidate } from '../../../api/masters';
import { ALL_BG_PLACEHOLDERS } from '../../../services/constants'


export function Batche() {
    const [selectedTab, setSelectedTab] = useState('Active Batch');
    // const courseDataList = courseData.data;
    const tabData = ['Active Batch', 'In Active'];
    const [batchTimingList, setBatchTimingList] = useState([]);
    const [isFormLoader, setIsFormLoader] = useState(false);

    //onlode call
    useEffect(() => {
        handleGetBatchList();
    }, [])

    const handleTabChange = (i) => {
        setSelectedTab(tabData[i]);
        // handleGetList(tabData[i])

    };

    const handleGetBatchList = () => {
        try {
            setIsFormLoader(true)
            getBatchListWithCandidate().then((data) => {
                setBatchTimingList(data);
                setIsFormLoader(false)

            }).catch((error) => {
    
                setIsFormLoader(false)

            });

        } catch (e) {

        }
    }
    return (
        <div>
            <NormalBreadcrumb label='Batches' />
            <div className="row mb-3">
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

                                            <td>  <span  class={`placeholder col-5 ${data}`}></span></td>
                                        </tr>
                                        <tr>
                                            <td>  <span  class={`placeholder col-3 ${data}`}></span></td>
                                        </tr>
                                        <tr>

                                            <td><span  class={`placeholder col-7 ${data}`}></span></td>
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

