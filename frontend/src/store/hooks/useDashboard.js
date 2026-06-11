import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";
import { useAllGetSales } from "./useSales";
import { useMemo } from "react";

export const useDashboard = () =>{
    const {data: salesList=[]} = useAllGetSales();
    const {data: productList=[]} = useAllGetProduct();
    const {data: userList=[]} = useAllGetUser();

    const kpi = useMemo(()=>{
        const totalSalesAmount = salesList.reduce((sum, item)=>(
            sum + Number(item.total_price || 0)
        ), 0)
        const totalOrderCount = salesList.length;
        const totalQuantity = salesList.reduce((sum, item)=>(
            sum + Number(item.quantity || 0)
        ), 0)
        const customerCount = userList.length;
        const productCount = productList.length;
        return {
            totalOrderCount, totalQuantity, totalSalesAmount,
            customerCount, productCount
        }
    }, [salesList, productList, userList])
    
    const userRanking = useMemo(()=>{
        const obj = {}
        salesList.forEach(item => {
            obj[item.user_id] = (obj[item.user_id] || 0) + 1
        });
        const userRankingObj = Object.entries(obj)
                        .map(([userId, count])=>{
                            const user = userList.find(user=>String(user.id)===String(userId))
                            return {
                                name: user?.name || "unknown",
                                count
                            }
                        })
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 10)
        return userRankingObj
    }, [salesList, userList])

    const productRanking = useMemo(()=>{
        const obj = {}
        salesList.forEach(item => {
            obj[item.product_id] = (obj[item.product_id] || 0) + 1
        });
        const productRankingObj = Object.entries(obj)
                        .map(([productId, quantity])=>{
                            const product = productList
                                .find(product=>String(product.id)===String(productId))
                            return {
                                name: product?.product_name || "unknown",
                                quantity
                            }
                        })
                        .sort((a, b) => b.quantity - a.quantity)
                        .slice(0, 10)
        return productRankingObj;
    }, [salesList, productList])

    return {
        kpi, 
        userRanking,
        productRanking
    }
}