<template>
  <h3>History</h3>
  <ul class="list">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.amount > 0 ? 'plus' : 'minus'"
    >
      {{ transaction.text }} <span>{{ transaction.amount }}</span>
      <button @click="deleteTransaction(transaction.id)" class="delete-btn">X</button>
    </li>
  </ul>
</template>
<script setup>
import { defineProps } from "vue";
const emit = defineEmits(["deleteTransaction"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const deleteTransaction = (id) => {
  emit("deleteTransaction", id);
};
</script>
