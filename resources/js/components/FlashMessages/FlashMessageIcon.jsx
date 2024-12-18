import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid/index.js';

const FlashMessageIcon = ({ type }) => {
    switch (type) {
        case "success":
            return (
                <CheckCircleIcon
                    className="h-7 w-7 text-green-500"
                    aria-hidden="true"
                />
            );
        case "error":
            return (
                <XCircleIcon
                    className="h-7 w-7 text-red-500"
                    aria-hidden="true"
                />
            );
        case "warning":
        default:
            return (
                <ExclamationCircleIcon
                    className="h-7 w-7 text-yellow-500"
                    aria-hidden="true"
                />
            );
    }
};

export default FlashMessageIcon;
