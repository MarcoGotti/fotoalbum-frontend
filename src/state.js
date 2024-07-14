import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
  base_api_url: "http://127.0.0.1:8000",
  photos_endpoint: "/api/photos",
  categories_endpoint: "/api/categories/",
  photos: null,
  results: null,
  category: "",
  categories: [],

  fetchData(url) {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        response.data.results.data
          ? (this.photos = response.data.results.data)
          : (this.photos = response.data.results.photos);
        /* this.photos.forEach(
          (photo) =>
            (photo.category_ids = photo.categories.map((cat) => cat.id))
        ); */
        this.results = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /* fetchAllData(url) {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.results);
        this.all_photos = response.data.results;
        this.all_photos.forEach(
          (photo) =>
            (photo.category_ids = photo.categories.map((cat) => cat.id))
        );
        console.log(this.all_photos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, */

  goTo(url) {
    this.fetchData(url);
  },

  /* filterByCategory(arr, category) {
    if (!category) return arr;
    return arr.filter((photo) => photo.category_ids.includes(category));
  }, */

  applyFilter() {
    if (!this.category) {
      const url = state.base_api_url + state.photos_endpoint;
      state.fetchData(url);
    } else {
      const url = this.base_api_url + this.categories_endpoint + this.category;
      console.log(url);
      state.fetchData(url);
    }
  },
});
