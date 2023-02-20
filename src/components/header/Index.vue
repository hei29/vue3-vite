<template>
  <div class="nav_header">
    <div class="router_list">
      <router-link to="/pages/home" class="router_item" active-class="active">主页</router-link>
      <router-link to="/pages/AzurLanne" class="router_item" active-class="active">AzurLanne</router-link>
    </div>
    <div class="user_msg">
      <div class="user_pic">
        <img :src="user.user_pic" alt="" class="user-icon">
      </div>
      <div class="user_name">{{user.nickname}}</div>
      <el-dropdown trigger="click">
        <div class="login_fn"></div>
        <template #dropdown>
          <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
          <el-dropdown-item @click="userSetting">个人中心</el-dropdown-item>
          <el-dropdown-item v-if="user.authority<2" @click="userManage">用户管理</el-dropdown-item>
          <el-dropdown-item @click="modifyVisible = true">修改密码</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>

    <el-dialog v-model="modifyVisible" title="修改密码" width="400px">
      <el-form
          ref="formRef"
          :model="form"
          label-width="80px">
        <el-form-item
            prop="oldPwd"
            label="旧密码"
            :rules="[
                {
                  required: true,
                  message: '旧密码不能为空',
                  trigger: 'blur'
                }
            ]">
          <el-input v-model="form.oldPwd" type="password" :show-password="true" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item
            prop="newPwd"
            label="新密码"
            :rules="[
                {
                  required: true,
                  message: '新密码不为空',
                  trigger: 'blur'
                }
            ]">
          <el-input v-model="form.newPwd" type="password" :show-password="true" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <div class="btn-list">
          <el-button type="primary" @click="changePwd(formRef)">确定</el-button>
          <el-button style="margin-left: 36px" @click="modifyVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import {user} from "@/hooks/user";
import {onMounted, watch, ref, reactive} from "vue";
import {updateUserPwd} from "@/api/user";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

onMounted(() => {

})

// 登出
const exit = () => {
  localStorage.removeItem('token')
  router.push({name: '登录'})
}

// 个人中心, 修改用户信息
const userSetting = () => {
  router.push({path: '/userInfo'})
}

// 当前权限能管理的账号
const userManage = () => {
  router.push({name: '用户管理'})
}

const modifyVisible = ref<boolean>(false)
const form = reactive({
  oldPwd: '',
  newPwd: ''
})
// const pwdRules = reactive<FormRules>({
//   oldPwd: [{required: true, message: '新密码不为空', trigger: 'blur'}],
//   newPwd: [{required: true, message: '新密码不为空', trigger: 'blur'}]
// })
const formRef = ref<FormInstance>()
// 修改密码
const changePwd = async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((vaild) => {
    if(vaild) {
      updateUserPwd(form).then(res => {
        const {status, msg} = res
        if (status === 200) {
          ElMessage.success('密码修改成功请重新登录！')
          router.push({name: '登录'})
          modifyVisible.value = false
          localStorage.removeItem('token')
        } else {
          ElMessage.error(msg)
        }
      })
    }
  })
}
</script>

<style scoped lang="less">
  .nav_header {
    height: 3.5rem;
    width: 100%;
    box-shadow: 0 2px 5px #33333350;
    display: flex;
    align-items: center;
    padding: 0 24px;
    z-index: 20;

    .router_list {
      height: 2.5rem;
      padding-left: 6rem;

      .router_item {
        display: inline-block;
        margin-right: 2.5rem;
        line-height: 2.5rem;
        width: 6rem;
        text-decoration: none;
        background-color: #c9ccd090;
        color: #333333;
        border-radius: 6px;
      }
      .active {
        background-color: #409eff;
        //color: #4E83FD;
      }
    }

    .user_msg {
      display: flex;
      align-items: center;
      margin-left: auto;

      .user_pic {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 9999px;
        overflow: hidden;

        .user-icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user_name {
        padding: 0 5px;
      }

      .login_fn {
        width: 14px;
        height: 14px;
        cursor: pointer;
        background: url("./img/unflod.png") center no-repeat;
        background-size: 100%;
      }
    }

    :deep(.el-overlay) {
      .el-dialog {
        border-radius: 6px;

        .btn-list {
          display: flex;
          justify-content: center;
        }
      }
    }

  }


</style>
