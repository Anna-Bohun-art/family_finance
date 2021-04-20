<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg}');`"
        ></div>
        <router-view />
        <side-bar-menu />
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>
<script>
import SideBarMenu from "@/components/bars/SideBarMenu";
import FooterSmall from "@/components/footers/FooterSmall";
import registerBg from "@/assets/image/register_bg.png";

export default {
  data() {
    return {
      registerBg,
    };
  },
  components: {
    SideBarMenu,
    FooterSmall,
  },
};
</script>
