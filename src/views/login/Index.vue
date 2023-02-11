<template>
  <div class="login">

    <div class="right-wrap">
      <div class="login-wrap">
        <div class="form">
          <div class="loginOrRegister">
            <div class="login-status" :class="{active:pattern==='login'}" @click="toggleLoginRegister('login')"></div>
            <div class="register-status" :class="{active:pattern==='register'}" @click="toggleLoginRegister('register')"></div>
            <label class="login-label">登录</label>
            <label class="register-label">注册</label>
          </div>
          <template v-if="pattern==='login'">
            <div class="login-box">
              <el-form :model="loginParams" label-width="80" ref="loginFormRule" :rules="loginRules">
                <el-form-item prop="username" label="账号">
                  <el-input
                      placeholder="请输入账号"
                      size="default"
                      @keydown.enter="loginUser(loginFormRule)"
                      v-model.trim="loginParams.username"/>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                  <el-input
                      placeholder="请输入密码"
                      size="default"
                      v-model.trim="loginParams.password"
                      type="password"
                      :show-password="true"
                      autocomplete="off"
                      @keydown.enter="loginUser(loginFormRule)"
                  />
                </el-form-item>
              </el-form>
              <el-row>
                <span class="forgot-password">忘记密码</span>
              </el-row>
              <el-row style="margin-top: 30px">
                <el-button class="login-btn" @click="loginUser(loginFormRule)">
                  {{ btnText }}
                </el-button>
              </el-row>
            </div>
          </template>
          <template v-else>
            <div class="register-box">
              <el-form :model="registerParams" label-width="80px" ref="registerFormRule" :rules="registerRules">
                <el-form-item prop="username" label="账号">
                  <el-input placeholder="请输入账号" size="default" v-model.trim="registerParams.username"/>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                  <el-input placeholder="请输入密码" type="password" :show-password="true" size="default" v-model.trim="registerParams.password"/>
                </el-form-item>
                <el-form-item prop="username" label="昵称">
                  <el-input placeholder="请输入昵称" size="default" v-model.trim="registerParams.nickname"/>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                  <el-input placeholder="请输入邮箱" size="default" v-model.trim="registerParams.email"/>
                </el-form-item>
                <el-form-item prop="code" label="">
                  <div class="code_list">
                    <el-input placeholder="请输入验证码" size="default" v-model.trim="registerParams.code"/>
                    <el-button class="code_btn" type="primary" @click="getCode">获取验证码</el-button>
                  </div>
                </el-form-item>
<!--                <el-form-item prop="identifyPassword" label="确认密码">-->
<!--                  <el-input placeholder="再次输入密码" type="password" :show-password="true" size="default" v-model.trim="registerParams.identifyPassword"/>-->
<!--                </el-form-item>-->
              </el-form>
              <el-row style="margin-top: 30px">
                <el-button class="login-btn" @click="registerUser(registerFormRule)">
                  {{ btnText }}
                </el-button>
              </el-row>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import type { FormInstance, FormRules } from 'element-plus'
  import {login, register, sendMail} from '@/api/user'
  import { setToken } from '@/hooks/user'

  const pattern = ref<any>('login') // 登录/注册
  const btnText = ref('登录')

  const router = useRouter()
  onMounted(() => {
  })


  const loginParams = reactive({
    username: '',
    password: ''
  })
  const registerParams = reactive({
    username: '',
    nickname: '',
    email: '',
    password: '',
    code: ''
    // identifyPassword: ''
  })

  // 清空注册表单
  const resetRegisterParams = () => {
    for (const t in registerParams) {
      registerParams[t] = ''
    }
  }

  // 切换登录/注册
  const toggleLoginRegister = (val) => {
    if (val === 'login') {
      pattern.value = 'login'
      btnText.value = '登录'
      resetRegisterParams()
    } else {
      pattern.value = 'register'
      btnText.value = '注册'
      // 清空登录表单
      for (const t in loginParams) {
        loginParams[t] = ''
      }
    }
  }

  const loginFormRule = ref<FormInstance>()
  const registerFormRule = ref<FormInstance>()
  const loginRules = reactive<FormRules>({
    username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
  })
  const registerRules = reactive<FormRules>({
    username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
    nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
    email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
    // identifyPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
  })

  // 用户登录
  const loginUser = async(formEl:any) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        login(loginParams).then((res:any) => {
          const status = res.status
          if (Number(status) === -1) {
            ElMessage.error(res.msg)
          }
          setToken(res.data)
          router.push({name: '主页'})
        })
      }
    })
  }
  // 用户注册
  const registerUser = async(formEl:any) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        register(registerParams).then((res:any) => {
          const status = res.status
          if (Number(status) !== -1) {
            resetRegisterParams()
            ElMessage.success('注册成功，请登录')
            pattern.value = 'login'
            btnText.value = '登录'
          }
        })
      }
    })
  }

  // 获取验证码
  const getCode = () => {
    // 验证邮箱 registerParams.email

    sendMail({
      email: registerParams.email
    }).then(res => {
      console.log(res)
    })
  }

</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;

    .login-box {
      :deep(.el-form-item) {
        margin: 28px 0 0 0;
      }
    }
    .register-box {
      :deep(.el-form-item) {
        margin: 14px 0;

        .el-cascader {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
    :deep(.el-form) {
      .el-form-item {

        .el-form-item__content {
          line-height: 32px;

          .el-input {
            .el-input__inner{
              &:focus {
                border: 1px solid #4E83FD;
              }
              &:hover {
                background: #F5F5F5;
              }
            }
          }

          .code_list {
            display: flex;

            .code_btn {
              margin-left: 20px;
            }
          }

        }
      }
    }

    :deep(.el-input--medium) .el-input__inner {
      height: 40px;
      line-height: 40px;
    }

    .right-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #FFF;

      .login-wrap {
        width: 440px;
        height: 550px;
        border-radius: 5px;
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-size: cover;
        box-shadow: 0 0 10px rgba(28, 76, 186, .1);

        .form {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 40px 30px;
          background: #fff;

          .loginOrRegister {
            display: flex;
            height: 46px;
            font-size: 22px;
            white-space: nowrap;
            position: relative;
            overflow: hidden;

            .login-status,.register-status {
              height: 46px;
              width: calc(50% + 23px);
              text-align: center;
              transform: skew(-45deg);
              cursor: pointer;
            }
            .active {
              background: #4E83FD20;
            }
            .login-status {
              position: absolute;
              top: 0;
              left: -23px;
            }
            .register-status {
              position: absolute;
              top: 0;
              right: -23px;
            }
            .login-label {
              position: absolute;
              top: 50%;
              left: 25%;
              transform: translate(-50%, -50%);
              pointer-events: none;
            }
            .register-label {
              position: absolute;
              top: 50%;
              right: 25%;
              transform: translate(50%, -50%);
              pointer-events: none;
            }
          }

          .input-label {
            color: #333;
            font-size: 14px;
            display: block;
            text-align: left;
          }

          .forgot-password {
            margin: 5px 0 0 auto;
          }

          .code {
            display: flex;
            justify-content: space-between;

            .el-input {
              flex: 1;
              margin-right: 20px;
            }

            img {
              width: 115px;
              height: 40px;
              cursor: pointer;
              border-radius: 5px;
              background: #f8f8f8 !important;
            }
          }

          .login-btn {
            width: 100%;
            height: 40px;
            border: 0;
            color: #fff;
            background: #4E83FD;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 680px) {
    .login {
      width: 100%;
      height: 100vh;

      .left-wrap {
        display: none;
      }

      .right-wrap {
        width: 100%;

        .login-wrap {
          width: 100%;
          height: auto;
          border-radius: 0;
          position: relative;
          box-shadow: none;

          .form {
            padding: 0px 30px;

            h3 {
              display: none;
            }
          }
        }
      }
    }
  }
</style>