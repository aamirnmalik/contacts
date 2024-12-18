import FlashMessageIcon from "./FlashMessageIcon";

const FlashMessage = ({ type, message, description }) => {
    return (
        <div className="flex items-start">
            {/*Icon*/}
            <div className="flex-shrink-0">
                <FlashMessageIcon type={type} />
            </div>

            <div className="ml-3 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{message}</p>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
        </div>
    );
};

export default FlashMessage;
