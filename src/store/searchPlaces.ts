import { defineStore } from "pinia";
import { ref } from "vue";
import { geocodingInstance } from "@/http/instances";

export const useSearchPlaces = defineStore("search-places-store", () => {
  const places = ref<[]>();
  const { searchPlace } = geocodingInstance();
  const notFound = ref<boolean>(false);

  async function searchPlaces(q: string) {
    if (q.length === 0) {
      places.value = [];
      return;
    }

    if (q.length <= 2) {
      return;
    }

    try {
      const response = await searchPlace(q);

      if (response?.data.data.length) {
        if (notFound.value) {
          notFound.value = false;
        }

        places.value = response?.data.data;

        return;
      }

      if (!response?.data.data.length) {
        places.value = [];
        notFound.value = true;
      }
    } catch (error) {}  
  }

  return { searchPlaces, places, notFound };
});
