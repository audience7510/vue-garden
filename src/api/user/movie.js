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
    },
    //根据影视id查询影视基本信息
    getMovieInfoId(id) {
        return request({
            url: '/hero/movie/getMovieInfo/'+id,
            method: 'get'
            })
    },
    //修改影视信息
    updateMovieInfo(movieInfo) {
        return request({
            url: '/hero/movie/updateMovieInfo',
            method: 'post',
            data: movieInfo
            })
    },
    //影视确认信息显示
    getPublihInfo(id) {
        return request({
            url: '/hero/movie/getPublishVo/'+id,
            method: 'get'
            })
    },
    //影视最终发布
    publihMovie(id) {
        return request({
            url: '/hero/movie/publishMovie/'+id,
            method: 'post'
            })
    },
    //查询影视列表
    getListMovie(current,size,movieQuery) {
        return request({
            url: `/hero/movie/list/${current}/${size}`,
            method: 'post',
            data: movieQuery
          })
    }
}
