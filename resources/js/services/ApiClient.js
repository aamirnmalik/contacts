import axios from "axios";

let axiosInst = axios.create({
    baseURL: `/api`,
});

axiosInst.interceptors.response.use(
    (response) => response,
    (error) => {
        // Happens for cancelled requests using axios CancelTokenSource
        if (error.response?.status === 401) {
            if (error.response?.data?.message === "Unauthenticated.") {
                window.location = `/login`;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInst;

export const cancelTokenSource = () => {
    let CancelToken = axios.CancelToken;
    return CancelToken.source();
};
