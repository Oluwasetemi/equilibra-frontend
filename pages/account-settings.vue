<template>
  <div class="container-fluid px-0 pb-5">
    <div class="container py-5">
      <div class="mx-md-3">
        <h4 class="font-weight-bold mb-3 mx-md-4">ACCOUNT SETTINGS</h4>
      </div>
      <personalInfo />
      <residenceInfo />
      <originInfo />
    </div>
  </div>
</template>

<script>
import personalInfo from "~/components/account-settings/personal-info";
import residenceInfo from "~/components/account-settings/residence-info";
import originInfo from "~/components/account-settings/origin-info";
export default {
  layout: "greenNavOnly",
  components: {
    personalInfo,
    residenceInfo,
    originInfo
  }
};
</script>


<style scoped>
.container-fluid {
  background-image: url("~assets/images/account-settings-BG.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f9fdfa;
}
h4 {
  color: #091f0e;
  font-size: 24px;
  letter-spacing: 1.15px;
}
.card {
  background: #ffffff;
  border: 1px solid rgba(7, 131, 78, 0.2);
  box-sizing: border-box;
  border-radius: 1px;
  box-shadow: 12px 10px 20px rgba(46, 91, 255, 0.07);
}

label {
  color: #2c7742;
  font-size: 11px;
  letter-spacing: 1.25px;
  /* font-weight: 600; */
}

input {
  background: rgba(198, 226, 215, 0.2);
  border: 1px solid #c6e2d7;
  box-sizing: border-box;
  border-radius: 4px;
  height: 35px;
}

h6 {
  color: #2c7742;
  font-size: 13px;
  letter-spacing: 1.25px;
}

.change-photo a {
  text-decoration-line: underline;
  color: #009966;
  font-size: 12px;
}
.change-photo p {
  color: #666666;
  font-size: 11px;
}
.green-btn {
  width: 200px;
  height: 52px;
  padding: 0 5px;
  border: none;
  /* border: 1px solid #FFFFFF; */
  border-radius: 2px;
  background: #07834e;
  color: white;
}

input.form-control:disabled {
  background: #e7e7e7;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  border-radius: 4px;
}

@media (min-width: 1200px){
.container {
    max-width: 1250px;
}}
</style>
