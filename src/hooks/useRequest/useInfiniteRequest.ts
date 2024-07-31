import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteResponse } from "swr/infinite";
import axiosInstance from "./axiosIstance";
import { AxiosError, AxiosRequestConfig } from "axios";

interface DataWrapper<D> {
  code: number;
  data: D;
  msg: string;
}

interface Return<Data, Error>
  extends Omit<SWRInfiniteResponse<DataWrapper<Data>, AxiosError<Error>>, 'data'> {
    data: Data[] | undefined;
    response: DataWrapper<Data>[] | undefined;
  }

function useInfiniteRequest<Data=unknown, Error=unknown>(
  request: AxiosRequestConfig,
  options?: SWRInfiniteConfiguration,
): Return<Data,Error>
{
  const response = useSWRInfinite<DataWrapper<Data>, AxiosError<Error>>(
    (pageIndex) => `${request.url}?pageIndex=${pageIndex+1}`, // 根据 pageIndex 更新 url
    (pageIndexedURL: string) =>
      //  使用上一个参数生成的 url 更新 request，并请求数据；
      // 值得注意的是 axiosInstance 获取的数据格式为 DataWrapper<Data>
      axiosInstance.request({ ...request, url: pageIndexedURL }),
    options,
  );

  // 应为直接返回的数据类型为 DataWrapper<Data>[]；
  // 我们直接想要 Data[]；
  // 故处理返回数据，并为了提供类型注释，修改 SWRInfiniteResponse 的类型
  return {
    ... response,
    response: response.data,
    data: response.data?.map((item)=>item.data)
  };

}

export default useInfiniteRequest;
