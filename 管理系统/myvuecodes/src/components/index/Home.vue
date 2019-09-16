<template>
  <el-container>
    <el-header>
      <el-col :span="4">
        <div class="grid-content">
          <img src="../../../static/logo.jpg" alt />
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content">
          <h1>品优购后台管理系统</h1>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content">
          <el-button type="text" @click.stop="loginOut">退出</el-button>
        </div>
      </el-col>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            :router="true"
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#d3dce6"
            text-color="#000000"
            active-text-color="#ffd04b"
          >
            <el-submenu v-for="item1 in menuList" :index="item1.path" :key="item1.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item1.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="item2.path" v-for="item2 in item1.children" :key="item2.id">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{item2.authName}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!--
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="roles">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色列表</span>
                  </el-menu-item>
                  <el-menu-item index="rights">
                    <i class="el-icon-menu"></i>
                    <span slot="title">权限列表</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品列表</span>
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">分类参数</span>
                  </el-menu-item>
                  <el-menu-item index="3-3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品分类</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

                 <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单列表</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

               <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">
                    <i class="el-icon-menu"></i>
                    <span>数据报表</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>-->
          </el-menu>
        </el-col>
      </el-aside>
      <!--显示内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: []
    };
  },
  //如果没有token记录，直接跳转到登录页面
  //利用钩子函数，在页面渲染之前，获取判断用户登录信息
  mounted() {
    this.getMenus();
    var token = window.localStorage.getItem("token");
    if (!token) {
      this.$message({
        type: "error",
        message: "请先登录！"
      });
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    getMenus() {
      this.$myHttp({
        url: "menus",
        method: "get"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        this.menuList = data;
        // console.log(data);
      });
    },
    //退出功能
    loginOut() {
      //删除token，跳转到登录界面
      this.$confirm("即将退出系统,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功！"
          });
          window.localStorage.clear("token");
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style>
.el-button--text {
  color: black;
}
.el-submenu__title {
  padding: 0 70px;
  padding-left: 0;
}
.grid-content img {
  float: left;
}
.grid-content a {
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: wheat;
  color: black;
  text-decoration: none;
}
.grid-content a:hover {
  color: white;
  background-color: black;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-header {
  height: 100px !important;
  padding: 0;
  line-height: 100px;
}
.el-header h1 {
  font-size: 50px;
  color: white;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100%;
}
</style>
