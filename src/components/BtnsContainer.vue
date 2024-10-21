<template>
  <div class="btns-container">
    <div class="container">
      <button
        :class="['previous-step', 'text-capitalize']"
        v-if="stepNum > 1 && stepNum < 5"
        @click="stepDecrement"
      >
        go back
      </button>
      <button
        :class="['next-step', 'text-capitalize', { purplish: stepNum === 4 }]"
        v-if="stepNum <= 4"
        @click="nextStep"
      >
        next step
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";
.btns-container {
  position: absolute;
  width: 100vw;
  left: 0;
  bottom: 0;
  height: 70px;
  background-color: white;
  @media (min-width: 768px) {
    width: calc(550px - 80px);
    left: auto;
    right: 45px;
    background-color: transparent;
  }
  .container {
    display: flex;
    align-items: center;
    @media (min-width: 768px) {
      padding: 0;
    }
  }
  .next-step {
    background-color: rgba($marine-blue, 0.9);
    color: $white;
    text-transform: uppercase;
    font-weight: 400;
    border: none;
    padding: 7px 15px;
    border-radius: 5px;
    transition: 0.1s ease-in-out;
    margin-left: auto;
    &:hover {
      background-color: rgba($marine-blue, 1);
    }
    &.purplish {
      background-color: rgba($purplish-blue, 0.9);
      &:hover {
        background-color: rgba($purplish-blue, 1);
      }
    }
  }
  .previous-step {
    margin-right: auto;
    color: $cool-gray;
    background-color: transparent;
    border: none;
    font-size: 14px;
    height: fit-content;
    font-weight: 700;
    transition: 0.2s;
    &:hover {
      color: $marine-blue;
    }
  }
}
</style>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BtnsContainer",
  data() {
    return {
      isValid: true,
    };
  },
  computed: {
    ...mapState(["stepNum", "personalInfo", "selectPlan"]),
  },
  methods: {
    ...mapMutations(["stepIncrement", "stepDecrement", "clearError"]),
    nextStep() {
      if (this.stepNum == 1) {
        this.clearError();
        this.isValid = true;
        this.step1Check();
        this.isValid ? this.stepIncrement() : "";
      } else if (this.stepNum == 2) {
        if (this.selectPlan.chosenPlan) {
          this.step2Check();
        }
      } else {
        this.stepIncrement();
      }
    },
    step1Check() {
      const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
      if (
        !namePattern.test(this.personalInfo.name) ||
        !this.personalInfo.name
      ) {
        this.personalInfo.error.name = true;
        this.isValid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.personalInfo.email)) {
        this.personalInfo.error.email = true;
        this.isValid = false;
      }
      const phonePattern = /^[0-9]{10,}$/;
      if (!phonePattern.test(this.personalInfo.phone)) {
        this.personalInfo.error.phone = true;
        this.isValid = false;
      }
    },
    step2Check() {
      if (
        this.selectPlan.chosenCost.slice(-2) ===
          this.selectPlan.currentType.slice(0, 2) ||
        (this.selectPlan.chosenCost.slice(-2) === "yr" &&
          this.selectPlan.currentType === "yearly")
      ) {
        this.stepIncrement();
      }
    },
  },
};
</script>
