<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click.stop="searchGet"></el-button>
      </el-input>
      <el-button type="success" @click.stop="adduserShow=true">添加用户</el-button>
    </div>

    <!-- 添加用户弹出框 -->
    <!-- :visible控制弹窗的显示与隐藏 -->
    <el-dialog title="添加用户" :visible.sync="adduserShow">
      <!-- :model使用双向数据绑定，操作表单数据 -->
      <el-form :model="userAdddate" status-icon :rules="rules">
        <el-form-item label="用户名" label-width="70px" prop="username">
          <el-input v-model="userAdddate.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input type="password" v-model="userAdddate.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input type="email" v-model="userAdddate.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="70px" prop="mobile">
          <el-input v-model="userAdddate.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adduserShow = false">取 消</el-button>
        <el-button @click.stop="addUserPost">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户弹出框 -->
    <!-- :visible控制弹窗的显示与隐藏 -->
    <el-dialog title="修改用户" :visible.sync="updateUserShow">
      <!-- :model使用双向数据绑定，操作表单数据 -->
      <el-form :model="userUpdatedate" status-icon :rules="rules">
        <el-form-item label="用户名" label-width="70px" prop="username">
          <el-input v-model="userUpdatedate.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-model="userUpdatedate.email" label="邮箱" label-width="70px" prop="email">
          <el-input type="email" v-model="userUpdatedate.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-model="userUpdatedate.mobile" label="电话" label-width="70px" prop="mobile">
          <el-input v-model="userUpdatedate.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click.stop="updateUserPost">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色弹出框 -->
    <el-dialog title="修改角色" :visible.sync="rolesShow">
      <!-- :model使用双向数据绑定，操作表单数据 -->
      <el-form status-icon :rules="rules">
        <el-form-item label="用户名:" label-width="70px">
          <span>{{roledate.username}}</span>
        </el-form-item>
        <el-form-item label="角色名称" label-width="70px">
          <el-select v-model="roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesShow = false">取 消</el-button>
        <el-button type="primary" @click="roleUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="48"></el-table-column>
      <el-table-column property="username" label="姓名" width="150"></el-table-column>
      <el-table-column property="email" label="邮箱" width="300"></el-table-column>
      <el-table-column property="mobile" label="电话" width="300"></el-table-column>
      <el-table-column property label="状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="mgStateChange(scope)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column property label="操作" width="397">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="small"
            @click.stop="userUpdate(scope)"
          ></el-button>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="small"
            @click.stop="userDelete(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            plain
            icon="el-icon-check"
            size="small"
            @click.stop="roleShow(scope)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="pageChange"
        :page-sizes="[5,10,15]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usertotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: "",
      tableData: [],
      // 添加用户
      adduserShow: false, //窗口默认为false
      userAdddate: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //  修改用户
      updateUserShow: false, //窗口默认为false
      userUpdatedate: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      // 修改角色
      roleId: "",
      roleList: [],
      roleListId: {},
      rolesShow: false,
      roledate: {},

      // 分页显示
      usertotal:0,
      sizePage: 5,
      pageNumber: 1,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 6 到 11 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址"
          }
        ]
        // mobile: [{ type: "number", message: "号码必须为数字值" }]
      }
    };
  },
  methods: {
    // query为可选参数
    getuserList(query = "") {
      if (query == "") {
        var url = `users?pagenum=${this.pageNumber}&pagesize=${this.sizePage}`;
      } else {
        var url = "users?pagenum=1&pagesize=10&query=" + query;
      }
      this.$myHttp({
        url,
        methods: "get"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.usertotal = data.total;
          this.tableData = data.users;
        } else {
        }
      });
    },
    // 模糊搜索
    searchGet() {
      this.getuserList(this.searchData);
    },
    //添加用户
    addUserPost() {
      this.$myHttp({
        url: "users",
        method: "post",
        //data为存数据的数组，this.userAdddate为表单数据
        data: this.userAdddate
      }).then(backdata => {
        let { data, meta } = backdata.data;
        // console.log(data, meta);
        if (meta.status == 201) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          // 关闭添加用户窗口，重新请求数据渲染页面
          this.adduserShow = false;
          this.getuserList();
        }
        this.userAdddate.username = "";
        this.userAdddate.password = "";
        this.userAdddate.email = "";
        this.userAdddate.mobile = "";
      });
    },
    //修改用户
    userUpdate(scope) {
      this.updateUserShow = true;
      this.userUpdatedate = scope.row;
    },
    //发送修改的数据到数据库
    updateUserPost() {
      let id = this.userUpdatedate.id;
      let email = this.userUpdatedate.email;
      let mobile = this.userUpdatedate.mobile;
      this.$myHttp({
        url: `users/${id}`,
        method: "put",
        data: { email, mobile }
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.updateUserShow = false;
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
        this.getuserList();
      });
    },
    //取消修改用户操作
    cancel() {
      this.updateUserShow = false;
      this.getuserList();
    },
    //状态改变事件
    mgStateChange(scope) {
      this.$myHttp({
        url: `users/${scope.row.id}/state/${scope.row.mg_state}`,
        method: "put"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
          //数据库接口请求失败的时候，状态不动
          //用scope的$index就是点击元素的数组下标
          this.tableData[scope.$index].mg_state = !scope.row.mg_state;
        }
      });
    },
    //删除用户
    userDelete(id) {
      this.$myHttp({
        url: `users/${id}`,
        method: "delete"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$confirm("是否删除此用户", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getuserList();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "删除失败"
          });
        }
      });
    },
    //修改角色
    roleShow(scope) {
      this.$myHttp({
        url: "roles",
        method: "get"
      }).then(backdata => {
        this.roleList = backdata.data.data;
      });
      this.rolesShow = true;
      this.roledate = scope.row;
    },
    //分配角色
    roleUpdate() {
      this.$myHttp({
        // 接口要求 地址 /uid/role
        url: `users/${this.roledate.id}/role`,
        method: "put",
        data: {
          rid: this.roleId
        }
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.rolesShow = false;
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
      });
    },
     //控制每页显示数据条数
    sizeChange(size) {
      this.sizePage = size;
      this.getuserList();
    },
    //控制页码
    pageChange(size) {
      this.pageNumber = size;
      this.getuserList();
    }
  },

  //利用钩子函数在页面渲染之前获取用户列表数据
  mounted() {
    this.getuserList();
  }
};
</script>
<style lang="">
.el-breadcrumb {
  line-height: 3;
  background-color: #d3dce6;
}
.el-input-group {
  width: 30%;
}
.el-main {
  text-align: left;
  padding: 0 20px;
  line-height: 38px;
}
.el-input__inner {
  outline: none;
}
.el-input__inner:focus {
  border-color: #67c23a;
}
.el-input-group__append {
  background-color: #67c23a;
  color: white;
}
.el-input-group__append:hover {
  background-color: rgb(133, 199, 100);
}
th,
td {
  border-right: 1px solid #e9eef3;
}
.el-table_1_column_6 {
  border-right: 0;
}
.el-dialog__body .el-input {
  width: 50%;
}
.el-dialog__body .el-select > .el-input {
  width: 149%;
}

</style>
