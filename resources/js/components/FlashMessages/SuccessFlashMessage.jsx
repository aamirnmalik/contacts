import FlashMessage from "./FlashMessage";

export default function ({ message, description }) {
    return (
        <FlashMessage
            type={"success"}
            message={message}
            description={description}
        />
    );
}
