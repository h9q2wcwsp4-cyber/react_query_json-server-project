import {rootApi} from "../apis/root.api.js"

// ==========================================
// 1. 직원 (Employee) 관련 API (기존 코드)
// ==========================================
export const salesAllGetApi = async () => {
    try {
        const response = await rootApi.get("/sales")
        return response.data
    }
    catch (error) {
        return error
    }
}

export const salesGetApi = async (id) => {
    try {
        const response = await rootApi.get(`/sales/${id}`)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const salesPostApi = async (dataObj) => {
    try {
        const response = await rootApi.post("/sales", dataObj)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const salesPutApi = async (dataObj) => {
    try {
        const response = await rootApi.put(`/sales/${dataObj.id}`, dataObj)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const salesDeleteApi = async (id) => {
    try {
        await rootApi.delete(`/sales/${id}`)
        return id
    }
    catch (error) {
        return error
    }
}


// ==========================================
// 2. 상품 (Product) 관련 API (새로 추가되는 코드 🚨)
// ==========================================
export const productAllGetApi = async () => {
    try {
        const response = await rootApi.get("/products")
        return response.data
    }
    catch (error) {
        return error
    }
}

export const productGetApi = async (id) => {
    try {
        const response = await rootApi.get(`/products/${id}`)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const productPostApi = async (dataObj) => {
    try {
        const response = await rootApi.post("/products", dataObj)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const productPutApi = async (dataObj) => {
    try {
        const response = await rootApi.put(`/products/${dataObj.id}`, dataObj)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const productDeleteApi = async (id) => {
    try {
        await rootApi.delete(`/products/${id}`)
        return id
    }
    catch (error) {
        return error
    }
}