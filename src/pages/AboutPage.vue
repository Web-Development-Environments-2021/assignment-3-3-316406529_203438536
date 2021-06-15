<template>
  <div class="container">
    <!-- <h1 class="title">About page</h1> -->
    <div id="about-us-main-div">
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
          This site developed by Aviran Giat and Noam Kotlar.
          <div>
            <br />
            <h5>Tools:</h5>
            <h6>Node.js, Vue.js, Azure-DB, Javascript</h6>
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
>
<script>
export default {};
</script>
<style scoped>
div.container {
  background-color: rgba(215, 237, 241, 0.61);
}
#about-us-main-div {
  position: absolute;
  left: 28%;
  top: 13%;
  background-color: rgba(215, 237, 241, 0.616);
}
</style>
