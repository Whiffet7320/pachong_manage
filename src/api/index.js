import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
// import md5 from '../assets/md5.min.js'
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})


myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'token': `${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //????????????
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('???????????????', '404??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('??????????????????', '402??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //????????????
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('???????????????', '404??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('??????????????????', '402??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myPut.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //????????????
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('???????????????', '404??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('??????????????????', '402??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myDelete.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //????????????
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('???????????????', '404??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('??????????????????', '402??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(username, userpass) {
        return myPost({
            url: urls.login,
            params: {
                username,
                userpass,
            }
        })
    },
    keyword_list(obj) {
        return myPost({
            url: urls.keyword_list,
            data: {
                ...obj
            }
        })
    },
    add_keyword(obj) {
        return myPost({
            url: urls.add_keyword,
            data: {
                ...obj
            }
        })
    },
    del_keyword(obj) {
        return myPost({
            url: urls.del_keyword,
            data: {
                ...obj
            }
        })
    },
    site_list(obj) {
        return myPost({
            url: urls.site_list,
            data: {
                ...obj
            }
        })
    },
    news_list(obj) {
        return myPost({
            url: urls.news_list,
            data: {
                ...obj
            }
        })
    },
    comment_list(obj) {
        return myPost({
            url: urls.comment_list,
            data: {
                ...obj
            }
        })
    },
    config(obj) {
        return myPost({
            url: urls.config,
            data: {
                ...obj
            }
        })
    },
    adminuser_list(obj) {
        return myPost({
            url: urls.adminuser_list,
            data: {
                ...obj
            }
        })
    },
    add_adminuser(obj) {
        return myPost({
            url: urls.add_adminuser,
            data: {
                ...obj
            }
        })
    },
    limits(obj) {
        return myPost({
            url: urls.limits,
            data: {
                ...obj
            }
        })
    },
    update_adminuser(obj) {
        return myPost({
            url: urls.update_adminuser,
            data: {
                ...obj
            }
        })
    },
    adminuser_del(obj) {
        return myPost({
            url: urls.adminuser_del,
            data: {
                ...obj
            }
        })
    },
    select_news(obj) {
        return myPost({
            url: urls.select_news,
            data: {
                ...obj
            }
        })
    },
    select_comment(obj) {
        return myPost({
            url: urls.select_comment,
            data: {
                ...obj
            }
        })
    },
    screen_newslist(obj) {
        return myPost({
            url: urls.screen_newslist,
            data: {
                ...obj
            }
        })
    },
    screen_commentlist(obj) {
        return myPost({
            url: urls.screen_commentlist,
            data: {
                ...obj
            }
        })
    },
    add_pubsentimentkeyword(obj) {
        return myPost({
            url: urls.add_pubsentimentkeyword,
            data: {
                ...obj
            }
        })
    },
    pubsentiment_keywordlist(obj) {
        return myPost({
            url: urls.pubsentiment_keywordlist,
            data: {
                ...obj
            }
        })
    },
    del_pubsentimentkeyword(obj) {
        return myPost({
            url: urls.del_pubsentimentkeyword,
            data: {
                ...obj
            }
        })
    },
    hotwords_logs(obj) {
        return myPost({
            url: urls.hotwords_logs,
            data: {
                ...obj
            }
        })
    },
    video_list(obj) {
        return myPost({
            url: urls.video_list,
            data: {
                ...obj
            }
        })
    },
    screen_videolist(obj) {
        return myPost({
            url: urls.screen_videolist,
            data: {
                ...obj
            }
        })
    },
    select_video(obj) {
        return myPost({
            url: urls.select_video,
            data: {
                ...obj
            }
        })
    },
    add_hotlink(obj) {
        return myPost({
            url: urls.add_hotlink,
            data: {
                ...obj
            }
        })
    },
    newstopublicsentiment(obj) {
        return myPost({
            url: urls.newstopublicsentiment,
            data: {
                ...obj
            }
        })
    },
    publicsentimenttonews(obj) {
        return myPost({
            url: urls.publicsentimenttonews,
            data: {
                ...obj
            }
        })
    },
    news_edit(obj) {
        return myPost({
            url: urls.news_edit,
            data: {
                ...obj
            }
        })
    },
    news_del(obj) {
        return myPost({
            url: urls.news_del,
            data: {
                ...obj
            }
        })
    },
    pubsentiment_edit(obj) {
        return myPost({
            url: urls.pubsentiment_edit,
            data: {
                ...obj
            }
        })
    },
    pubsentiment_del(obj) {
        return myPost({
            url: urls.pubsentiment_del,
            data: {
                ...obj
            }
        })
    },
    video_edit(obj) {
        return myPost({
            url: urls.video_edit,
            data: {
                ...obj
            }
        })
    },
    video_del(obj) {
        return myPost({
            url: urls.video_del,
            data: {
                ...obj
            }
        })
    },
    heat_entry(obj) {
        return myPost({
            url: urls.heat_entry,
            data: {
                ...obj
            }
        })
    },
    screen_newsedit(obj) {
        return myPost({
            url: urls.screen_newsedit,
            data: {
                ...obj
            }
        })
    },
    screen_pubsentimenteditL(obj) {
        return myPost({
            url: urls.screen_pubsentimenteditL,
            data: {
                ...obj
            }
        })
    },
    screen_videoedit(obj) {
        return myPost({
            url: urls.screen_videoedit,
            data: {
                ...obj
            }
        })
    },
    export_list(obj) {
        return myPost({
            url: urls.export_list,
            data: {
                ...obj
            }
        })
    },
    screen_newsdel(obj) {
        return myPost({
            url: urls.screen_newsdel,
            data: {
                ...obj
            }
        })
    },
    screen_pubsentimentdel(obj) {
        return myPost({
            url: urls.screen_pubsentimentdel,
            data: {
                ...obj
            }
        })
    },
    screen_videodel(obj) {
        return myPost({
            url: urls.screen_videodel,
            data: {
                ...obj
            }
        })
    },
    exporthotwords_list(obj) {
        return myPost({
            url: urls.exporthotwords_list,
            data: {
                ...obj
            }
        })
    },
    async importCardListFromExcel(file) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/${urls.importCardListFromExcel}`, file, configs)
        return res.data
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/addPhoto`, image, configs)
        return res.data
    },
}