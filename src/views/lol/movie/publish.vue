<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新影视</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写影视基本信息"/>
      <el-step title="创建影视大纲"/>
      <el-step title="发布影视"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="publish.cover">
      <div class="main">
        <h2>{{ publish.title }}</h2>
        <p class="gray"><span>共{{ publish.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ publish.subjectLevelOne }} — {{ publish.subjectLevelTwo }}</span></p>
        <p>课程讲师：{{ publish.teacherName }}</p>
        <h3 class="red">￥{{ publish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publishMovie">发布课程</el-button>
    </div>
  </div>
</template>

<script>
import movie from '@/api/user/movie'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      movieId:'',
      publish:{}
    }
  },

  created() {
    //获取路由课程id值
    if(this.$route.params && this.$route.params.id) {
      this.movieId = this.$route.params.id
      //调用接口方法根据课程id查询
      this.getPublishId()
    }
  },

  methods: {

    //根据影视id查询
    getPublishId() {
      movie.getPublihInfo(this.movieId)
        .then(response => {
          this.publish = response.data
        })
    },

    previous() {
      console.log('previous')
      this.$router.push({ path: '/movie/chapter/1' })
    },

    publishMovie() {
        movie.publihMovie(this.movieId)
        .then(response => {
          //提示
          this.$message({
              type: 'success',
              message: '课程发布成功!'
          });
          //跳转课程列表页面
          this.$router.push({ path: '/movie/list' })
        })
    }
  }
}
</script>
<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>