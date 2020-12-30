import axios, { AxiosRequestConfig } from 'axios';

// 超时时间
axios.defaults.timeout = 1000 * 10;

// 请求拦截器
axios.interceptors.request.use(request => {
    return request;
});

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    async err => {
        return Promise.reject(err);
    }
);

/**
 * get 请求
 * @param url 请求链接
 * @param params 参数
 * @param config 配置
 */
const get = async <T=string>(url: string, params?: { [key: string]: any}, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axios.get(url, { params, ...config });
    return res.data as T;
};

export { get };

export default class Request {
    /**
     * get 请求
     * @param url 请求链接
     * @param params 参数
     * @param config 配置
     */
    static async get<T=string>(url: string, params?: { [key: string]: any}, config?: AxiosRequestConfig) {
        return get<T>(url, params, config);
    }
}




