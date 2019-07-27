
<template>
  <div
    class="modal fade"
    id="changeTopic"
    role="dialog"
    aria-labelledby="changeTopicLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content p-5">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <div class="title border-bottom">
            <h5 class="my-3 text-center">Vote</h5>
          </div>

          <p class="topic text-center my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            is sed do eiusmod tempor inci did is unt ut labore et dolore magna aliqua um dolor sit ame.
          </p>
          <form action>
            <label for="poor" class="form-check my-4" :class="{selected: selected == 'poor'}">
              <input
                type="radio"
                name="poor"
                id="poor"
                value="poor"
                class="form-check-input"
                hidden
                v-model="selected"
              />
              <div class="radio-btn rounded-circle text-center">
                <img src="~/assets/icons/white-checkmark.svg" alt />
              </div>
              <label for="poor" class="mb-0 ml-3">Poor, not fit for purpose - Change Required</label>
            </label>
            <label
              for="not-acceptable"
              class="form-check my-4"
              :class="{selected: selected == 'not-acceptable'}"
            >
              <input
                type="radio"
                name="not-acceptable"
                id="not-acceptable"
                value="not-acceptable"
                class="form-check-input"
                hidden
                v-model="selected"
              />
              <div class="radio-btn rounded-circle text-center">
                <img src="~/assets/icons/white-checkmark.svg" alt />
              </div>
              <label
                for="not-acceptable"
                class="mb-0 ml-3"
              >Not acceptable - Urgent Improvement Required</label>
            </label>
            <label
              for="challenges"
              class="form-check my-4"
              :class="{selected: selected == 'challenges'}"
            >
              <input
                type="radio"
                name="report"
                id="challenges"
                value="challenges"
                class="form-check-input"
                hidden
                v-model="selected"
              />
              <div class="radio-btn rounded-circle text-center">
                <img src="~/assets/icons/white-checkmark.svg" alt />
              </div>
              <label for="challenges" class="mb-0 ml-3">Challenges - But Improvement Required</label>
            </label>
            <label
              for="commendable"
              class="form-check my-4"
              :class="{selected: selected == 'commendable'}"
            >
              <input
                type="radio"
                name="report"
                id="commendable"
                value="commendable"
                class="form-check-input"
                hidden
                v-model="selected"
              />
              <div class="radio-btn rounded-circle text-center">
                <img src="~/assets/icons/white-checkmark.svg" alt />
              </div>
              <label for="commendable" class="mb-0 ml-3">Commendable - Service Level</label>
            </label>
            <label
              for="excellent"
              class="form-check my-4"
              :class="{selected: selected == 'excellent'}"
            >
              <input
                type="radio"
                name="report"
                id="excellent"
                value="excellent"
                class="form-check-input"
                hidden
                v-model="selected"
              />
              <div class="radio-btn rounded-circle text-center">
                <img src="~/assets/icons/white-checkmark.svg" alt />
              </div>
              <label for="excellent" class="mb-0 ml-3">Excellent or Outstanding - Service Level</label>
            </label>
          </form>
          <div class="footer d-flex justify-content-between pt-1 mt-3">
            <button
              class="d-flex green-btn justify-content-between align-items-center w-100 px-4 mt-4"
            >
              <span>Change Topic</span>
              <img src="~/assets/icons/vote-button-icon.svg" alt height="40px" />
            </button>
          </div>
        </div>
      </div>
  </div>
</template>


<style scoped>

button.close {
  position: absolute;
  right: 0;
  background: #dceee6;
  border-radius: 0px 4px 0px 0px;
  height: 34px;
  width: 40px;
}

.close span {
  color: #07834e;
  font-weight: 100;
}
.modal-content {
  width: 100%;
  max-width: 710px;
  background: #ffffff;
  border: none;
  border-radius: 8px;
}

p.title {
  font-size: 18px;
  text-align: center;
  color: #434343;
  font-weight: 100;
}
h5 {
  font-size: 24px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #07834e;
}

.radio-btn {
  height: 36px;
  width: 36px;
  border: 1px solid #dadada;
}

img {
  display: none;
  position: relative;
  top: 5px;
  height: 10px;
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
  height: 80px;
  font-weight: 100;
  font-size: 14px;
  color: #444444;
  background: #ffffff;
  box-shadow: 0px 6.11057px 18.3317px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
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


.green-btn {
  background: #07834e;
  box-shadow: 2.7px 5.5px 13.8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  height: 98px;
  font-size: 28px;
  border: none;
}

label {
  font-size: 20px;
  line-height: 22px;
  color: #666666;
}
</style>
