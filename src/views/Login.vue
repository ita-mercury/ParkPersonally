<template>
  <div class="login-div">
    <div class="logo">
      <img src="../assets/logo.png" class="logo-img" alt="">
    </div>
    <div class="form-div">
      <Form ref="loginForm" :model="user" :rules="userRule">
        <FormItem prop="user">
          <Input type="text" size="large" v-model="user.name" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input size="large" type="password" v-model="user.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <RadioGroup class="role-radio-group" v-model="user.role">
          <Radio size="large" label="admin">
            <img class="radio-icon" src="../assets/image/admin.png" alt="">
            <span>Admin</span>
          </Radio>
          <Radio class="manager-radio" size="large" label="manager">
            <img class="radio-icon" src="../assets/image/manager.png" alt="">
            <span>Manager</span>
          </Radio>
        </RadioGroup>
        <FormItem class="login-form-item-submit">
          <Button type="primary" size="large" @click="handleSubmit('loginForm')">Sign in</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: 'a123456',
        password: '123456',
        role: 'manager'
      },
      userRule: {
        name: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.axios.post('token', this.user).then((response) => {
            this.axios.defaults.headers.common['Authorization'] = response.data
            if (this.user.role === 'manager') {
              this.$router.push({ name: 'home' })
            } else if (this.user.role === 'admin') {
              this.$router.push({ name: 'adminHome' })
            }
          }).catch((error) => {
            this.$Modal.error({
              title: '登录失败',
              content: error.response.data.message
            })
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
