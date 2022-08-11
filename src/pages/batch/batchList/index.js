import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { BatchCard } from '../../../components/pages'

import { getBatchListWithCandidate } from '../../../api/masters';


export function Batche() {
    const [selectedTab, setSelectedTab] = useState('Course Library');
    // const courseDataList = courseData.data;
    const tabData = ['Active Batch', 'In Active'];
    const [batchTimingList, setBatchTimingList] = useState([]);

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
            getBatchListWithCandidate().then((data) => {
               
                // console.log('data------------>',JSON.stringify(data))
                setBatchTimingList(data)

            }).catch((error) => {
                // setFormLoader(false);

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
                {batchTimingList?.map((data) =>
                data?.batchData?.length > 0 &&
                    <div className="col-md-3 col-sm-6 col-12">
                        <BatchCard data={data}/>
                    </div>
                )}


            </div>


        </div>
    );
}

