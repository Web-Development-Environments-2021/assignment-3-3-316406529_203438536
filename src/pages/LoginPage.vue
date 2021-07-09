<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form v-if="!isBusy" @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <div v-else class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
        busy: false,
      },
    };
  },
  computed: {
    isBusy() {
      return this.busy;
    },
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        this.busy = true;
        console.log(this.form.username);
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post("http://localhost:3000/login", {
          username: this.form.username,
          password: this.form.password,
        });
        this.axios.defaults.withCredentials = false;
        console.log(response);
        this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$root.toast("Login", "user logged in successfuly", "success");
        this.$router.push("/");
      } catch (err) {
        this.busy = false;
        this.$root.toast("Login", "user logged incorrect details", "failed");

        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.busy = false;

      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 450px;
  max-height: 40%;
  background-color: rgba(215, 237, 241, 0.61);
  position: relative;
  padding: 10pt;
  margin-bottom: 10%;
  margin-top: 5%;
  left: 0%;
  top: 20%;
}
</style>
