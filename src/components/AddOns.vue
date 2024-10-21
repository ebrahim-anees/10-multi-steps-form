<template>
  <div class="form-container">
    <h1 class="step-title">{{ stepData.stepTitle }}</h1>
    <h2 class="step-info">{{ stepData.stepSubtitle }}</h2>
    <div class="form-box">
      <div
        :class="['add-ons-box', { chosen: isSelected(plan) }]"
        v-for="(plan, index) in Object.keys(addOnsDetails)"
        :key="index"
        @click="toggleSelection(plan)"
      >
        <div class="control">
          <div class="add-ons-label">
            <div class="details">
              <div class="info">
                <p class="add-ons-name">
                  {{ planName(plan) }}
                </p>
                <span class="add-ons-info">{{
                  addOnsDetails[plan].subtitle
                }}</span>
              </div>
              <div class="price">+${{ addOnsDetails[plan].cost }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";
.form-box {
  display: grid;
  gap: 15px;
  .add-ons-box {
    border: 1.5px solid $light-gray;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      border-color: rgba($purplish-blue, 0.6);
    }
    &.chosen {
      border-color: rgba($purplish-blue, 0.6);
      .add-ons-label::after {
        transform: scale(1);
      }
    }
  }
  .control {
    width: 100%;
    height: 100%;
    .add-ons-label {
      width: inherit;
      height: inherit;
      position: relative;
      cursor: pointer;
      padding: {
        top: 12px;
        right: 20px;
        bottom: 12px;
        left: 40px;
      }
      @media (min-width: 768px) {
        padding-left: 55px;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -10px;
        margin-left: 10px;
        @media (min-width: 768px) {
          margin-left: 15px;
        }
        border-radius: 4px;
        width: 20px;
        height: 20px;
      }
      &::before {
        border: 2px solid $light-gray;
      }
      &::after {
        content: "\f00c";
        font-family: "Font Awesome 6 Free";
        font-weight: 900;
        background-color: rgba($purplish-blue, 0.8);
        color: $white;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0) rotate(360deg);
        transition: 0.3s;
        line-height: 20;
      }
    }
  }
  .details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .add-ons-name {
      color: $marine-blue;
      font-weight: 900;
      margin: 0;
    }
    .add-ons-info {
      color: $cool-gray;
      font-size: 14px;
    }
    .price {
      color: rgba($purplish-blue, 0.8);
      font-weight: 900;
      font-size: 14px;
    }
  }
}
</style>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "AddOns",
  data() {
    return {
      addOnsDetails: {
        online_service: {
          cost: null,
          subtitle: "Access to multiplayer games",
        },
        larger_storage: {
          cost: null,
          subtitle: "Extra 1TB of cloud save",
        },
        customizable_profile: {
          cost: null,
          subtitle: "Custom theme on your profile",
        },
      },
    };
  },
  computed: {
    ...mapState(["stepNum", "selectPlan", "addOns"]),
    ...mapGetters(["currentData"]),
    stepData() {
      return this.currentData(this.stepNum);
    },
  },
  methods: {
    ...mapMutations(["setAddOns", "removeAddOns"]),
    changeCost() {
      if (this.selectPlan.currentType === "monthly") {
        this.addOnsDetails.online_service.cost = "1/mo";
        this.addOnsDetails.larger_storage.cost = "2/mo";
        this.addOnsDetails.customizable_profile.cost = "2/mo";
      } else {
        this.addOnsDetails.online_service.cost = "10/yr";
        this.addOnsDetails.larger_storage.cost = "20/yr";
        this.addOnsDetails.customizable_profile.cost = "20/yr";
      }
    },
    planName(planName) {
      return planName[0].toUpperCase() + planName.slice(1).replace("_", " ");
    },
    toggleSelection(planName) {
      const planCost = this.addOnsDetails[planName].cost;
      const index = this.addOns.findIndex(
        (el) => el.name === this.planName(planName)
      );
      if (index == -1) {
        this.setAddOns({ fieldName: this.planName(planName), value: planCost });
      } else {
        this.removeAddOns(index);
      }
    },
    isSelected(planName) {
      return this.addOns.some((el) => el.name === this.planName(planName));
    },
  },
  mounted() {
    this.changeCost();
  },
};
</script>
