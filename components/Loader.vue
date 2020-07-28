<template>
  <div class="loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle" />
        </div>
        <div class="gap-patch">
          <div class="circle" />
        </div>
        <div class="circle-clipper right">
          <div class="circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .loader {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
  }
</style>
