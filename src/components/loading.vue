<template>
  <div class="load-container">
    <div class="load"></div>
    <div class="text">加载中...</div>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped>
.load-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.load-container .load {
  width: 60px;
  height: 60px;
  background-color: #19aa8d;
  animation: rotateplane 1.2s infinite ease-in-out;
}

.load-container .text {
}
@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
