import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDoc, deleteDoc, getDocs, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER, DB_NAME } from '../../services/constants';
import { Toast } from '../../services/toast';
import moment from "moment";



export const updateAtendance = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                body?.map(async (attendanceObj) => {
                    console.log(attendanceObj)
                    const isAvilable = await getDocs(query(collection(getFirestore(), DB_NAME.ATTENDANCE), where("atdDate", "==", attendanceObj?.atdDate)));
                    console.log('isAvilable-------------->', isAvilable[0])
                    if (isAvilable?.size == 0) {
                        const docRef = await addDoc(collection(getFirestore(), DB_NAME.ATTENDANCE), attendanceObj);
                        resolve(docRef)
                    } else {
                        isAvilable.forEach(async (cand) => {

                            let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                            attendanceObj['createdBy']['name'] = first_name + " " + last_name;
                            attendanceObj['createdBy']['userId'] = user_id;
                            const docRef = await updateDoc(doc(getFirestore(), DB_NAME.ATTENDANCE, cand?.id), attendanceObj);
                            console.log('is avilabel', docRef)
                        });

                        console.log('is avilabel')
                    }
                    console.log('isAvilable-------------->', isAvilable)
                })



                // const docRef = await addDoc(collection(getFirestore(), "candidate"), body);
                // resolve(docRef)
                // Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}




export const getAttendance = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME.ATTENDANCE), where("atdDate", "==",  moment().format('DD/MM/YYYY'))));

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
}