<template>
  <div :class="msg.length ? 'jump-in' : ''" class="error-modal">{{ msg }}</div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<style>
.error-modal {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgb(242,222,222);
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid rgb(185,74,72);
  color: rgb(185,74,72);
  z-index: 1000;
  transform: translateX(400px);
  opacity: 0;
}

.jump-in {
    animation: jumpIn 5s linear;
}

@keyframes jumpIn {
    0% {
        opacity: 0;
        transform: translateX(400px);
    }
    10% {
        opacity: 1;
        transform: translateX(0);
    }
    90% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(400px);
    }
}
</style>