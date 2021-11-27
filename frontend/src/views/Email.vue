<template>
  <input
    class="form-control"
    type="email"
    placeholder="Votre email"
    autocomplete="off"
    v-model="input"
    @keyup="validateInput"
    @blur="validateInput"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <div class="text-white text-center" v-if="errors.email">
    {{ errors.email }}
  </div>
</template>
 <script>
import { ref } from "vue";
import useFormValidation from "../modules/useFormValidation";
export default {
  setup() {
    let input = ref("");
    const { validateEmailField, errors } = useFormValidation();
    const validateInput = () => {
      validateEmailField("email", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>