import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";

const initAxios = axios.create({
    timeout: 1800000//数据响应过期时间
})

//请求拦截器
initAxios.interceptors.request.use((config) => {
    config.headers['token'] = useUserStore().userInfo.token
    //在发送之前做点什么
    //判断当前用户是否已经登陆，如果没有登陆，跳转到登陆界面
    return config
}, (error) => {
    //对请求错误做点什么
    return error
})

//响应拦截器
initAxios.interceptors.response.use((response) => {
    // 当身份验证过期之后，跳转到登陆界面
    if (response.data.code === "401") {
        router.push("/login")
    }
    return response.data
    // if (response.data.code === "200") {
    //     return response.data
    // } else {
    //     return {resultCode: -1}
    // }
})
//导出
export default () => initAxios
