import { Store } from 'react-notifications-component';

export const Toast = ({ type = 'success', message='', title }) => {
    console.log(typeof message);
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });
}
// Notification type
// success
// danger
// info
// default
// warning