const baseURL = process.env.REACT_APP_API_URL;

export const requestInterceptor = (config) => {
    config.baseURL = baseURL;

    return config;
}