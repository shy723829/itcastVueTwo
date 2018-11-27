<template>
  <el-card class="card-box">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
              <el-button @click="searchkey()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="dialogFormVisible=true" type="primary">添加用户</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="#" width="50" type="index">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="140">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="130">
        <template slot-scope="scope">
          {{scope.row.create_time|fmdate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="150">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleUser(scope.row)" type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
          <el-button type="success" plain size="mini" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination class="pagebox" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加用户 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      dialogFormVisible: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    //删除用户
    deleUser(user) {
      this.$confirm('确定删除该用户吗?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
          const res = await this.axios.delete(`users/${user.id}`)
          const{meta:{msg,status}}=res.data
          if(status===200){
              this.getData()
              this.$message.success(msg)
          }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //添加用户
    async adduser() {
      const res = await this.axios.post('users', this.formData)
      console.log(res)
      const {
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 201) {
        this.dialogFormVisible = false
        this.getData()
        this.formData = {}
      }
    },
    //根据关键词更新数据
    searchkey() {
      this.getData()
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getData()
    },
    //获取列表数据
    async getData() {
      var AUTH_TOKEN = localStorage.getItem('token')
      this.axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      //   console.log(res)
      const {
        data: {
          pagenum,
          total,
          users
        },
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        this.pagenum = pagenum
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }

    }
  }
}
</script>

<style>
.input-with-select {
  width: 300px
}

.pagebox {
  text-align: center
}
</style>
