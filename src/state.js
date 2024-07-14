import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
  base_api_url: "http://127.0.0.1:8000",
  photos_endpoint: "/api/photos",
  photos: null,
  results: null,
  category: "",
  categories: [],

  fetchData(url) {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.photos = response.data.results.data;
        this.results = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  goTo(url) {
    this.fetchData(url);
  },

  filterByCategory() {
    if (!category) return this.photos;
    return this.photos.filter(photo);
  },
});
