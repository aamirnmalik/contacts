import FlashMessage from "./FlashMessage";

export default function ({ message, description }) {
    return (
        <FlashMessage
            type={"warning"}
            message={message}
            description={description}
        />
    );
}
