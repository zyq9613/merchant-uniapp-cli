const token_key = 'MERCHANT_TOKEN'

export function setToken(token){
    return uni.setStorageSync(token_key,token)
}
export function getToken(){
    return uni.getStorageSync(token_key)
}
export function removeToken(){
    return uni.removeStorageSync(token_key);
}