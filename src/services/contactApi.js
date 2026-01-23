import api from "./axios"

export const submitContactForm = (data) =>
  api.post("/contact", data)
