import React from 'react';
import FlashMessageIcon from './FlashMessageIcon.jsx';

export default function ({ error, message }) {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <FlashMessageIcon type={`error`} />
            </div>

            <div className="ml-3 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">
                    {message ??
                        error?.response?.data?.message ??
                        "An error occurred!"}
                </p>

                {error?.response?.data?.errors && (
                    <div className="mt-1 text-sm text-gray-500">
                        {Object.entries(error.response.data.errors).map(
                            ([errorFieldKey, errorField]) => (
                                <div key={errorFieldKey}>
                                    {errorField.map((errorMessage, index) => (
                                        <div className={`flex`} key={index}>
                                            <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center">
                                                <span className="relative block w-2 h-2 bg-gray-500 rounded-full" />
                                            </span>
                                            <span className="ml-1 text-sm font-medium">
                                                {errorMessage}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
