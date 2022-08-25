import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { DB_NAME } from '../../services/constants'
import { Toast } from '../../services/toast';



export const createBatch = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const docRef = await addDoc(collection(getFirestore(), DB_NAME?.BATCH), body);
                resolve(docRef)
                Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
};


export const getBatchList = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME?.BATCH), orderBy("order", "asc")));

                let data = []
                querySnapshot.forEach((doc) => {


                    data.push({ ...doc.data(), id: doc.id });
                });
                resolve(data)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
};


export const getBatchListWithCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME?.BATCH), orderBy("order", "asc")));

                let data = [];
                let cont = 0
                querySnapshot.forEach((doc) => {

                    data.push({ ...doc.data(), id: doc.id });

                });
                getCandidate(body).then((candObj) => {
                    let batchTimeList = [],activeCandCount=0,inActiveCandCount=0;
                    let InActiveBatchTimeList = []
                    data.forEach((batchObj, i) => {
                        let obj = candObj.filter(({ classTimeIDs ,status}) => classTimeIDs.includes(batchObj?.id) && status.includes("Processing"));
                        let InActiveCandObj = candObj.filter(({ classTimeIDs ,status}) => classTimeIDs.includes(batchObj?.id) && !status.includes("Processing"));
                        batchTimeList.push({ ...batchObj, batchData: obj });
                        InActiveBatchTimeList.push({ ...batchObj, batchData: InActiveCandObj });
                        activeCandCount=activeCandCount+obj.length;
                        inActiveCandCount= inActiveCandCount + InActiveCandObj.length;

                        if (i + 1 === querySnapshot.size) {
                            resolve({batchTimeList,InActiveBatchTimeList,inActiveCandCount,activeCandCount});

                        }


                    });

                }).catch((error) => {
                    Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
                    console.error(error);

                });

                // data
                // console.log('data getBatchListWithCandidate------------>', JSON.stringify(data), user_id)

                // resolve(data)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const getCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                // const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), where("classTimeIDs", "array-contains", classTimeIDs), where("trainerIDs", "array-contains", trainerIDs)));
                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), where("trainerIDs", "array-contains", body?.userId)));

                let data = []
                querySnapshot.forEach((doc) => {
                    let avilStatus = doc.data().joinedCourses.find(({ trainer }) => trainer == body?.userId);
                    // if (avilStatus?.classDays.includes(new Date().getDay())) {
                        data.push({ ...doc.data(), id: doc.id, course: avilStatus?.course, instituteBranch: avilStatus?.instituteBranch, classDays: avilStatus?.classDays });
                    // }

                });
                resolve(data)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const updateBatch = (body, id) => {

    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated()) {

                console.log(JSON.stringify(body))
                const docRef = await updateDoc(doc(getFirestore(), DB_NAME?.BATCH, id), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            console.error("Error adding document: ", e);
            reject(e)

        }
    })
}
