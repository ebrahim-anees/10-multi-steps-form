<template>
  <div class="container">
    <FormView />
  </div>
</template>

<style lang="scss">
.container {
  height: 100%;
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<script>
import FormView from "@/views/FormView.vue";
export default {
  name: "App",
  components: {
    FormView,
  },
};
</script>
