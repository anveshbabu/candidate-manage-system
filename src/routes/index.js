import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter 
} from "react-router-dom";
import routers from "./routes";

import * as Layout from "../layout";
import * as Pages from "../pages";
import { history } from "../helpers";



class AllRoutes extends Component {


  render() {

    return (
      <HistoryRouter  history={history}>
        <Routes>

          {
            routers.map(({
              component,
              redirect,
              path,
              exact = false,
              auth = true,
              childrens = []
            }) => {
              if (childrens.length > 0) {
                const LayoutComponent = Layout[component];
                return (
                  <Route
                    path={path}
                    exact={exact}
                    key={path}
                    element={< LayoutComponent />
                    }>
                    {childrens.map((
                      {
                        component: ChildrenComponent,
                        path: childrenPath,
                        exact = false,
                        auth = true,
                        index
                      }
                    ) => {
                      let PageComponent = Pages[ChildrenComponent];
                      return (
                        <Route
                        path={path + childrenPath}
                          key={path + childrenPath}
                          element={<PageComponent />}
                        />
                      )
                    }

                    )}



                  </Route>
                )
              } else {
                let PageComponent = Pages[component];
                return (
                  <Route
                    path={path}
                    exact={exact}
                    key={path}
                    element={<PageComponent />}

                  />
                )
              }

            })
          }


        </Routes>

      </HistoryRouter >
    );
  }
}

export default AllRoutes;
