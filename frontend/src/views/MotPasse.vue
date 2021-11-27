<template>
  <input
    class="form-control"
    type="password"
    placeholder="Votre mot de passe"
    autocomplete="off"
    v-model="input"
    @keyup="validateInput"
    @blur="validateInput"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <div class="text-white text-center" v-if="errors.password">
    {{ errors.password }}
  </div>
</template>

 <script>
import { ref } from "vue";
import useFormValidation from "../modules/useFormValidation";
export default {
  setup() {
    let input = ref("");
    const { validatePasswordField, errors } = useFormValidation();
    const validateInput = () => {
      validatePasswordField("password", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>