<template>
  <div>
    <el-button type="success" class="addUser" @click="addUser">添加角色</el-button>
    <el-table :data="roleListData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 所有列表父容器 -->
          <el-row v-for="(item1,key1) in scope.row.children" :key="item1.id">
            <!-- 左侧一级列表 -->
            <el-col :span="4">
              <el-tag
                closable
                @close="deleteTag(scope.row,key1,scope.row.id,item1.id)"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 右侧二三级列表 -->
            <el-col :span="20">
              <!-- 右侧列表父容器 -->
              <el-row v-for="(item2,key2) in item1.children" :key="item2.id">
                <!-- 二级列表 -->
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="deleteTag(item1,key2,scope.row.id,item2.id)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级列表 -->
                <el-col :span="18">
                  <!-- 取消授权事件传递父元素，元素本身下标，用户id，权限id -->
                  <el-tag
                    v-for="(item3,key3) in item2.children"
                    :key="item3.id"
                    closable
                    type="warning"
                    @close="deleteTag(item2,key3,scope.row.id,item3.id)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 表头 -->
      <el-table-column type="index" width="48"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <!-- 操作栏 -->
      <el-table-column property label="操作" width="397">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="small"
            @click="updateRoleMsg(scope.row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="small"
            @click="deleteRole(scope.row.id)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button
            type="success"
            plain
            icon="el-icon-check"
            size="small"
            @click.stop="updateRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限弹窗 -->
    <el-dialog title="角色权限" :visible.sync="roleShow">
      <el-tree
        ref="tree"
        default-expand-all
        :data="roletreeDate"
        show-checkbox
        node-key="id"
        :default-checked-keys="roleIdData"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleShow = false">取 消</el-button>
        <el-button type="primary" @click="roleEditPost">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addUserShow">
      <el-form :model="roleAdddate" status-icon :rules="rules">
        <el-form-item label="角色名称" label-width="70px" prop="roleName">
          <el-input v-model="roleAdddate.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="70px" prop="roleDesc">
          <el-input v-model="roleAdddate.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserShow = false">取 消</el-button>
        <el-button type="primary" @click="addUserPost">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色信息 -->
    <el-dialog title="添加角色" :visible.sync="updateRoleShow">
      <el-form :model="updateRoleData" status-icon :rules="rules">
        <el-form-item label="角色名称" label-width="70px" prop="roleName">
          <el-input v-model="updateRoleData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="70px" prop="roleDesc">
          <el-input v-model="updateRoleData.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRoleShow = false">取 消</el-button>
        <el-button type="primary" @click="updateRolePost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //存放角色数据
      roleListData: [],
      //权限弹窗默认不显示
      roleShow: false,
      // 存放权限数据
      roletreeDate: [],
      //权限显示数据默认配置
      defaultProps: {
        children: "children",
        label: "authName"
      },
      // 权限id存放数组
      roleIdData: [],
      // 角色id存放数组
      rolesId: 0,
      // 添加角色弹窗默认false
      addUserShow: false,
      roleAdddate: {
        roleName: "",
        roleDesc: ""
      },
      // 输入规则
      rules: {
        roleName: [{ required: true, message: "请输入角色名称" }],
        roleDesc: [{ required: true, message: "请输入角色描述信息" }]
      },
      // 编辑角色信息
      updateRoleShow: false,
      updateRoleData: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    //获取数据
    getRoleLists() {
      this.$myHttp({
        url: "roles",
        method: "get"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        console.log(data, meta);
        this.roleListData = data;
      });
    },
    //删除角色权限标签
    deleteTag(item, key, roleId, rightId) {
      this.$myHttp({
        url: `roles/${roleId}/rights/${rightId}`,
        method: "delete"
      }).then(backdata => {
        console.log(backdata);
        let { data, meta } = backdata.data;
        console.log(backdata.data);
        if (meta.status == 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          item.children.splice(key, 1);
        } else {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      });
    },
    // 分配角色权限
    updateRole(scope) {
      this.rolesId = scope.id;
      var role = scope.children;
      var arr = [];
      role.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arr.push(item3.id);
          });
        });
      });
      this.$myHttp({
        url: "rights/tree",
        method: "get"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.roletreeDate = data;
          this.roleIdData = arr;
        }
      });
      this.roleShow = true;
    },
    //发送修改好的角色信息到服务器
    roleEditPost() {
      this.roleShow = false;
      var selectRolea = this.$refs.tree.getCheckedKeys();
      var selectRoleb = this.$refs.tree.getHalfCheckedKeys();
      var selectRolec = selectRolea.concat(selectRoleb).join();
      this.$myHttp({
        url: `roles/${this.rolesId}/rights`,
        method: "post",
        data: { rids: selectRolec }
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$message({
            message: "修改成功!",
            type: "success"
          });
          this.getRoleLists();
        }
      });
    },
    // 添加角色
    addUser() {
      this.addUserShow = true;
    },
    //请求接口，发送数据入库
    addUserPost() {
      this.$myHttp({
        url: "roles",
        method: "post",
        data: this.roleAdddate
      }).then(backdata => {
        console.log(backdata);
        let { data, meta } = backdata.data;
        if (meta.status == 201) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.addUserShow = false;
          this.getRoleLists();
        } else {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    //删除角色
    deleteRole(id) {
      this.$myHttp({
        url: `roles/${id}`,
        method: "delete"
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$confirm("是否删除此角色", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getRoleLists();
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
    //  编辑角色信息
    updateRoleMsg(row) {
      this.updateRoleShow = true;
      this.updateRoleData.roleName = row.roleName;
      this.updateRoleData.roleDesc = row.roleDesc;
      this.roleId = row.id;
    },
    // 发送修改信息到服务器
    updateRolePost() {
      console.log(this.roleId);
      this.$myHttp({
        url: `roles/${this.roleId}`,
        method:'put',
        data: this.updateRoleData
      }).then(backdata => {
        let { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.updateRoleShow = false;
          this.getRoleLists();
        }
      });
    }
  },
  //页面渲染之前获取所有数据
  mounted() {
    this.getRoleLists();
  }
};
</script>
<style lang="">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-main {
  padding: 0 20px;
  line-height: 30px;
  text-align: left;
}
.addUser {
  float: left;
}
th,
td {
  border-right: 1px solid #e9eef3;
}
.el-table__footer-wrapper,
.el-table__header-wrapper {
  line-height: 30px;
}
.el-tag {
  margin-bottom: 10px;
  margin-left: 10px;
}
.el-dialog__body .el-input {
  width: 50%;
}

.el-input-group {
  width: 30%;
}
.el-form-item__label {
  width: 80px !important;
}
</style>
