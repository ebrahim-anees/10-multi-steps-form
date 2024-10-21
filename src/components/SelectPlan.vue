<template>
  <div class="form-container">
    <h1 class="step-title">{{ stepData.stepTitle }}</h1>
    <h2 class="step-info">{{ stepData.stepSubtitle }}</h2>
    <div class="form-box">
      <div
        :class="[
          'plan-box',
          {
            chosen: plansDetails[plan] === selectPlan.chosenCost,
          },
        ]"
        v-for="(plan, index) in Object.keys(plansDetails)"
        :key="index"
        @click="choosePlan(plan, plansDetails[plan])"
      >
        <div class="image">
          <img
            :src="require(`@/assets/images/icon-${plan}.svg`)"
            :alt="`${plan} icon`"
          />
        </div>
        <div class="info">
          <p class="plan-name">{{ plan[0].toUpperCase() + plan.slice(1) }}</p>
          <span class="plan-cost">${{ plansDetails[plan] }}</span>
          <span class="discount" v-if="selectPlan.currentType === 'yearly'"
            >2 months free</span
          >
        </div>
      </div>
    </div>
    <div class="payment-type">
      <p>Monthly</p>
      <label class="toggle-switch-container">
        <div
          :class="['toggle-switch', selectPlan.currentType]"
          @click="changePaymentType"
        ></div>
      </label>
      <p>Yearly</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";
.form-box {
  display: grid;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  gap: 15px;
  .plan-box {
    display: flex;
    align-items: center;
    flex-direction: row;
    text-align: left;
    gap: 15px;
    user-select: none;
    @media (min-width: 768px) {
      flex-direction: column;
      text-align: center;
      gap: 25px;
    }
    padding: 12px 15px;
    border: 1.5px solid $light-gray;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover,
    &.chosen {
      border-color: rgba($purplish-blue, 0.7);
    }
    .info {
      .plan-name {
        color: $marine-blue;
        font-weight: 700;
        margin-bottom: 0;
      }
      .plan-cost {
        color: rgba($cool-gray, 0.8);
        font-weight: 500;
      }
      .discount {
        color: $marine-blue;
        display: block;
        font-size: 14px;
        transition: 0.3s;
      }
    }
  }
}
.payment-type {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 10px;
  z-index: 1;
  @media (min-width: 768px) {
    margin-top: 45px;
  }
  .toggle-switch-container {
    .toggle-switch {
      background-color: $marine-blue;
      height: 26px;
      width: 50px;
      border-radius: 16px;
      position: relative;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        background-color: $white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
        transition: 0.3s;
      }
      &.yearly {
        &::before {
          left: 27px;
        }
      }
      &.monthly {
        &::before {
          left: 3px;
        }
      }
    }
  }
}
</style>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "SelectPlan",
  data() {
    return {
      plansDetails: {},
      imgs: [],
    };
  },
  computed: {
    ...mapState(["stepNum", "selectPlan"]),
    ...mapGetters(["currentData"]),
    stepData() {
      return this.currentData(this.stepNum);
    },
  },
  methods: {
    ...mapMutations(["setSelectPlan"]),
    changePaymentType() {
      this.selectPlan.currentType === "monthly"
        ? this.setSelectPlan({ fieldName: "currentType", value: "yearly" })
        : this.setSelectPlan({ fieldName: "currentType", value: "monthly" });
      this.changeCost();
    },
    changeCost() {
      if (this.selectPlan.currentType === "monthly") {
        this.plansDetails.arcade = "9/mo";
        this.plansDetails.advanced = "12/mo";
        this.plansDetails.pro = "15/mo";
      } else {
        this.plansDetails.arcade = "90/yr";
        this.plansDetails.advanced = "120/yr";
        this.plansDetails.pro = "150/yr";
      }
    },
    choosePlan(planName, planCost) {
      this.setSelectPlan({ fieldName: "chosenPlan", value: planName });
      this.setSelectPlan({ fieldName: "chosenCost", value: planCost });
      this.setSelectPlan({
        fieldName: "chosenType",
        value: this.selectPlan.currentType,
      });
    },
  },
  mounted() {
    this.changeCost();
  },
};
</script>
