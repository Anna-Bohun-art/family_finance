<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
           :style="`background-image: url('${registerBg}');`"
        >
        </div>
        <router-view />
        <Footer />
      </section>
    </main>
  </div>
</template>
<script>
import Footer from "@/components/footers/Footer";
import registerBg from "@/assets/image/register_bg.png";


export default {
  data() {
    return {
      registerBg,
    };
  },
  components: {
    Footer,
  },
};
</script>
