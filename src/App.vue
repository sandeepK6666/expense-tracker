<template>
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expense="+expense" />
    <TransactionList
      :transactions="transactions"
      @deleteTransaction="deleteTransaction"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

//total

const total = computed(() => {
  return transactions.value.reduce((red, transaction) => {
    return red + transaction.amount;
  }, 0);
});

//income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((red, transaction) => {
      return red + transaction.amount;
    }, 0)
    .toFixed(2);
});

//expense

const expense = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((red, transaction) => {
      return red + transaction.amount;
    }, 0);
});

const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  });
  saveTransactionToLocalStorage();
  toast.success("Transaction Added");
};

const generateUniqueId = () => {
  return Math.floor(Math.random() * 100000);
};
const deleteTransaction = (id) => {
  transactions.value = transactions.value.filter((transaction) => {
    return transaction.id !== id;
  });

  deleteTransactionFromLocalStorage();
  toast.success("Transaction deleted");
};

//function expessions / anonymous functions / not hoisted
const saveTransactionToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
const deleteTransactionFromLocalStorage = () => {
  localStorage.removeItem("transactions");
};
</script>
