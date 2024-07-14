<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      photos: null,
      respData: null,
    };
  },

  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/photos")
      .then((response) => {
        console.log(response);
        this.photos = response.data.results.data;
        this.respData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<template>
  <section class="photos" v-if="photos">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col" v-for="photo in photos">
          <div class="card">
            <img :src="photo.upload" alt="" />
            <div class="card-body">
              {{ photo.title }}
            </div>
            <div class="card-footer">
              <div class="d-flex g-1">
                <a
                  class="btn btn-sm btn-dark"
                  href=""
                  v-for="cat in photo.categories"
                  >{{ cat.name }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
