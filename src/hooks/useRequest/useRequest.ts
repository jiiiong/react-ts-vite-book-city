import useSWR, {SWRConfiguration, SWRResponse} from "swr";
import {AxiosRequestConfig, AxiosError, AxiosResponse} from "axios";
import axiosInstance from "./axiosIstance";

interface useRequestResponse<Data, Error>
  extends Omit<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'data'>
{
  axiosResponse: AxiosResponse<Data> | undefined,
  data: Data | undefined,
}

// 请求数据类型：Data
// 返回的错误类型：Error
// 功能：根据 AxiosRequestConfig 配置的 fetcher，
// 使用 SWRConfiguration 配置的 swr 不断取数据；
// 其中关于 fetcher 取到的 data ，抛出的 error 均由用户指定，
// 使用泛型描述为 unknown
function useRequest<Data=unknown, Error=unknown> (
    request: AxiosRequestConfig,
    config?: SWRConfiguration
): useRequestResponse<Data, Error> {
    // 定义 fetcher
    const fetcher = () => axiosInstance.request<Data>(request);

    //
    const swrResponse = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
      request.url,
      fetcher,
      config,
    );

    return {
        ...swrResponse,
        data: swrResponse.data?.data,
        axiosResponse: swrResponse.data,
    }
}

export default useRequest;

