<template>
  <div class="form-container">
    <h1 class="step-title">{{ stepData.stepTitle }}</h1>
    <h2 class="step-info">{{ stepData.stepSubtitle }}</h2>
    <div class="form-box">
      <div class="plan-selected">
        <div class="info">
          <div class="plan-name">{{ planSelected }}</div>
          <span class="change-plan" @click="changePlan">change</span>
        </div>
        <div class="cost">{{ selectPlan.chosenCost }}</div>
      </div>
      <hr class="separator" />
      <div class="add-ons-selected">
        <ul class="add-ons">
          <li class="service mt-2" v-for="item in addOns" :key="item.name">
            <div class="name">{{ item.name }}</div>
            <div class="cost">+${{ item.cost }}</div>
          </li>
        </ul>
      </div>
      <div class="total">
        <div class="total-label">
          Total(per {{ selectPlan.chosenType.slice(0, -2) }})
        </div>
        <div class="total-amount">+${{ totalCost }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";
.plan-selected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .plan-name,
  .cost {
    color: $marine-blue;
    font-weight: 900;
  }
  .change-plan {
    color: $cool-gray;
    text-decoration: underline;
    cursor: pointer;
    transition: 0.1s;
    user-select: none;
    &:hover {
      color: $purplish-blue;
      font-weight: 500;
    }
  }
}
.separator {
  color: $cool-gray;
}
.add-ons {
  .service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    .name,
    .cost {
      color: $cool-gray;
    }
    .cost {
      font-weight: 500;
    }
  }
}
.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  .total-label {
    color: $cool-gray;
  }
  .total-amount {
    color: $purplish-blue;
    font-weight: 900;
    font-size: 19px;
  }
}
</style>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "FormSummary",
  computed: {
    ...mapState(["stepNum", "selectPlan", "addOns"]),
    ...mapGetters(["currentData"]),
    stepData() {
      return this.currentData(this.stepNum);
    },
    planSelected() {
      return `${this.selectPlan.chosenPlan[0].toUpperCase()}${this.selectPlan.chosenPlan.slice(
        1
      )} (${this.selectPlan.chosenType[0].toUpperCase()}${this.selectPlan.chosenType.slice(
        1
      )})`;
    },
    totalCost() {
      const planCost = this.selectPlan.chosenCost.match(/\d+/g);
      const addOnsCost = this.addOns.map((el) => el.cost.match(/\d+/g));
      const total = planCost.concat(...addOnsCost);
      return (
        total.reduce((acc, cur) => acc + parseInt(cur), 0) +
        this.selectPlan.chosenCost.slice(-3)
      );
    },
  },
  methods: {
    ...mapMutations(["changePlan"]),
  },
};
</script>
