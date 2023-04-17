import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails, getCandidateWeekOff } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { COURSE_LIST, INSTITUTE_BRANCH } from '../../services/constants'
import { isEmpty } from '../../services/helperFunctions'
import { Toast } from '../../services/toast';
import moment from "moment";


export const getSummaryCandidate = (body, isBatch = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate")));
                // const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate")));

                let summaryCounts = {}, data = [], extendedDayCandList = [], yetToStartList = [];
                let weekCount = 0, monthSummary = 0, lastThreeMonthSUmmary = 0;
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const weekStart = moment().startOf('week');
                    const weekEnd = moment().endOf('week');
                    const startOfMonth = moment().startOf('month');
                    const endOfMonth = moment().endOf('month');
                    const lastThreeStartOfMonth = moment().subtract(2, 'months').startOf('month');
                    // let isWeekSummary = doc.data().joinedCourses.filter(({ courseStartDate }) => moment(courseStartDate, 'YYYY-MM-DD').isBetween(weekStart, weekEnd));
                    // let isMonthSummary = doc.data().joinedCourses.filter(({ courseStartDate }) => moment(courseStartDate, 'YYYY-MM-DD').isBetween(startOfMonth, endOfMonth));
                    // let lastThreeMonthSummary = doc.data().joinedCourses.filter(({ courseStartDate }) => moment(courseStartDate, 'YYYY-MM-DD').isBetween(lastThreeStartOfMonth, endOfMonth));
                    let isWeekSummary = doc.data().joinDate ? moment(doc.data().joinDate, 'YYYY-MM-DD').isBetween(weekStart, weekEnd) : "";
                    let isMonthSummary = doc.data().joinDate ? moment(doc.data().joinDate, 'YYYY-MM-DD').isBetween(startOfMonth, endOfMonth) : "";
                    let lastThreeMonthSummary = doc.data().joinDate ? moment(doc.data().joinDate, 'YYYY-MM-DD').isBetween(lastThreeStartOfMonth, endOfMonth) : "";

                    if (isWeekSummary) {
                        weekCount++
                    };
                    if (isMonthSummary) {
                        console.log('isMonthSummary------------>', isMonthSummary)
                        monthSummary++
                    };
                    if (lastThreeMonthSummary) {
                        lastThreeMonthSUmmary++
                    }
                    data.push({ ...doc.data(), id: doc.id, });
                    summaryCounts = { weekCount, monthSummary, lastThreeMonthSUmmary, overAllSummary: querySnapshot?.size };
                    let avilStatus = doc.data().joinedCourses.find(({ status }) => status == 'Processing');
                    // console.log('avilStatus----------->', avilStatus)
                    if (!!avilStatus) {
                        var date = moment(avilStatus?.courseStartDate, "YYYY-MM-DD");
                        var current = moment();
                        var diff = current.diff(date, 'days');
                        let courseDuration = COURSE_LIST.find(({ value }) => value === avilStatus?.course)?.courseDuration;
                        let extendDays = (diff - getCandidateWeekOff(date, diff, [avilStatus]) - courseDuration);
                        if (extendDays > 0) {
                            extendedDayCandList.push({
                                ...doc.data(),
                                extendDays, id: doc.id,
                                ...avilStatus,
                                trainer: avilStatus?.trainer,
                                course: avilStatus?.course,
                                instituteBranch: avilStatus?.instituteBranch
                                , courseStartDate: avilStatus?.courseStartDate,
                                //    billMonth:
                            })

                        } else {
                            return 0;
                        }


                    };

                    // let yetToStart = doc.data().joinedCourses.find(({ status }) => ['Yet to start', 'Pending', 'Hold', 'Discontinued',].includes(status));
                    let yetToStart = doc.data().joinedCourses.find(({ status }) => ['Yet to start'].includes(status));
                    if (!!yetToStart) {
                        yetToStartList.push({
                            ...doc.data(),
                            id: doc.id,
                            ...yetToStart,
                            // trainer: avilStatus?.trainer,
                            // course: avilStatus?.course,
                            // instituteBranch: avilStatus?.instituteBranch
                            // , courseStartDate: avilStatus?.courseStartDate,
                            //    billMonth:
                        })
                    }

                });

                let branchList = INSTITUTE_BRANCH.map(({ value }) => {
                    return {
                        data: data.map((canDat) => {
                            let data = canDat?.joinedCourses?.find(({ instituteBranch }) => instituteBranch === value);
                            if (data) {
                                return { ...canDat, ...data }
                            } else {
                                return null
                            }


                        }).filter(Boolean),
                        branch: value
                    }
                });
                resolve({ summaryCounts, yetToStartList, branchCandidateList: branchList, extendedDayCandList, overAllCandidateList: data })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}