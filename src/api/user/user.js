import request from '@/utils/request'

export default{
    getUserListPage(current,size,userQuery) {
        return request({
            url: `/hero/user/list/${current}/${size}`,
            method: 'post',
            //userQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: userQuery
          })
    },
    deleteUserId(id) {
        return request({
            url: `/hero/user/${id}`,
            method: 'delete',
          })
    },
    addUser(user) {
        return request({
            url: `/hero/user/add`,
            method: 'post',
            data: user
          })
    },

    getUser(id) {
        return request({
            url: `/hero/user/getUser/${id}`,
            method: 'get'
          })
    },

    updateUser(user) {
        return request({
            url: `/hero/user/update`,
            method: 'post',
            data: user
          })
    }
}
