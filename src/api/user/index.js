import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, getDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER,DB_NAME } from '../../services/constants'
import { Toast } from '../../services/toast';


export const createUser = (body) => {
    console.log('password----------------->', jwtDecodeDetails())
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                console.log('password----------------->', jwtDecodeDetails())
                let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                body['createdBy']['name'] = first_name + " " + last_name;
                body['createdBy']['userId'] = user_id;

                const docRef = await setDoc(doc(getFirestore(), DB_NAME?.USER, body.userId), body);
                Toast({ type: 'success', message: 'user created successfully', title: 'Error' })
                resolve(docRef);
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const updateUser = (body, id) => {

    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                body.updatedBy.name = first_name + " " + last_name;
                body.updatedBy.date = new Date().toISOString();
                body.updatedBy.userId = user_id;
                const docRef = await updateDoc(doc(getFirestore(), "user", id), body);
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

export const getAllUser = (body) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

                const querySnapshot = await getDocs(query(collection(getFirestore(), "user"), where("status", "!=", STATUS.DELETED)));
                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push({ ...doc.data(), id: doc.id })
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


export const getUserDetail = (body) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

                const docSnap = await getDoc(doc(getFirestore(), "user", body));
                if (docSnap.exists()) {
                    localStorage.setItem(CURRENT_USER, JSON.stringify({ ...docSnap.data(), id: docSnap.id }));
                    resolve(docSnap.data())
                } else {
                    Toast({ type: 'danger', message: "This Avatar garments account doesh't exist. Enter a different account", title: 'Error' })
                    reject('')
                    // doc.data() will be undefined in this case

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

