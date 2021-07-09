<template>
  <div class="container">
    <!-- <h1 class="title">About page</h1> -->
    <div id="about-us-main-div" style="height:300px; weight:400px;">
      <b-card
        title="About us"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 40rem;"
        class="mb-2"
      >
        <b-card-text>
          This site developed by <strong>Aviran Giat & Noam Kotlar</strong>.
          Here you can manage the superliga games, Follow players,teams and stay
          tuned to the last news in league!⚽🥇
          <div>
            <!-- <br /> -->
            <h5>Technical tools we used:</h5>
            <h7>Node,Express,Javascript, SportMonks API, AzureDB</h7>
            <br />
            <h7>If you have any questions, Please send us an email☺</h7>
            <a
              href="mailto:kotlar@post.bgu.ac.il"
              target="_blank"
              class="btn btn-primary"
              >Email Us</a
            >
          </div>
        </b-card-text>

        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
div.container {
  position: fixed;
  top: -5px;
  height: 10%;
  /* background-color: rgba(215, 237, 241, 0.61); */
}
#about-us-main-div {
  position: absolute;
  left: 28%;
  top: 13%;
  /* background-color: rgba(215, 237, 241, 0.616); */
}
</style>
