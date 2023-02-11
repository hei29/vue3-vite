<template>
  <div class="user_manage">
    <xt-back />
    <el-table :data="userList">
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="创建时间" prop="account_create_time"></el-table-column>
      <el-table-column label="权限" prop="authority">
        <template #default="scope">
          <el-select v-model="scope.row.authority" @change="(val) => changeAuthority(val, scope.row)">
            <el-option
                v-for="(t,i) in options"
                :label="t.label"
                :value="t.value"
                :key="i"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import {userManage, updateUserMsg} from '@/api/user'
  import {onMounted, ref} from "vue";
  import XtBack from "@/modules/xt-ui/components/back/Index.vue";

  const userList = ref<any>([])
  onMounted(() => {
    getManageList()
  })

  const options = [
    {
      label: '管理员',
      value: 1
    }, {
      label: '用户',
      value: 2
    }]
  const getManageList = () => {
    userManage().then((res) => {
      const {data} = res
      userList.value = data
    })
  }

  const changeAuthority = (val, row) => {
    updateUserMsg(row).then(res => {
      getManageList()
    })
  }
</script>

<style scoped lang="less">
.user_manage {
  width: 100%;
  padding: 60px 20px 0;
}
</style>
