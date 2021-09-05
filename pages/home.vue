<template>
  <div class="home-container">
    <el-card class="card">
      <div slot="header" class="card-header">
        <span>系统说明</span>
      </div>
      <div class="desp">
        <!-- 在这里添加系统说明 -->
      </div>
    </el-card>
    <el-card class="card my-info-card">
      <div slot="header" class="card-header">
        <span>我的信息</span>
      </div>
      <div class="stu-info">
        <el-row class="stu-info-row"> 学号: {{ getStuId }} </el-row>
        <el-row class="stu-info-row"> 姓名: {{ getName }} </el-row>
        <el-row class="stu-info-row"> GPA: {{ getGPA }} </el-row>
      </div>
    </el-card>
    <el-card v-if="!has_chosen" class="card choose-major-card">
      <div slot="header" class="card-header">
        <span>选择专业</span>
      </div>
      <el-form>
        <el-form-item label="学院: ">
          <el-select
            class="select"
            v-model="college"
            @change="getMajors(college)"
            placeholder="请选择学院"
          >
            <el-option
              v-for="college in collegeList"
              :key="college.id"
              :label="college.name"
              :value="college.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业: ">
          <el-select
            :disabled="!college || college === ''"
            class="select"
            v-model="major"
            placeholder="请选择专业"
          >
            <el-option
              v-for="major in majorList"
              :key="major.id"
              :label="major.name"
              :value="major.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="!has_chosen" class="card verify-card">
      <div slot="header" class="card-header">
        <span>身份验证</span>
      </div>
      <el-row class="stu-info-row">
        <div class="verify-desp">
          为了验证是否为您本人在操作，我们需要发送一个验证码来检验您的身份，请放心，我们不会修改或窃取您的任何个人信息。
        </div>
      </el-row>
      <el-form>
        <el-form-item label="验证方式: ">
          <el-radio-group v-model="verify_type">
            <el-radio
              v-if="verify_Info.email && verify_Info.email !== ''"
              class="verify-type-radio"
              :label="3"
              >邮箱:
              {{ verify_Info.email }}
            </el-radio>
            <el-radio class="verify-type-radio" :label="2"
              >手机: {{ verify_Info.phone_number }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证码: ">
          <el-row>
            <el-input
              v-model="verify_code"
              class="verify-code-input"
              placeholder="请输入验证码"
            ></el-input>
            <el-button
              @click="sendVerifyCode"
              :disabled="seconds_count !== 0"
              type="primary"
            >
              {{ seconds_count === 0 ? "获取验证码" : `${seconds_count}s` }}
            </el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="验证: ">
          <el-row type="flex" justify="start">
            <el-button
              @click="verifyCode"
              :disabled="!verify_code_sent"
              type="primary"
              >点击这里验证</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="has_chosen" class="card">
      <div slot="header" class="card-header">
        <span>实时统计</span>
      </div>
      <el-row class="stu-info-row">
        <div>
          您选择的专业: <span style="color: deeppink">{{ major }}</span>
        </div>
      </el-row>
      <el-row class="stu-info-row">
        <div>
          您在这个专业当前排名:
          <span style="color: deeppink">{{ getMajorRank }}</span>
        </div>
      </el-row>
      <el-row class="stu-info-row">排名详情:</el-row>
      <el-table :data="major_stat" :row-class-name="tableClassName">
        <el-table-column prop="rank" label="排名" :width="100">
        </el-table-column>
        <el-table-column prop="stu_id" label="学号"> </el-table-column>
        <el-table-column prop="gpa_value" label="绩点"> </el-table-column>
      </el-table>
    </el-card>
    <div v-if="!has_chosen" class="submit-div">
      <el-button
        :disabled="major === ''"
        @click="submitMsg"
        class="submit-button"
        type="primary"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  name: "home",
  data() {
    return {
      name: "老王",
      gpa: "4.95",
      college: "",
      major: "",
      collegeList: [],
      majorList: [],
      verify_type: 2,
      verify_Info: {},
      verify_code_sent: false,
      seconds_count: 0,
      verify_code: "",
      has_chosen: false,
      major_stat: [],
    };
  },
  async asyncData(ctx) {
    if (document.cookie === "") {
      location.href = "/";
    }
  },
  async created() {
    await this.getColleges();
    await this.getMyChoice();
  },
  methods: {
    getChoiceStat: async function () {
      let resp = await axios.get("/api/stat");
      let stat = resp.data.data;
      this.major_stat = stat.map((item, index) => {
        item.rank = index + 1;
        return item;
      });
    },
    getMyChoice: async function () {
      let resp = await axios.get("/api/myChoice");
      if (resp.data.status === 200) {
        this.major = resp.data.data.major_name;
        this.has_chosen = true;
        await this.getChoiceStat();
      } else {
        await this.getVerifyInfo();
      }
    },
    getColleges: async function () {
      let resp = await axios.get("/api/college");
      this.collegeList = resp.data.data;
    },
    getMajors: async function (college_id) {
      this.major = "";
      let resp = await axios.get(`/api/major/${college_id}`);
      this.majorList = resp.data.data;
    },
    getVerifyInfo: async function () {
      try {
        let resp = await axios.get("/api/verify/info");
        this.verify_Info = resp.data.data;
      } catch (err) {
        console.error("身份验证信息获取失败");
      }
    },
    sendVerifyCode: function () {
      axios
        .post("/api/verify/send", {
          type: this.verify_type,
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            this.$message.success("验证码发送成功");
            this.verify_code_sent = true;
            this.startCount(120);
          } else {
            this.$message.error("验证码发送失败");
          }
        })
        .catch((err) => {
          this.$message.error("验证码发送失败");
        });
    },
    verifyCode: async function () {
      let resp = await axios.post("/api/verify/verify", {
        type: this.verify_type,
        code: this.verify_code,
      });
      if (resp.data.status === 200) {
        this.$message.success("验证成功");
      } else {
        this.$message.error("验证失败,请检查验证码!");
      }
    },
    startCount: function (second) {
      let _this = this;
      this.seconds_count = second;

      function setCount(second) {
        setTimeout(function () {
          if (second !== 0) {
            _this.startCount(second - 1);
          }
        }, 1000);
      }

      setCount(second);
    },
    submitChoice: async function () {
      let resp = await axios.post("/api/submit", {
        major_choice: this.major,
      });
      if (resp.data.status === 200) {
        this.$alert(
          "提交成功, 现在刷新此页面可以查看所填报专业的实时排行啦",
          "提示",
          { type: "success" }
        )
          .then((_) => {})
          .catch((_) => {});
        document.cookie = "";
        setTimeout(() => {
          location.reload();
        }, 3000);
      } else {
        this.$alert(resp.data.message, "错误", { type: "error" })
          .then((_) => {})
          .catch((_) => {});
      }
    },
    submitMsg: async function () {
      this.$confirm("一旦提交则不可修改，确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.submitChoice();
        })
        .catch(() => {
          this.$message.info("已经取消提交");
        });
    },
    tableClassName: function ({ row }) {
      if (row.stu_id === this.getStuId) {
        return "selected-row";
      }
      return "";
    },
  },
  computed: {
    getName: function () {
      return localStorage.getItem("name") || this.name;
    },
    getGPA: function () {
      return localStorage.getItem("gpa") || this.gpa;
    },
    getMajorRank: function () {
      let stu_id = localStorage.getItem("stu_id");
      let major_stat = this.major_stat;
      for (let item of major_stat) {
        if (item.stu_id === stu_id) {
          return item.rank;
        }
      }
      return "未知";
    },
    getStuId: function () {
      return localStorage.getItem("stu_id");
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .home-container {
    margin: 64px 84px;
  }
}

.add-group-link {
  transform: translateY(-2px);
}

.card {
  margin-bottom: 32px;
}

.card-header {
  font-size: 1.2em;
}

.stu-info-row {
  padding: 6px 0;
}

.select {
  width: 320px;
}

.verify-code-input {
  max-width: 120px;
  margin-right: 12px;
}

.submit-div {
  text-align: center;
  padding-bottom: 64px;
}

.verify-type-radio {
  padding: 12px 0;
}

.submit-button {
  width: 320px;
}
</style>
