<template>
  <ul class="steps d-flex">
    <li class="step-box mb-3" v-for="step in formData" :key="step.navTitle">
      <div
        :class="[
          'step-num',
          'd-flex',
          'justify-content-center',
          'align-items-center',
          'rounded-circle',
          { currentStep: step.step === stepNum },
        ]"
      >
        {{ step.step }}
      </div>
      <div class="step-info">
        <h3 class="step">step {{ step.step }}</h3>
        <h4 class="step-name">{{ step.navTitle }}</h4>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";

.steps {
  width: fit-content;
  position: relative;
  top: -25px;
  @media (min-width: 768px) {
    flex-direction: column;
    top: auto;
  }
  .step-box {
    display: flex;
    align-items: center;
    .step-num {
      width: 38px;
      height: 38px;
      font-size: 19px;
      @media (min-width: 768px) {
        width: 24px;
        height: 24px;
        font-size: 12px;
      }
      border: 1px solid $white;
      margin-right: 9px;
      font-weight: 700;
      color: $white;
    }
    .step-info {
      display: none;
      @media (min-width: 768px) {
        display: block;
        .step {
          font-size: 11px;
          margin-bottom: 0;
        }
        .step-name {
          font-size: 11px;
          margin-bottom: 0;
          letter-spacing: 0.5px;
        }
      }
    }
  }
}
.currentStep {
  background-color: $light-blue;
  color: $marine-blue !important;
  border-color: $light-blue !important;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  computed: {
    ...mapState(["formData", "stepNum"]),
  },
};
</script>
