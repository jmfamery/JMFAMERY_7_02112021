<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="email icon"></i>
      <input
        type="email"
        placeholder="Email"
        autocomplete="off"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div class="ui basic label pointing red" v-if="errors.email">
      {{ errors.email }}
    </div>
  </div>
</template>
 <script>
import { ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
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