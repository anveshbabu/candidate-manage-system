import React, { Fragment } from "react";
import './primary.scss';
import { Header } from './header'
import { Sidebar } from './sideBar'
import {Outlet } from "react-router-dom";
export const Adminlayout = ({ children }) => {



    return (
        <Fragment>
            <Header />
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">

                    <section className="container-fluid mt-4">
                        <Outlet />

                    </section>

                </div>
            </div>
        </Fragment>

    )


}