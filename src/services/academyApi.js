import api from "./axios"

export const getCourses = () => api.get("/academy/courses")
