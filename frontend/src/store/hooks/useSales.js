import { useQuery } from "@tanstack/react-query";
import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";
import { salesAllGetApi } from "../apis/sales.api";
import { useMemo } from "react";

export const useAllGetSales = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: salesAllGetApi
    });
};

export const useGetSales = () => {
    const { data: userRaw, isLoading: userLoading, error: userError } = useAllGetUser();
    const { data: productRaw, isLoading: productLoading, error: productError } = useAllGetProduct();
    const { data: salesQueryResult, isLoading: salesLoading, error: salesError } = useAllGetSales();

    // 💡 백엔드 응답이 배열인지, .data 안에 배열이 있는지 자동 판별
    const salesList = salesQueryResult?.data || (Array.isArray(salesQueryResult) ? salesQueryResult : []);
    const userList = userRaw?.data || (Array.isArray(userRaw) ? userRaw : []);
    const productList = productRaw?.data || (Array.isArray(productRaw) ? productRaw : []);

    const rowData = useMemo(() => {
        if (!salesList.length) return [];

        // 유저 id 매핑 객체 생성
        const userObj = Object.fromEntries(
            userList.map(user => [String(user?.id || user?._id), user])
        );

        // 상품 id 매핑 객체 생성
        const productObj = Object.fromEntries(
            productList.map(product => [String(product?.id || product?._id), product])
        );

        // 판매 데이터에 유저명, 상품명 합성
        return salesList.map(item => ({
            ...item,
            user_name: userObj[String(item?.user_id)]?.name ?? "알수없음",
            product_name: productObj[String(item?.product_id)]?.product_name ?? "알수없음"
        }));
    }, [userList, productList, salesList]);

    const isLoading = userLoading || productLoading || salesLoading;
    const error = userError || productError || salesError;

    return {
        data: rowData,
        isLoading,
        error
    };
};