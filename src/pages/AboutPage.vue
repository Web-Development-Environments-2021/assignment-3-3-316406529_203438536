<template>
  <div class="container">
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
          tuned to the last news in league!⚽🥇 Tools: Node,Express,Javascript,
          SportMonks API, AzureDB
          <div>
            <h5>Last projects we worked on:</h5>
            <a
              href="https://web-development-environments-2021.github.io/203438536/"
              target="_blank"
              >Aviran's site
            </a>
            <a
              href="https://web-development-environments-2021.github.io/316406529/"
              target="_blank"
            >
              Noam's site</a
            >
            <a
              href="https://web-development-environments-2021.github.io/Assignment2-203438536_316406529/"
              target="_blank"
            >
              Packman game</a
            >
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
}
#about-us-main-div {
  position: absolute;
  left: 28%;
  top: 13%;
}
</style>
