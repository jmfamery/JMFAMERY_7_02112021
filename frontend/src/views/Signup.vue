<template>
  <section class="signup-view">
    <form class="ui form" @submit.prevent>
      <NameField v-model="user.name" />
      <EmailField v-model="user.email" />
      <PhoneField v-model="user.phone" />
      <PasswordField v-model="user.password" />
      <button class="ui button red fluid big" :disabled="isSignupButtonDisabled">Signup
      </button>
    </form>
  </section>
</template>

<script>
import { reactive } from "@vue/reactivity";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PhoneField from "./PhoneField";
import PasswordField from "./PasswordField";
import useFormValidation from "../modules/useFormValidation";
import useSubmitButtonState from "../modules/useSubmitButtonState";

export default {
  components: {
    NameField,
    EmailField,
    PhoneField,
    PasswordField
  },

  setup() {
    let user = reactive({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);
    console.log(user)
    return { user, isSignupButtonDisabled,}
  },
};
</script>