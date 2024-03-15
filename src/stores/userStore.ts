// 这里存储用户的信息
import {defineStore} from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
        const userInfo = ref({
            userId: null,
            username: null,
            token: null
        })

        function setUserInfo(info: any) {
            userInfo.value = info
        }

        return {
            userInfo, setUserInfo
        }
    }
)
