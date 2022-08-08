
const routers = [

  {
    component: 'AuthLayout',
    path: '/',
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Login",
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
        path: "/detail",
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

