<template>
  <div class="container">
    <div class="title">
      <p>转专业模拟系统</p>
    </div>
    <div class="login-form">
      <el-form>
        <el-form-item>
          <el-input v-model="stu_id" prefix-icon="el-icon-user" placeholder="教务系统账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="stu_pass" prefix-icon="el-icon-key" placeholder="教务系统密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="submit-button" :disabled="loading || (stu_id === '' || stu_pass === '')" type="primary">{{ loading ? "正在登录..." : "登录" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  data() {
    return {
      stu_id: '',
      stu_pass: '',
      loading: false
    }
  },
  methods: {
    login: async function ()
    {
      this.loading = true
      let loginRes = await axios.post('/api/createSession',{
        stu_id: this.stu_id,
        pass: this.stu_pass
      })
      if(loginRes.data.status === 200)
      {
        this.$message({
          message: "登录成功",
          type: "success"
        })
        this.loading = false
        localStorage.setItem('name',loginRes.data.name)
        localStorage.setItem('gpa',loginRes.data.gpa)
        localStorage.setItem('stu_id',this.stu_id)
        location.href = "/home"
      }
      else {
        this.$message({
          message: loginRes.data.message,
          type: 'error'
        })
        this.loading = false
      }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: fixed;
}

.title {
  padding: 12px 24px;
  font-size: 1.4em;
}

.submit-button {
  width: 100%;
}
</style>
