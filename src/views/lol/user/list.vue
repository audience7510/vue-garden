<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="userQuery.userName" placeholder="名称"/>
      </el-form-item>

     <el-form-item>
        <el-input v-model="userQuery.nickName" placeholder="昵称"/>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="userQuery.createTimeStart"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

            <el-form-item>
        <el-date-picker
          v-model="userQuery.createTimeEnd"
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

      <el-table-column
        label="序号"
        width="70"
        align="center"
        type = "index"
        />
      <el-table-column prop="userName" label="名称" width="160" />

      <el-table-column prop="age" label="年龄" width="160"/>

      <el-table-column prop="nickName" label="昵称" width="160"/>

      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
        <img
        style="width: 90px; height: 90px"
        :src="scope.row.avatar">
        </template>
      </el-table-column>
      
      <el-table-column prop="createTime" label="创建时间" width="160" align="center"/>

      <el-table-column prop="description" label="简介" width="260" align="center"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!-- scope.row获取到当前行，.id获取到当前行的id -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
import user from "@/api/user/user.js";
export default {
  data() {
    return {
        list:null,//查询之后接口返回集合
        current:1,//当前页
        size:10,//每页记录数
        total:0,//总记录数
        userQuery:{} //条件封装对象
    };
  },

  created() {
    this.getList();
  },
  methods: {
    getList(current=1) {
      this.current = current
      user.getUserListPage(this.current,this.size,this.userQuery)
        .then((result) => {
          this.list = result.data.records;
          this.total = result.data.total 
        })
        .catch((err) => {
        });
    },

    resetData() {//清空的方法
        //表单输入项数据清空
        this.userQuery = {}
        //查询所有讲师数据
        this.getList()
    },
    removeDataById(id){
        this.$confirm('此操作将删除用户记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                user.deleteUserId(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
    }
  },
};
</script>