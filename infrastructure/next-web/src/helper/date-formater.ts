export const formatDate = (date: string) => new Date(date).toISOString().split("T")[0]
