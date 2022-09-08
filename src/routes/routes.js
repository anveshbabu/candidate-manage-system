
const routers = [

  {
    component: 'AuthLayout',
    path: '/login',
    auth: false,
    exact: false,
    childrens: [
      // {
      //   component: "Course",
      //   path: "/",
      //   auth: false,
      //   exact: true,
      // },
      {
        component: "Login",
        path: "/",
        auth: false,
        exact: true,
      },
    ]
  },
  {
    component: 'Adminlayout',
    path: '/',
    auth: false,
    exact: false,
    childrens: [
     {
        component: "Course",
        path: "/",
        auth: false,
        exact: true,
      },
    ]
  },
  
  {
    component: "Adminlayout",
    path: "/dashboard",
    redirect: "/",
    auth: false,
    exact: true,
    childrens: [
      {
        component: "Dashboard",
        path: "/",
        auth: false,
        exact: true
      }
    ]
  },

  {
    component: "Adminlayout",
    path: "/course",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Course",
        path: "/",
        auth: false,
        exact: true
      },
      {
        component: "CourseDetail",
        path: "/detail/:courseId",
        auth: false,
        exact: true
      }

    ]
  },

  {
    component: "Adminlayout",
    path: "/batche",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Batche",
        path: "/",
        auth: false,
        exact: true
      }, {
        component: "Candidate",
        path: "/:batchId/candidate",
        auth: false,
        exact: true
      }, {
        component: "CandidateAttendance",
        path: "/:batchId/candidate/attendance",
        auth: false,
        exact: true
      }

    ]
  },

  {
    component: "Adminlayout",
    path: "/user",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Users",
        path: "/",
        auth: false,
        exact: true
      }

    ]
  },


  {
    component: "Adminlayout",
    path: "/candidate",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Candidate",
        path: "/",
        auth: false,
        exact: true
      }

    ]
  },


  {
    component: "CandidateIndividualForm",
    path: "/candidateIndividual",
    auth: false,
    exact: false,
   
  },







  //dev layout

  {
    component: "Adminlayout",
    path: "/devLayout",
    redirect: "/devLayout/components/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "commonComponentsExample",
        path: "/",
        auth: false,
        exact: true
      }
    ]
  }



];
export default routers;

