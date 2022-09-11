import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword,updateEmail } from "firebase/auth";
import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAt, getFirestore } from "firebase/firestore";
import { EXIST_LOCAL_STORAGE } from '../../services/constants'
import { createUser, getUserDetail } from '../user';
import { Toast } from '../../services/toast';
import { isAuthenticated,jwtDecodeDetails } from '../../services/utilities';
// import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';


export const createAuthentication = (body) => {
    return new Promise((resolve, reject) => {
        let { emailid, password } = body;
        const auth = getAuth();
        if (isAuthenticated()) {
            createUserWithEmailAndPassword(auth, emailid, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    body.userId = user.uid;
                    createUser(body).then((data) => {
                        resolve(data)
                    }).catch((error) => {
                        reject(error)

                        // ..
                    });
                    // ...
                })
                .catch((error) => {
                    Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
                    reject(error)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    })

}



export const userSignin = ({ username, password }) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password).then(({ user: { accessToken, uid } }) => {
            console.log('uid----------->', uid)
            // Signed in 
            localStorage.setItem(EXIST_LOCAL_STORAGE.AUTHTOKEN, accessToken);
            resolve(accessToken)
            getUserDetail(uid).then((data) => {
                resolve(accessToken)
            }).catch((error) => {
                reject(error)

                // ..
            });




            // ...
        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                Toast({ type: 'danger', message: 'Sorry, your password is incorrect. Please try again', title: 'Error' })
                reject(errorCode)
            } else if (['auth/user-not-found', 'auth/invalid-email'].includes(errorCode)) {
                Toast({ type: 'danger', message: 'Sorry, your email is incorrect. Please try again', title: 'Error' })
                reject(errorCode)
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' });
                reject(error)
            }

            // ..
        });
    })
}

export const passwordUpdate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                const auth = getAuth();
                const user = auth.currentUser;
                updatePassword(user, body).then((data) => {
                    resolve(data)
                }).catch((error) => {
                    Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
                    // An error ocurred
                    // ...
                });
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
                const auth = getAuth();
                console.log('auth.currentUser------------>',auth.currentUser)
               updateEmail(auth.currentUser, body?.emailid).then( async () => {
                    let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                    body.updatedBy.name = fName + " " + lName;
                    body.updatedBy.date = new Date().toISOString();
                    body.updatedBy.userId = user_id;
                    const docRef = await updateDoc(doc(getFirestore(), "user", id), body);
                    resolve(docRef)
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });

               
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            console.error("Error adding document: ", e);
            reject(e)

        }

    })
}
