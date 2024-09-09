<template>
  <div class="bg-gray-300 text-black p-2 rounded-lg max-w-3.5">
    <div class="flex gap-1">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<style scoped>
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
  opacity: 0;
  animation: blink 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}
.dot:nth-child(2) {
  animation-delay: 0.3s;
}
.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
