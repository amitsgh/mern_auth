import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notify(message, type) {
    const options = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'warning':
            toast.warn(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
}

export default notify;
