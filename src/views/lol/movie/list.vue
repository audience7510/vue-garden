<template>
  <div class="app-container">
    影视列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="movieQuery.title" placeholder="影视名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="movieQuery.status" clearable placeholder="影视状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

    <el-form-item label="创建时间">
        <el-date-picker
          v-model="movieQuery.createTimeStart"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="movieQuery.createTimeEnd"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <!-- <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column
        label="序号"
        width="70"
        align="center"
        type = "index"
        />
      <el-table-column prop="title" label="影视名称" width="80" />

      <el-table-column label="影视状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="60"/>

      <el-table-column prop="createTime" label="添加时间" />

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑影视基本信息</el-button>
          </router-link>
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑影视大纲信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除影视信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
//引入调用teacher.js文件
import movie from '@/api/user/movie'
export default {

    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          current:1,//当前页
          size:10,//每页记录数
          total:0,//总记录数
          movieQuery:{} //条件封装对象
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{
        getList(current=1) {
            this.current = current
            movie.getListMovie(this.current,this.size,this.movieQuery)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    this.list = response.data.records
                    this.total = response.data.total
                }) 
        },
        resetData() {//清空的方法
            //表单输入项数据清空
            this.movieQuery = {}
            //查询所有讲师数据
            this.getList()
        }
 
    }
}
</script>
