<template>
  <div class="user_info">
    <xt-back />
    <div class="user_mag">

      <div class="user_img">
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="/api/userMsg/updateAvatar"
            method="post"
            :headers="token"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="avatar"
        >
          <img :src="imageUrl" alt="" class="img_show">
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

        <div class="text">更换头像</div>
      </div>
      <div class="text_msg">
        <template v-if="isEdit">
          <el-form :model="updateMsg" label-width="50px">
            <el-form-item label="昵称">
              <el-input v-model="updateMsg.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="updateMsg.email"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else>
          <el-form label-width="50px">
            <el-form-item label="昵称">
              <span>{{user.nickname}}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{user.email}}</span>
            </el-form-item>
          </el-form>
        </template>
        <el-button class="edit" @click="updateUserInfo()">{{isEdit?'保存':'编辑资料'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import type { UploadProps } from 'element-plus'

import {updateUserMsg, updateUserPic} from "@/api/user";
import {user, setToken} from "@/hooks/user";
import XtBack from "@/modules/xt-ui/components/back/Index.vue";

onMounted(async() => {

})

//
const token = computed({
  get: () => {
    const token = localStorage.getItem('token')
    if(token) {
      return {
        Authorization: token // 设置token
      }
    }
    return {}
  },
  set: (val) => {

  }
})

const imageUrl = ref<string>(user.user_pic)

// 更新用户头像
//文件上传成功时的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

//上传文件之前的钩子，参数为上传的文件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片格式必须是jpg或png!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('头像不能大于5MB!')
    return false
  }
  return true
}


const isEdit = ref<boolean>(false)
const updateMsg = reactive({
  id: user.id,
  nickname: user.nickname,
  email: user.email
  // user_pic: user.user_pic
})
//更新用户信息
const updateUserInfo = async () => {
  if(isEdit.value) {
    const res = await updateUserMsg(updateMsg)
    const {status, msg, data} = res
    if (status === 200) {
      setToken({
        ...data,
        token: localStorage.getItem('token')
      })
    } else {
      ElMessage.error(msg)
    }
  }
  isEdit.value = !isEdit.value
}

</script>

<style scoped lang="less">
.user_info {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .user_mag {
    min-width: 350px;
    max-width: 640px;
    width: 40%;
    margin: 58px auto;
    box-shadow: 0 0 12px #999;
    border-radius: 4px;
    padding: 8px 12px;
    display: flex;

    .user_img {
      width: 40%;
      position: relative;
      cursor: pointer;

      .img_show {
        width: 100%;
        vertical-align: top;
      }

      &:hover {
        :deep(.el-upload) {
          .el-icon {
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 60px;
            font-weight: 700;
            color: #c1c8ce;
          }
        }

        .text {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 40px;
          background-color: #dfdfdf60;
          font-size: 18px;
          text-align: center;
          line-height: 40px;
        }
      }

      :deep(.el-upload) {
        .el-icon {
          display: none;
        }
      }
      .text {
        display: none;
      }

    }

    .text_msg {
      width: 60%;

      :deep(.el-form) {

        .el-form-item {
          word-break: break-all;
        }
        .el-input__inner {
          //width: calc(100% - 40px);
        }
      }
    }

  }
}
</style>
