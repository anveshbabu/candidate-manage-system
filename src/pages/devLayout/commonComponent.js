import React from "react";
import { NormalButton, NormalInput, NormaltextArea, Normalselect, NormalCheckbox, NormalRadioButtion, NormalTable } from '../../components/common'


export class commonComponentsExample extends React.Component {

    state = {
        columnData: [
            {
                field: "name",
                label: "Name"
            },
            {
                field: "age",
                label: "Age"
            },
            {
                field: "dob",
                label: "DOB"
            },
            {
                field: "email",
                label: "Email"
            }],
        rowData: [{
            name: "Anvesh",
            age: 25,
            dob: '17/11/1996',
            email: "kb.anvesh1996@gmail.com"
        }]
    }

    render() {
        let { columnData,rowData } = this.state;
        return (
            <div>
                <h4 className="page-titel mb-4">
                    Example
                </h4>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <h4>Form controls</h4>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <NormalInput label='Email address' />
                                    </div>
                                    <div className="col-md-6">
                                        <NormalInput label='Phone number' />
                                    </div>
                                    <div className="col-md-12">
                                        <NormaltextArea label='Comments' />
                                    </div>
                                    <div className="col-md-12">
                                        <Normalselect label='Select Age' />
                                    </div>
                                    <div className="col-md-12">
                                        <NormalCheckbox label='Select Age' />
                                    </div>
                                    <div className="col-md-12">
                                        <NormalRadioButtion label='Select Age' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <NormalButton label="submit" />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Form controls</h4>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <NormalInput label='Email address' materialUi={false} />
                                    </div>
                                    <div className="col-md-6">
                                        <NormalInput label='Phone number' materialUi={false} />
                                    </div>
                                    <div className="col-md-12">
                                        <NormaltextArea label='Comments' materialUi={false} />
                                    </div>
                                    <div className="col-md-12">
                                        <Normalselect label='Select Age' materialUi={false} />
                                    </div>
                                    <div className="col-md-12">
                                        <NormalCheckbox label='Select Age' materialUi={false} />
                                    </div>
                                    <div className="col-md-12">
                                        <NormalRadioButtion label='Select Age' materialUi={false} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <NormalButton label="submit" materialUi={false} />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <NormalTable
                                    columnData={columnData}
                                    rowData={rowData}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
