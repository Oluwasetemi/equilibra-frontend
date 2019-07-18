<template>
<div class="card-container pt-3">
    <div class="card border-0 mt-4 px-3 py-4">
      <div class="p-4 text-center">
          <img src="~assets/icons/confirm-email-icon.svg" alt="" height="280px">
          <p class="text-center pt-3">
              A verification email has been sent to your email .Click the button below if you didn’t receive email.
          </p>
          <button class="w-100 mt-2">RESEND EMAIL CONFIRMATION</button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  layout: "authentication",
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },
  computed: {
    years() {
      let currentYear = new Date().getFullYear();
      let years = [];
      for (let i = 1940; i <= currentYear; i++) {
        years.push(i);
      }
      return years;
    }
  }
};
</script>


<style scoped>
p {
  font-size: 12px;
}

.card {
  z-index: 3;
}

.card-container {
  background-image: url("~assets/images/card-shadow.svg");
  background-repeat: no-repeat;
  background-size: cover;
  left: 97px;
  position: relative;
}

button {
  background: #168a59;
  border: none;
  height: 40px;
  color: white;
  font-size: 12px;
  letter-spacing: 0.8px;
}

@media screen and (max-width: 767px) {
  .card-container {
    position: unset;
  }
}
</style>
