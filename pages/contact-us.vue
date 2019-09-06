<template>
  <div class="container-fluid pt-2">
    <transparentNavBar />
    <div class="container py-5 my-2">
      <div class="row">
        <div class="col-lg-7">
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            appear
          >
            <h1>Want to know more? Get in touch with us</h1>
          </transition>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-7">
          <div class="contact-info my-5">
            <div class="row">
              <div class="col-lg-7">
                <div class="item my-3">
                  <p class="label mb-2">Email Address:</p>
                  <p class="value">info@theequilibra.com</p>
                </div>
              </div>
              <div class="col-lg-7">
                <div class="item my-4">
                  <p class="label mb-2">
                    <span style="font-weight: 600">TheEquilibra,</span>
                    <span style="font-weight: 200">Nigeria</span>
                  </p>
                  <p class="value">23., abore nostrud nulla sunt est dolore sunt nisi eLagos</p>
                </div>
              </div>
            </div>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              appear
            >
              <figure class="mt-5 d-lg-block d-none">
                <img src="~/assets/images/contact-illustration.svg" alt />
              </figure>
            </transition>
          </div>
        </div>
        <div class="col-lg-5">
          <form @submit.prevent>
            <div class="form-input">
              <label for="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder
                class="form-control m-0"
                :class="{invalid: $v.payload.firstName.$error}"
                @blur="$v.payload.firstName.$touch()"
                v-model="payload.firstName"
              />
              <template v-if="$v.payload.firstName.$dirty">
                <p v-if="!$v.payload.firstName.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.firstName.minLength"
                  class="invalid"
                >First Name should not be less than 2 characters</p>
              </template>
            </div>
            <div class="form-input">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder
                class="form-control m-0"
                :class="{invalid: $v.payload.lastName.$error}"
                @blur="$v.payload.lastName.$touch()"
                v-model="payload.lastName"
              />
              <template v-if="$v.payload.lastName.$dirty">
                <p v-if="!$v.payload.lastName.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.lastName.minLength"
                  class="invalid"
                >Last Name should not be less than 2 characters</p>
              </template>
            </div>
            <div class="form-input">
              <label for="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-control m-0"
                :class="{invalid: $v.payload.email.$error}"
                @blur="$v.payload.email.$touch()"
                v-model="payload.email"
              />
              <template v-if="$v.payload.email.$dirty">
                <p v-if="!$v.payload.email.required" class="invalid">This field is required</p>
                <p
                  v-else-if="!$v.payload.email.email"
                  class="invalid"
                >Please provide a valid email address</p>
              </template>
            </div>
            <div class="form-input">
              <label for="message">Message</label>
              <textarea
                name="message"
                id="message"
                class="form-control m-0"
                :class="{invalid: $v.payload.message.$error}"
                @blur="$v.payload.message.$touch()"
                v-model="payload.message"
              ></textarea>

              <template v-if="$v.payload.message.$dirty">
                <p v-if="!$v.payload.message.required" class="invalid">This field is required</p>
              </template>
            </div>
            <div class="mt-4">
              <button
                class="d-flex align-items-center justify-content-center green-btn"
                type="submit"
              >
                <div class="spinner-grow" v-if="loading"></div>
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import transparentNavBar from "~/components/Shared/transparentNavBar";
export default {
  layout: "footerOnly",
  components: {
    transparentNavBar
  },
  data() {
    return {
      payload: {
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      }
    };
  },
  validations: {
    payload: {
      firstName: {
        required,
        minLength: minLength(2)
      },
      email: {
        email,
        required
      },
      lastName: {
        required,
        minLength: minLength(2)
      },
      message: {
        required
      }
    }
  },
  methods: {
    submitForm() {
      $v.payload.$touch();
    }
  }
};
</script>

<style scoped>
.container-fluid {
  background-image: url("~assets/images/contact-background.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f9fdfa;
}
h1 {
  color: #091f0e;
  font-family: Soleil;
  font-size: 40px;
  font-weight: bold;
  line-height: 132%;
  letter-spacing: 0.2px;
}

label {
  font-size: 18px;
  line-height: 130.28%;
  color: #434343;
  font-weight: 400;
  margin-bottom: 10px;
}

div.form-input {
  margin-bottom: 20px;
}

p.label {
  font-size: 24px;
  line-height: 147.42%;
  letter-spacing: 0.2px;
  color: #181818;
  font-weight: 400;
}
p.value {
  font-size: 22px;
  line-height: 147.42%;
  letter-spacing: 0.2px;
  color: #181818;
  font-weight: 200;
}

input.form-control {
  height: 44px;
}

input,
textarea {
  background: rgba(198, 226, 215, 0.2);
  border: 1px solid #c6e2d7;
  box-sizing: border-box;
  border-radius: 4px;
  height: 35px;
}

textarea {
  min-height: 224px;
}

input.form-control:disabled {
  background: #e7e7e7;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  border-radius: 4px;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1260px !important;
  }
}
</style>