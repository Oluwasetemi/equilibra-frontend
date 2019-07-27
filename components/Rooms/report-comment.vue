<template>
  <div class="dropdown-menu p-4" @click.stop="">
    <h5 class="mb-3 text-center">Choose a reason for reporting tHIs post</h5>
    <form action>
      <div class="form-check my-2" :class="{selected: selected == 'spam'}">
        <input type="radio" name="report" id="spam" value="spam" class="form-check-input" hidden v-model="selected"/>
        <div class="radio-btn rounded-circle text-center">
          <img src="~/assets/icons/white-checkmark.svg" alt />
        </div>
        <label for="spam" class="mb-0 ml-3">It's Spam</label>
      </div>
      <div class="form-check my-2" :class="{selected: selected == 'inappropriate'}">
        <input type="radio" name="report" id="inappropriate" value="inappropriate" class="form-check-input" hidden v-model="selected"/>
        <div class="radio-btn rounded-circle text-center">
          <img src="~/assets/icons/white-checkmark.svg" alt />
        </div>
        <label for="inappropriate" class="mb-0 ml-3">It’s inappropriate</label>
      </div>
      <div class="form-check my-2" :class="{selected: selected == 'abusive'}">
        <input type="radio" name="report" id="abusive" value="abusive" class="form-check-input" hidden v-model="selected"/>
        <div class="radio-btn rounded-circle text-center">
          <img src="~/assets/icons/white-checkmark.svg" alt />
        </div>
        <label for="abusive" class="mb-0 ml-3">It’s abusive or harmful</label>
      </div>
    </form>
    <div class="footer d-flex justify-content-between pt-1 mt-3">
      <button>Send Report</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            selected: null
        }
    }
}
</script>


<style scoped>
.dropdown-menu {
  width: 349px;
  background: #ffffff;
  border: 1px solid rgba(222, 225, 229, 0.5);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
h5 {
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  color: #31c348;
}

.radio-btn {
  height: 18px;
  width: 18px;
  border: 1px solid #dadada;
}
.radio-btn {
  height: 18px;
  width: 18px;
  border: 1px solid #dadada;
}

img {
  display: none;
  position: relative;
  top: -2px;
}

input:checked ~ .radio-btn {
  border: 1px solid #33d755;
  background: #07834e;
}
input:checked ~ .radio-btn img {
  display: inline-block;
}

.form-check {
  display: flex;
  align-items: center;
  height: 40px;
  font-weight: 100;
  font-size: 14px;
  color: #444444;
}

.form-check-input {
  position: unset;
  margin-top: unset;
  margin-left: unset;
}
.selected {
  border: 1px solid #31c850;
  box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.07);
  border-radius: 2px;
}

button {
  background: #07834e;
  border-radius: 2px;
  border: none;
  width: 100%;
  font-weight: 100;
  height: 44px;
  max-width: 140px;
  color: white;
}
</style>
