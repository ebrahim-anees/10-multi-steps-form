<template>
  <div class="main-box d-flex">
    <div class="sidebar-container">
      <div class="side-bar py-4 px-3">
        <SideBar />
      </div>
    </div>
    <div class="main-section">
      <YourInfo v-if="stepNum == 1" />
      <SelectPlan v-else-if="stepNum === 2" />
      <AddOns v-else-if="stepNum === 3" />
      <FormSummary v-else-if="stepNum === 4" />
      <ThankMsg v-else-if="stepNum === 5" />
    </div>
    <BtnsContainer v-if="stepNum !== 5" />
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";

.main-box {
  height: 500px;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    background-color: $white;
    box-shadow: 0 0 5px $light-gray;
    border-radius: 8px;
    padding: 10px;
    position: relative;
  }
  .sidebar-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: -1;
    @media (min-width: 768px) {
      position: relative;
      width: auto;
      z-index: 1;
    }
    .side-bar {
      background: {
        image: url("@/assets/images/bg-sidebar-mobile.svg");
        repeat: no-repeat;
        size: cover;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      @media (min-width: 768px) {
        background-image: url("@/assets/images/bg-sidebar-desktop.svg");
        width: 200px;
        height: 362px;
        min-height: 100%;
        display: block;
        border-radius: 10px;
      }
    }
  }
  .main-section {
    background-color: $white;
    box-shadow: 0 0 5px $light-gray;
    border-radius: 8px;
    padding: 35px 35px 60px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    max-width: calc(100% - 30px);
    height: 470px;
    @media (min-width: 576px) {
      height: 420px;
    }
    @media (min-width: 768px) {
      height: 400px;
      width: 550px;
      padding: {
        top: 20px;
        left: 50px;
        bottom: 0;
      }
      box-shadow: none;
      border-radius: 0;
      position: relative;
      left: auto;
      top: auto;
      transform: translateX(0);
    }
  }
  .gap {
    @media (max-width: 767px) {
      padding: 40px 0;
    }
  }
}
</style>

<script>
import SideBar from "@/components/SideBar.vue";
import YourInfo from "@/components/YourInfo.vue";
import SelectPlan from "@/components/SelectPlan.vue";
import AddOns from "@/components/AddOns.vue";
import FormSummary from "@/components/FormSummary.vue";
import ThankMsg from "@/components/ThankMsg.vue";
import BtnsContainer from "@/components/BtnsContainer.vue";

import { mapState } from "vuex";
export default {
  name: "FormView",
  components: {
    SideBar,
    YourInfo,
    SelectPlan,
    AddOns,
    FormSummary,
    ThankMsg,
    BtnsContainer,
  },
  computed: {
    ...mapState(["stepNum"]),
  },
};
</script>
