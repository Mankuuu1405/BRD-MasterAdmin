import axiosInstance from "../utils/axiosInstance";

const API_URL = "/api/adminpanel/loan-products/";

export const getLoanPolicies = async () => {
    return await axiosInstance.get(API_URL);
};
