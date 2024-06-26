import moment from "moment"
export const joinedCoursesObj = {
    course: '',
    status: '',
    courseStartDate: moment().format('YYYY-MM-DD'),
    classTime: moment().format('HH:MM'),
    settlementStatus: 'No',
    classType: '',
    fees: null,
    pendingFees: null,
    trainer:'Anvesh babu',
    instituteBranch:"",
    billMonth: '',
    classDays:[1,2,3,4,5],
    branchIncharge:""
}

export const candidateFormObj = {
    name: "",
    email: '',
    phone: null,
    joinDate: moment().format('YYYY-MM-DD'),
    joinedCourses: [
        {...joinedCoursesObj}
    ],
    createdBy: {
        userId: '',
        date: new Date().toISOString(),
        name:''
    },
    updatedBy: {
        userId: '',
        date: '',
        name:''
    }
}

