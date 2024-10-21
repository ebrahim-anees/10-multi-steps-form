import { createStore } from "vuex";
import formData from "@/assets/data/formData.json";

export default createStore({
  state: {
    stepNum: 1,
    formData: formData,
    personalInfo: {
      name: null,
      email: null,
      phone: null,
      error: {
        name: false,
        email: false,
        phone: false,
      },
    },
    selectPlan: {
      currentType: "monthly",
    },
    addOns: [],
  },
  mutations: {
    setPersonalInfo(state, { fieldName, value }) {
      state.personalInfo[fieldName] = value.trim();
    },
    setSelectPlan(state, { fieldName, value }) {
      state.selectPlan[fieldName] = value;
    },
    setAddOns(state, { fieldName, value }) {
      state.addOns.push({ name: fieldName, cost: value });
    },
    removeAddOns(state, index) {
      state.addOns.splice(index, 1);
    },
    stepIncrement(state) {
      state.stepNum++;
    },
    stepDecrement(state) {
      state.stepNum--;
    },
    clearError(state) {
      state.personalInfo.error = {
        name: false,
        email: false,
        phone: false,
      };
    },
    changePlan(state) {
      state.stepNum = 2;
    },
  },
  actions: {},
  modules: {},
  getters: {
    currentData: (state) => (step) => {
      return state.formData.find((el) => el.step === step);
    },
    personalInfo: (state) => state.personalInfo,
  },
});
