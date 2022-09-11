import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs, Normalselect } from '../../../components/common'
import { AccountForm } from '../../../components/pages'

import { getBatchListWithCandidate } from '../../../api/masters';
import { getAllUser } from '../../../api/user';
import { ALL_BG_PLACEHOLDERS, CURRENT_USER, WEEK_LIST } from '../../../services/constants'


export function AccountDetail() {




    return (
        <div>
            <NormalBreadcrumb label='Accounts Detail' />


            <div className="row mt-5">
                <div className="col-md-12">

                    <AccountForm />




                </div>
            </div>
        </div>



    );
}

