<template>
  <div class="form-container">
    <h1 class="step-title">{{ stepData.stepTitle }}</h1>
    <h2 class="step-info">{{ stepData.stepSubtitle }}</h2>
    <form class="form-box">
      <div class="form-group">
        <label for="name">Name</label>
        <span v-if="personalInfo.error.name" class="error-msg"
          >This field is required</span
        >
        <input
          type="text"
          id="name"
          :class="personalInfo.error.name ? 'error' : ''"
          :value="personalInfo.name"
          @input="updatePersonalInfo('name', $event)"
          placeholder="e.g. Stephen King"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <span v-if="personalInfo.error.email" class="error-msg"
          >This field is required</span
        >
        <input
          type="email"
          id="email"
          :class="personalInfo.error.email ? 'error' : ''"
          :value="personalInfo.email"
          @input="updatePersonalInfo('email', $event)"
          placeholder="e.g. stephenking@lorem.com"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <span v-if="personalInfo.error.phone" class="error-msg"
          >This field is required</span
        >
        <input
          type="tel"
          id="phone"
          :class="personalInfo.error.phone ? 'error' : ''"
          :value="personalInfo.phone"
          @input="updatePersonalInfo('phone', $event)"
          placeholder="e.g. +1 234 567 890"
          required
        />
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";
.form-group {
  position: relative;
  &:not(:first-child) {
    margin-top: 10px;
  }
  label {
    color: $marine-blue;
    &:not(:first-of-type) {
      margin-top: 15px;
    }
    margin-bottom: 5px;
    cursor: pointer;
  }
  input {
    padding: 8px 15px;
    border: 1px solid $light-gray;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    transition: 0.3s ease-in-out;
    outline: none;
    color: $marine-blue;
    font-weight: 500;
    &::placeholder {
      color: $cool-gray;
    }
    &:focus {
      outline: 1.5px solid rgba($purplish-blue, 0.6);
      &::placeholder {
        opacity: 0;
        transition: 0.5s ease-in-out;
      }
    }
    &.error {
      outline: 1.5px solid rgba($strawberry-red, 0.8);
    }
  }
  .error-msg {
    color: $strawberry-red;
    font-weight: 500;
    font-size: 15px;
    position: absolute;
    right: 0;
  }
}
</style>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "YourInfo",
  data() {
    return {};
  },
  computed: {
    ...mapState(["stepNum", "personalInfo"]),
    ...mapGetters(["currentData"]),
    stepData() {
      return this.currentData(this.stepNum);
    },
  },
  methods: {
    ...mapMutations(["setPersonalInfo"]),
    updatePersonalInfo(fieldName, event) {
      this.setPersonalInfo({
        fieldName: fieldName,
        value: event.target.value,
      });
    },
  },
};
</script>
