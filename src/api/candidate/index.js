import { collection, addDoc, getDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAfter, endAt, limit } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER } from '../../services/constants'
import { Toast } from '../../services/toast';


export const createCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                const isExists = await getDocs(query(collection(getFirestore(), "candidate"), where("phone", "==", body?.phone)));
                    if (isExists.empty) {
                    let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                    body['createdBy']['name'] = first_name + " " + last_name;
                    body['createdBy']['userId'] = user_id;
                    body['createdBy']['date'] = new Date().toISOString();
                    const docRef = await addDoc(collection(getFirestore(), "candidate"), body);
                    resolve(docRef)
                Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })
                }else{
                    resolve('')
                    Toast({ type: 'warning', message: 'candidate is alredy exist', title: 'warning' })
                }
                
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const updateCandidate = (body, id) => {
    delete body.id
    delete body.statusCount
    delete body?.course;
    delete body?.instituteBranch;
    delete body?.billMonth;
    delete body?.branchIncharge;
    delete body?.trainer;
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                body['updatedBy']['name'] = first_name + " " + last_name;
                body['updatedBy']['userId'] = user_id;
                body['updatedBy']['date'] = new Date().toString();
                const docRef = await updateDoc(doc(getFirestore(), "candidate", id), body);
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
}

export const createCandidateByCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
          
     
            const isExists = await getDoc(query(collection(getFirestore(), "candidate"), where("phone", body)));
            console.log('docSnap.exists()--------------->',isExists.exists())
            if (isExists.exists()) {}
            // const docRef = await addDoc(collection(getFirestore(), "candidate"), body);
            // resolve(docRef)
            // Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })


        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const getCandidate = (body, isBatch = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // startAfter(30),limit(30),
                var querySnapshot;
                if (body === 'All') {
                    querySnapshot = await getDocs(query(collection(getFirestore(), "candidate")));
                } else {
                    querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), orderBy("name"), where(!isBatch ? "status" : "classTimeIDs", "array-contains", body)));
                }

                // 

                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let avilStatus = body === 'All'?doc.data().joinedCourses[0]:doc.data().joinedCourses.find(({ status }) => status == body);
                     console.log('data------>',avilStatus)
                    data.push({
                        ...doc.data(), id: doc.id, course: avilStatus?.course,
                        instituteBranch: avilStatus?.instituteBranch,
                        billMonth: avilStatus?.billMonth,
                        courseStartDate: avilStatus?.courseStartDate, branchIncharge: avilStatus?.branchIncharge,
                        trainer:avilStatus?.trainer,
                        fees:avilStatus?.fees
                    });
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

export const deleteCandidate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let deleteCandidate = await deleteDoc(doc(getFirestore(), "candidate", id));
                Toast({ type: 'success', message: 'candidate deleted successfully', title: 'success' })
                resolve(deleteCandidate)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const searchCandidate = (phone) => {
    console.log('value------------>', phone)
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {


                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), orderBy("phone"), where("phone", "<=", phone), endAt([phone + '\uf8ff'])));
                let data = []
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                console.log("last", lastVisible, querySnapshot);
                // console.log("found by name",querySnapshot);
                // querySnapshot.forEach((doc) => {
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log('{ ...doc.data(), id: doc.id }------------->',{ ...doc.data(), id: doc.id })
                //     data.push({ ...doc.data(), id: doc.id });
                // });

                // resolve(deleteCandidate)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}