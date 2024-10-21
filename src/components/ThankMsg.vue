<template>
  <div class="thank-container">
    <div class="icon">
      <img src="@/assets/images/icon-thank-you.svg" alt="thank icon" />
    </div>
    <div class="thank-msg">
      <h1 class="step-title">Thank you!</h1>
      <p class="msg">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/CSS/scss/variables.scss";
.thank-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-top: 25px;
  .thank-msg {
    text-align: center;
    .msg {
      margin-top: 20px;
      color: rgba($cool-gray, 0.8);
      font-weight: 500;
      font-size: 17px;
      line-height: 1.6;
    }
  }
}
</style>

<script>
export default {
  name: "ThankMsg",
};
</script>
