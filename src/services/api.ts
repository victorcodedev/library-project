import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const coversBaseURL = import.meta.env.VITE_COVERS_BASE_URL;

if (!baseURL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

if (!coversBaseURL) {
    throw new Error("VITE_COVERS_BASE_URL is not defined");
}

export const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error?.response || error.message);
        return Promise.reject(error);
    }
);

export const buildCoverUrl = (
    coverId: number | string | null | undefined,
    size: "S" | "M" | "L" = "M"
): string | null => {
    if (!coverId) return null;

    const safeId = String(coverId).replace(/[^0-9]/g, "");

    return `${coversBaseURL}/b/id/${safeId}-${size}.jpg`;
};