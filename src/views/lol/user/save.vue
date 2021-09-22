<template>
  <div class="app-container">
     <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="user.userName"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="user.age" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickName"/>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="user.description" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 用户头像 -->
      <el-form-item label="用户头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="user.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/hero/upload'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import userApi from "@/api/user/user.js";
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    components: { ImageCropper, PanThumb },
    data() {
    return {
      user:{
        userName: '',
        age: 0,
        nickName: '',
        description: '',
        avatar: ''
      },
      //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.user = {}
      }
    },
    saveOrUpdate() {
       //判断修改还是添加
      //根据teacher是否有id
      if(!this.user.id) {
        //添加
        this.saveUser()
      } else {
        //修改
        this.updateUser()
      }
    },

    close() { //关闭上传弹框的方法
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.user.avatar = data
      this.imagecropperKey = this.imagecropperKey+1
    },
    //根据id查询的方法
    getInfo(id) {
      userApi.getUser(id)
        .then(response => {
          this.user = response.data
        })
    },

    //修改的方法
    updateUser() {
      userApi.updateUser(this.user)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/user/table'})
        })
    },
 
    //添加用户的方法
    saveUser() {
      userApi.addUser(this.user)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/user/table'})
        })
    }

  }
}
</script>