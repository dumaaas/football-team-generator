<template>
  <div class="error-modal">{{ msg }}</div>
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
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgb(242,222,222);
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid rgb(185,74,72);
  color: rgb(185,74,72);
  z-index: 1000;
}
</style>