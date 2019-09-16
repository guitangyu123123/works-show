<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="48"></el-table-column>
      <el-table-column property="authName" label="权限名称" width="150"></el-table-column>
      <el-table-column property="path" label="路径" width="300"></el-table-column>
      <el-table-column property="level" label="层级" width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-if="scope.row.level == 1">二级</span>
          <span v-if="scope.row.level == 2">三级</span>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
         tableData:[],
    }
  },
  methods: {getuserList() {
      this.$myHttp({
        url:'rights/list',
        methods: "get"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.tableData = data;
        } else {
        }
      });
    },

  },
  mounted() {
        this.getuserList();
  },
};
</script>
<style lang="">
th,
td {
  border-right: 1px solid #e9eef3;
}
.el-main {
  text-align: left;
  padding: 0 20px;
}
.el-table__footer-wrapper, .el-table__header-wrapper{
  line-height: 30px;

}
.el-breadcrumb{
      line-height: 3;
    background-color: #d3dce6;
}
</style>
