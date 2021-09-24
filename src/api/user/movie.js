import request from '@/utils/request'

export default{
    //添加影视信息
    addMovieInfo(movieInfo) {
        return request({
            url: '/hero/movie/addCourseInfo',
            method: 'post',
            data: movieInfo
          })
    },
    //查询所有用户
    getListUser() {
        return request({
            url: '/hero/user/findAll',
            method: 'get'
          })
    }
}
