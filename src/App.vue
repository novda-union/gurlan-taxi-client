<script setup lang="ts">
import { Network } from "@capacitor/network";
import { onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOriginCoords } from "@/store/origin";
// import { useDarkMode } from "@/composables/useDarkMode";

// const { isDarkMode, enableDarkMode, disableDarkMode, checkDarkMode } = useDarkMode();
const originStore = useOriginCoords();
const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  Network.addListener("networkStatusChange", async (s) => {
    if (s.connected) {
      if (route.path === "/no-internet") {
        router.go(-1);
      }

      await originStore.getCoords();

      return;
    }

    router.push("/no-internet");
  });

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();

    if (status.connected) {
      if (route.path === "/no-internet") {
        router.go(-1);
      }

      await originStore.getCoords();

      return;
    }

    router.push("/no-internet");
  };

  await logCurrentNetworkStatus();
});
</script>

<template>
  <div class="app">
    <div
      class="fixed bg-primary text-primary-foreground rounded px-2 text-sm opacity-50 bottom-5 left-[60%] right-[50%] w-full"
    >
      {{ route.fullPath }}
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
