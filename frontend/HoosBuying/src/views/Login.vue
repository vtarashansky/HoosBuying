<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="username">Username:</label>
          <input type="text" name="username" v-model="form.username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="showError" id="error">Username or Password is incorrect</p>
      <router-link to="/register">Create New Account</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from '@/stores';
import bcrypt from 'bcryptjs'

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false,
      db_password: null,
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      try {
        this.db_password = await store.dispatch('getPassword', this.form.username)

        if (bcrypt.compareSync(this.form.password, this.db_password)) {
          const User = new FormData();
          User.append("username", this.form.username)
          User.append("password", this.form.password)

          await this.LogIn(User)
          this.$router.push("/");
          this.showError = false
        }
        else{
          this.showError = true
        }
      } catch (error) {
        // console.log("caught error", error)
        this.showError = true
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}


label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}

#error {
  color: red;
}
</style>