import { createRouter, createWebHistory } from "vue-router";
import Step1View from "../views/Step1View.vue";
import Step2View from "../views/Step2View.vue";
import Step3View from "../views/Step3View.vue";
import Step4View from "../views/Step4View.vue";
import Step5View from "../views/Step5View.vue";

const routes = [
  {
    path: "/step1",
    name: "personal-info",
    component: Step1View,
  },
  {
    path: "/step2",
    name: "select-plan",
    component: Step2View,
  },
  {
    path: "/step3",
    name: "add-ons",
    component: Step3View,
  },
  {
    path: "/step4",
    name: "summary",
    component: Step4View,
  },
  {
    path: "/step5",
    name: "thanks",
    component: Step5View,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
