<template>
  <div>
    <h1>Welcome to Task management system</h1>

    <div class="main-container">
      <v-row gutters>
        <v-col md="3">
          <h2>Cretae user</h2>
          <hr />
          <div>
            <!-- ragister -->
            <template>
              <div class="user-box">
                <v-text-field
                  v-model="email"
                  label="Email"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  hide-details="auto"
                  type="password"
                ></v-text-field>
                <v-text-field
                  v-model="username"
                  label="name"
                  hide-details="auto"
                ></v-text-field>

                <button @click="submit" class="btn">Create</button>
              </div>
            </template>
          </div>
        </v-col>
        <!-- login -->
        <v-col md="9" class="defult-bg">
          <div class="main-login-container">
            <div class="login-container">
              <v-text-field
                v-model="loginEmail"
                label="Email"
                required
              ></v-text-field>

              <v-text-field
                v-model="LoginPassword"
                label="Password"
                type="password"
                required
              ></v-text-field>

              <button class="btn" @click="login">Login</button>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div>
      <DragAble></DragAble>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      LoginPassword: '',
      loginEmail: '',
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    },
  },
  methods: {
    submit() {
      if (this.email && this.password && this.username) {
        let user = {
          email: this.email,
          password: this.password,
          username: this.username,
        }
        this.$store.commit('addUser', user)
        this.$toast.success('Successfully ragister')
        this.clear()
      } else {
        this.$toast.error('Error..! Enter all field')
      }
    },
    login() {
      console.log(this.LoginPassword, this.loginEmail, this.users)
      const activeUser = this.users.find((u) => {
        return u.email == this.loginEmail && u.password == this.LoginPassword
      })
      this.$store.commit('setActiveuser', activeUser)
      if (activeUser) {
        this.$toast.success('Successfully Login')
        this.$router.push('/')
      } else {
        this.$toast.error('Error..! Login field')
      }
      this.loginEmail = ''
      this.LoginPassword = ''
    },

    clear() {
      this.email = ''
      this.password = ''
      this.username = ''
    },
  },
}
</script>
