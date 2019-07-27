
<template>
  <div
    class="modal fade"
    id="pollResults"
    role="dialog"
    aria-labelledby="pollResultsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="title">
          <h5 class="my-3 text-center">Vote poll results</h5>
        </div>
        <div class="pb-5 px-5">
          <p class="topic text-center my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            is sed do eiusmod tempor inci did is unt ut labore et dolore magna aliqua um dolor sit ame.
          </p>
          <div class="results">
            <div class="result-option px-3 pt-3 pb-2 my-4">
              <div class="d-flex justify-content-between mb-2 px-1">
                <span class="option-title">Poor, not fit for purpose - Change Required</span>
                <span class="option-value">15%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{width: '15%'}"></div>
              </div>
              <small class="vote-count d-block px-1 pt-2">10 votes</small>
            </div>
            <div class="result-option voted px-3 pt-3 pb-2 my-4">
              <div class="d-flex justify-content-between mb-2 px-1">
                <span class="option-title">Not acceptable - Urgent Improvement Required</span>
                <span class="option-value">40%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{width: '40%'}"></div>
              </div>
              <small class="vote-count d-block px-1 pt-2">10 votes</small>
            </div>
            <div class="result-option px-3 pt-3 pb-2 my-4">
              <div class="d-flex justify-content-between mb-2 px-1">
                <span class="option-title">Challenges - But Improvement Required</span>
                <span class="option-value">15%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{width: '15%'}"></div>
              </div>
              <small class="vote-count d-block px-1 pt-2">10 votes</small>
            </div>
            <div class="result-option px-3 pt-3 pb-2 my-4">
              <div class="d-flex justify-content-between mb-2 px-1">
                <span class="option-title">Commendable - Service Level</span>
                <span class="option-value">5%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{width: '5%'}"></div>
              </div>
              <small class="vote-count d-block px-1 pt-2">10 votes</small>
            </div>
            <div class="result-option px-3 pt-3 pb-2 my-4">
              <div class="d-flex justify-content-between mb-2 px-1">
                <span class="option-title">Excellent or Outstanding - Service Level</span>
                <span class="option-value">10%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{width: '10%'}"></div>
              </div>
              <small class="vote-count d-block px-1 pt-2">10 votes</small>
            </div>
            <div class="result-option px-3 pt-3 pb-2 my-4">
              <div class="d-flex justify-content-between mb-2 px-1">
                <span class="option-title">Poor, not fit for purpose - Change Required</span>
                <span class="option-value">5%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{width: '15%'}"></div>
              </div>
              <small class="vote-count d-block px-1 pt-2">10 votes</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.title {
  border-bottom: solid 1px #e7e7e7;
}
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
  max-width: 680px;
  background: #fff;
  border: none;
  border-radius: 8px;
  color: #434343;
}

.voted.result-option {
  background-color: #26b14f;
  color: white;
}

.voted .progress-bar-container {
  background-color: rgba(255, 255, 255, 0.6);
}
.voted .progress-bar {
  background-color: white;
}

.progress-bar-container {
  background: #f4f6f6;
  border-radius: 12px;
  height: 12px;
}

.progress-bar {
  background: #afb0b0;
  border-radius: 12px;
  height: 12px;
}

h5 {
  font-size: 22px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #091f0e;
  font-weight: 700;
}

p {
  font-size: 16px;
  text-align: center;
  color: #434343;
  font-weight: 100;
}

.result-option {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
}

.option-title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 100;
}

.option-value {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
}

small {
  font-size: 12px;
  font-weight: 100;
}
</style>
