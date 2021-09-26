<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>
<!-- 章节 -->
    <ul class="chanpterList">
        <li
            v-for="chapter in chapterVideoList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}

                <!-- <span class="acts">
                    <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                </span> -->
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}

                <!-- <span class="acts">
                    
                    <el-button style="" type="text">编辑</el-button>
                    <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                </span> -->
                    </p>
                </li>
            </ul>
        </li>
    </ul>
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from '@/api/user/chapter'
export default {
    data() {
        return {
            saveBtnDisabled:false,
            movieId:'',//影视id
            chapterVideoList:[],
            chapter:{ //封装章节数据
                title: '',
                sort: 0
            },
        }
    },
    created() {
        //获取路由的id值
        if(this.$route.params && this.$route.params.id) {
            this.movieId = this.$route.params.id
            //根据课程id查询章节和小节
            this.getChapterVideo()
        }
    },
    methods:{

        //根据课程id查询章节和小节
        getChapterVideo() {
            chapter.getAllChapterVideo(this.movieId)
                .then(response => {
                    this.chapterVideoList = response.data
                })
        },
        previous() {
            this.$router.push({path:'/movie/info/'+this.movieId})
        },
        next() {
            //跳转到第二步
            this.$router.push({path:'/movie/publish/'+this.movieId})
        }
    }
}
</script>
<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>