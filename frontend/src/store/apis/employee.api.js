import {rootApi} from "../apis/root.api.js"




export const employeeAllGetApi = async () => {
    try {
        const response = await rootApi.get("/employees")
        return response.data
    }
    catch (error) {
        return error
    }
}

export const employeeGetApi = async (id) => {
    try {
        const response = await rootApi.get(`/employees/${id}`)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const employeePostApi = async (dataObj) => {
    try {
        const response = await rootApi.post("/employees", dataObj)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const employeePutApi = async (dataObj) => {
    try {
        const response = await rootApi.put(`/employees/${dataObj.id}`, dataObj)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const employeeDeleteApi = async (id) => {
    try {
        await rootApi.delete(`/employees/${id}`)
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