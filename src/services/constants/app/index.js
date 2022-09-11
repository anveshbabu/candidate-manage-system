

export const EXIST_LOCAL_STORAGE = {
    AUTHTOKEN: 'AuthToken',
    USER_ID: 'userId',
    IS_KEEP_ME: 'isKeepMe',
    THEME_MODE: 'themeMode',
    BATCH_CANDIDATE_LIST: 'batchCandidateList',
    ATTENDANCE_CANDIDATE: 'attendanceCandidate',

}


export const CONFIG = {
    API_URL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL,
}

export const STATUS = {
    ACTIVE: 'active',
    IN_ACTIVE: 'inactive',
    DELETED: 'deleted'
}

export const CURRENT_USER = 'currentUserObj';

export const CANDIDATE_COURSE_STATUS = [
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Hold', label: 'Hold' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Discontinued', label: 'Discontinued' },
];



export const COURSE_TRAINER = [
    { value: 'Anvesh babu', label: 'Anvesh babu' },
    { value: 'Arun', label: 'Arun' },
];

export const WEEK_LIST = [
    { value: 0, label: 'Sun'},
    { value: 1, label: 'Mon'},
    { value: 2, label: 'Tue'},
    { value: 3, label: 'Wed'},
    { value: 4, label: 'Thu'},
    { value: 5, label: 'Fri'},
    { value: 6, label: 'Sat'},
]

export const COURSE_LIST = [
    { value: 'Full stack', label: 'Full stack', courseDuration: 75 },
    { value: 'Front end', label: 'Front end', courseDuration: 45 },
    { value: 'React JS', label: 'React JS', courseDuration: 30 },
    { value: 'Java Script', label: 'Java Script', courseDuration: 20 },
    { value: 'Angular', label: 'Angular', courseDuration: 30 },
    { value: 'Node js', label: 'Node js', courseDuration: 25 },
    { value: 'Android', label: 'Android' },
    { value: 'Ios', label: 'Ios' },
    { value: 'React Native', label: 'React Native', courseDuration: 30 },
]

export const CLASS_TYPE = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
]

export const YES_NO = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
]                                                                                                                                                                                                                                                                                                                                                                                      

export const INSTITUTE_BRANCH = [
    { value: 'Perumbakam', label: 'Perumbakam' },
    { value: 'Mugelavakam', label: 'Mugelavakam' },
    // { value: 'Tambaram', label: 'Tambaram' },
    // { value: 'Tambaram', label: 'Tambaram' },
    { value: 'Adyar', label: 'Adyar' },
    { value: 'Thoraipakkam', label: 'Thoraipakkam' },
    { value: 'Tambaram', label: 'Tambaram' },
    { value: 'Navalur', label: 'Navalur' },
    { value: 'Porur', label: 'Porur' },
    { value: 'Perumbakkam', label: 'Perumbakkam' },
    { value: 'Anna Nagar', label: 'Anna Nagar' },
    { value: 'West Tambaram', label: 'West Tambaramr' },
];



export const DB_NAME = {
    BATCH: 'batch',
    USER: 'user',
    ATTENDANCE: "attendance",
    ACCOUNT: "account"
}

export const USER_TYPE = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'User' },
];

export const ATTENDANCE = {
    PRESENT: "P",
    ABSENT: "A",
    LEAVE: "L",
}

export const ALL_BG_PLACEHOLDERS = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', ' bg-light', 'bg-dark']


