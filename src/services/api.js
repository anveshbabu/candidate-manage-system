import { axiosInstance } from "./utilities";
import { setapiProgressBar, apiProgressBar } from './helperFunctions';
import { EXIST_LOCAL_STORAGE, CONFIG } from './constants'


export var api = async function ({ method = "get", api, id, body, status = false, token = '', baseURL = "normal", email = "" }) {
	let config = {
		onUploadProgress: progressEvent => {
			let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
			setapiProgressBar(percentCompleted);
		}
	}

	console.log(getMicroServiceURL(baseURL) + api + (!!id ? '/' + id : ""), (body ? body : ""))

	return await new Promise((resolve, reject) => {
		console.log('Promise------------>',config)
		// setting token
		
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN) === null ? '' : localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN)}`

		axiosInstance[method](`${getMicroServiceURL(baseURL) + api + (!!id ? '/' + id : "")}`, (body ? body : ""), config).then((response) => {
			console.log(JSON.stringify(statusHelper(status, response)))
			resolve(statusHelper(status, response))

		}).catch((error) => {
			console.log('error------------>', error)

			try {

				if (error.response) {

					reject(statusHelper(status, error.response))

				} else {

					reject(error)

				}

			}

			catch (err) {
				console.log('error------------>', err)
				reject(err)

			}

		})



	})
}












var statusHelper = (status, data) => {

	if (status) {
		return {
			status: data.status,
			...data.data
		}
	} else {
		return data.data
	}
}




// local api base url
let getMicroServiceURL = (baseURL) => {

	switch (baseURL) {
		case 'normal':
			return CONFIG.API_URL;
		case 'test':
			return 'https://jsonplaceholder.typicode.com';
		default:
			break;
	}

}



export const apiServiceURL = (baseURL = 'normal') => {

	return getMicroServiceURL(baseURL)

}