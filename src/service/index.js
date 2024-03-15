//引入封装好的 service
import service from "./service";

//声明一个基础接口变量
let baseURL = '';

//配置开发环境
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:6060';
}

// 配置生产环境
if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://www.*****.com:8001';
}

//设置请求头（如果请求头统一的话可以在axios文件设置，则无须从这里传过去）
const header = {}

//根据自身需求
let _service = {
    // 登陆接口
    login: (params) => {
        const url = baseURL + '/api/login';
        return service.get(url, params, null);
    },
    // 上传用户头像
    upload: (data) => {
        const url = baseURL + '/api/file/upload';
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        return service.post(url, data, headers);
    },
    // 获取笔记分页列表
    notePage: (params) => {
        console.log('header', header)
        const url = baseURL + '/api/note/notePage';
        return service.get(url, params, header);
    },

    signup: (params) => {
        const url = baseURL + '/api/user/signup';
        return service.get(url, params, header);
    },
    // 查询笔记详情
    noteDetail: (params) => {
        const url = baseURL + '/api/note/getNoteById';
        return service.get(url, params, header);
    },
    // 获取笔记评论列表
    getNoteCommentListByNoteId: (params) => {
        const url = baseURL + '/api/noteComment/getNoteCommentListByNoteId';
        return service.get(url, params, header);
    },
    // 评论笔记
    commitComment: (params) => {
        const url = baseURL + '/api/noteComment/addNoteComment';
        return service.get(url, params, header);
    }
}


//导出
export default _service
