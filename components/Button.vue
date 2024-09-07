<template>
    <button type="submit">
          <div class="effect"></div>
          <slot></slot>
          <p>{{ text }}</p>
    </button>
</template>

<script setup lang="ts">
    defineProps({
        text: String
    })

</script>

<style>
    button {
    width: 100%;
    position: relative;
    background-color: var(--secondary);
    color: white;
    cursor: pointer;
    margin: 24px 0 8px 0;
    border: 1px solid #B4BDC7;
    padding: 16px 4px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .8s ease-out;
  }

  .effect {
    position: absolute;
    top: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:0;
    background-color:  white;
    border-radius: 40px;
    clip-path: circle(0%);
    transition: all .5s ease-in-out;
  }

  button:hover {
    background-color: #fff;
    color: var(--secondary);
    
  }
  button:hover .effect {
    clip-path: circle(100%);
  }
  button:hover svg {
    fill: var(--secondary) !important;
  }

  button svg  {
    position:relative; 
    fill: #fff;
    transition: all .8s ease-out;
  }

  button p {
    position:relative; 
    margin-left: 12px;
    font-size: 16px;
  }
</style>