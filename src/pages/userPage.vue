<template>
  <div class="container" v-if="info">
    <h1>{{ info.lastname }}</h1>
    <div class="user_preview">
      <b-img v-if="info.picture != null" fluid :src="info.picture"></b-img>
      <ul>
        <li>User ID: {{ info.user_id }}</li>
        <li>User Name: {{ info.username }}</li>
        <li>First Name: {{ info.firstname }}</li>
        <li>Last Name: {{ info.lastname }}</li>
        <li>Birth country: {{ info.country }}</li>
        <li>Email: {{ info.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  components: {},
  data() {
    return {
      info: null,
    };
  },
  async mounted() {
    //send get request to server to get user details
    console.log("enter user page mounte!");
    this.axios.defaults.withCredentials = true;
    const username = this.$root.store.username;
    const result = await this.axios.get(
      `http://localhost:3000/users/userDetails`
    );
    console.log(result);
    this.axios.defaults.withCredentials = false;
    this.info = result.data[0];
  },
};
</script>

<style>
.user_preview {
  display: inline-block;
  width: 300px;
  height: flex;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  margin-top: 20px;
  background-color: rgba(215, 237, 241, 0.616);
}
#b {
  margin-top: 10px;
}

.user-preview .user-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.user-preview .user-content {
  width: 100%;
  overflow: hidden;
  background-color: rgba(215, 237, 241, 0.616);
}
</style>
