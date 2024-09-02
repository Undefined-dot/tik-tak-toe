<script setup lang="ts">
    const origin = ref({x:0, y:0}) 
    const position = ref({x:0, y:0})

    const svg = ref<null| HTMLElement>(null) // fait reference a un svg enfant de .back
    const body = ref<null | HTMLDivElement>(null)

    /**
     * 
     * @param event MouseEvent
     * 
     * la fonction mouveStart s'execute lorsque on fait un mousedown c a dire que un maintient le 
     * clique gauche de la sourie et fonction est de recuperer a quelle position en x et en y on a clique 
     * sur l'element.
     * 
     * il declenche l'evenement mousemouve sur le DOM en meme temps
     */

    function movestart (event: MouseEvent) { 
      origin.value = {x: event.clientX, y: event.clientY}
      console.log(origin.value)
      body.value?.classList.add("darkMode")

      const handleMouseMove = (event: MouseEvent) => {
          if (svg.value) {
            drag(event, svg.value);
          }
        };

        const handleMouseUp = () => { // n'ettoyer le mousemove lorsque on arrete de maintenir le click
            console.log("Mouse up event triggered");
            body.value?.classList.remove("darkMode")
            document.removeEventListener("mousemove", handleMouseMove);
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    }

    /**
     * @param event MouseEvent
     * @param {HTMLElement} element - l'svg d'arriere plan
     * 
     * 1. on recupere la position en x et en y de la sourit puis on soustrait a la position de depart pour 
     * avoir la distance parcourut par l'element .
     * 
     * 2. ensuite on reinitialise les position de depart a la position actuelle de la sourit sur l'ecran
     * 
     * 3. et enfin on determine ou se situe l'element en fonction du haut et de la gauche de la fenetre 
     * et on le soustrait par le chemin parcourut pour avoir la nouvelle position
     */

    function drag (event: MouseEvent, element: HTMLElement | null) {
          position.value = {x: origin.value.x - event.clientX, y: origin.value.y - event.clientY} 

          origin.value.x = event.clientX 
          origin.value.y = event.clientY

          if (element !== null) {
            const rect = element.getBoundingClientRect()
            console.log(rect?.top)
            element.style.top =  (rect?.top - position.value.y) + "px"
            element.style.left = (rect?.left - position.value.x) + "px"
          }

    }
</script>

<template>
  <div class="container " ref="body">
    <div class="auth-container">
       <div class="container-img">
          <img src="/public/bx-x.svg" width="100"  height="100" alt="cross" />
          <img src="/public/ellipse.svg" width="80"  height="80" alt="cross" />
       </div>
       <div class="container-sign-text">
            <h1>Login</h1>
            <p>please sign in to continue</p>
       </div>
       
       <button type="submit">
          <div class="effect"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.044 9.80788H11.9414V14.4092H18.3307C17.736 17.3332 15.2467 19.0132 11.9414 19.0132C11.0165 19.0148 10.1004 18.8338 9.24559 18.4805C8.39082 18.1273 7.6142 17.6088 6.96027 16.9547C6.30633 16.3006 5.78796 15.5239 5.43487 14.6691C5.08178 13.8142 4.90093 12.8981 4.90269 11.9732C4.9011 11.0484 5.08209 10.1325 5.43525 9.27777C5.78842 8.42308 6.30682 7.64652 6.96074 6.9926C7.61465 6.33869 8.39122 5.82028 9.2459 5.46712C10.1006 5.11395 11.0166 4.93297 11.9414 4.93455C13.62 4.93455 15.1374 5.53055 16.328 6.50522L19.7947 3.03988C17.6827 1.19855 14.9747 0.0625507 11.9414 0.0625507C10.3758 0.0579745 8.82471 0.362964 7.37742 0.959977C5.93012 1.55699 4.61514 2.43425 3.50809 3.54129C2.40105 4.64833 1.52379 5.96332 0.926778 7.41062C0.329765 8.85791 0.0247754 10.409 0.0293516 11.9746C0.0245984 13.5402 0.329467 15.0913 0.926417 16.5387C1.52337 17.9861 2.40062 19.3011 3.5077 20.4082C4.61478 21.5153 5.92983 22.3925 7.37721 22.9895C8.82459 23.5864 10.3757 23.8913 11.9414 23.8866C17.8974 23.8866 23.3134 19.5546 23.3134 11.9746C23.3134 11.2706 23.2054 10.5119 23.044 9.80788Z"/>
          </svg>
          <p>sign up with google</p>
        </button>
        <p class="account">Already an account ?</p>
    </div>
  </div>
  <div class="back">
    <svg style="position: fixed; left: 0;"  ref="svg" @mousedown="movestart($event)" class="svg-1" width="400" height="400" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  d="M39.6833 116.007L39.6833 116.007C44.3695 120.693 51.9675 120.693 56.6538 116.007L74.682 97.9788L92.7155 116.008C97.402 120.693 104.999 120.693 109.685 116.007L102.614 108.936L109.685 116.007L115.694 109.998L109.266 103.57L115.694 109.998C120.381 105.311 120.381 97.7135 115.694 93.0272L108.623 100.098L115.694 93.0272L97.6671 75L115.694 56.9728C120.381 52.2864 120.381 44.6885 115.694 40.0022L115.694 40.0022L109.685 33.993C104.999 29.3071 97.402 29.3066 92.7155 33.992L74.682 52.0212L56.6538 33.9931C51.9675 29.3068 44.3695 29.3069 39.6833 33.9931L33.6742 40.0022C28.9879 44.6885 28.9879 52.2865 33.6742 56.9728L51.7016 75L33.6742 93.0272C28.9879 97.7135 28.9879 105.312 33.6742 109.998L39.6833 116.007Z" fill="#ffffff" stroke="#ffffff" stroke-width="20"/>
    </svg>
    <svg style="position: fixed; right: 0;" width="300" height="300" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="45" fill="transparent" stroke="#ffffff" stroke-width="30"/>
    </svg>
  </div>
  </template>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary);
  }

  .back {
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 70px;
  }

  .auth-container {
    position: absolute;
    z-index: 1;
    padding: 48px;
    width: 100%;
    max-width: 500px;
    height: 600px;
    background-color: var(--authback);
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 250px #f5f5f5;
  }

  .container-img {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

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

  .input-container input {
    width: 90%;
    background-color: #fff;
    border: none;
    outline: none;
  }
  .container-sign-text{
    margin-top: 32px;
  }
  .container-sign-text h1 {
    font-size: 4rem;
    color: var(--secondary);
    font-weight: 700;
  }
  .container-sign-text p {
    color: var(--subtext);
    font-weight: 300
  }
  .account {
    color: var(--secondary);
    cursor: pointer;
  }
  .account:hover{
    text-decoration: underline;
  }

  @media screen and (max-width: 500px) {
    .auth-container {
      padding: 16px;
    }
  }

  @keyframes bounce {
    0% {
      transform: rotate(0)
    }
    50% {
      transform: rotate(90deg)
    }
    100% {
      transform: rotate(180deg)
    }
  }

  @keyframes identifier {
    0% {
      transform: rotate(0)
    }
    50% {
      transform: rotate(90deg)
    }
    100% {
      transform: rotate(180deg)
    }
  }
</style>