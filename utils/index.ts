export const isJson = (data: any) => {
    try {
        JSON.parse(data);
        return true
    } catch (e) {
        return false
    }
}
