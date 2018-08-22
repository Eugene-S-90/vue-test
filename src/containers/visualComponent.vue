<template>
    <div class="visual-component">
      <p @click="hello()">TEST</p>
<div v-bind:class="[levelBackground.level1]">Визуал Компонент
  <audio v-bind:src="getImgUrl('bla.ogg')"></audio>
<knight/>
<div class="text__box-wrapper"><blockquote class="oval-speech-border">
       <p class="text__box"></p>
      </blockquote></div>
</div>
  {{inventory.sword.name}}
<div @click="updateCurrentState">TEST</div>
    </div>
</template>
<script>
import { TweenMax, CSSPlugin, TimelineMax } from "gsap/all";
const plugins = [CSSPlugin, ScrollToPlugin];
import knight from "./components/knight";
export default {
  components: {
    knight
  },
  computed: {
    levelBackground() {
      return this.$store.state.levels;
    },
    inventory() {
      return { sword: this.$store.state.inventory.weapons.sword };
    }
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    yo() {
      alert("yo");
    },
    walkingAnimation(legTl, rLegTl) {
      let leftLeg = document.querySelector(".left-leg");
      let rightLeg = document.querySelector(".right-leg");
      legTl.add(
        TweenLite.to(leftLeg, 0.2, { rotation: 10, ease: Power0.easeNone })
      );
      legTl.add(
        TweenLite.to(leftLeg, 0.2, { rotation: 0, ease: Power0.easeNone })
      );
      legTl.add(
        TweenLite.to(leftLeg, 0.2, { rotation: -10, ease: Power0.easeNone })
      );
      legTl.add(
        TweenLite.to(leftLeg, 0.2, { rotation: 0, ease: Power0.easeNone })
      );
      legTl.play();

      rLegTl.add(
        TweenLite.to(rightLeg, 0.2, { rotation: -10, ease: Power0.easeNone })
      );
      rLegTl.add(
        TweenLite.to(rightLeg, 0.2, { rotation: 0, ease: Power0.easeNone })
      );
      rLegTl.add(
        TweenLite.to(rightLeg, 0.2, { rotation: 10, ease: Power0.easeNone })
      );
      rLegTl.add(
        TweenLite.to(rightLeg, 0.2, { rotation: 0, ease: Power0.easeNone })
      );
      rLegTl.play();
    },
    walkingAnimationStop(legTl, rLegTl) {
      legTl.stop();
      rLegTl.stop();
    },
    audioStart() {
      let audio = document.querySelector("audio");
      audio.play();
    },
    audioStop() {
      let audio = document.querySelector("audio");
      audio.pause();
    },
    knightSpeaker() {
      // alert("hello")
    },
    moveKnight_scene1_part1(
      walkingAnimation,
      walkingAnimationStop,
      knightSpeaker,
      audioStart,
      audioStop
    ) {
      console.log("walkingAnimation", walkingAnimation);
      alert("ready;");
      let legTl = new TimelineMax({ repeat: -1 });
      let rLegTl = new TimelineMax({ repeat: -1 });
      const knight = document.querySelector("#svg2");
      let moveKnighTl = new TimelineMax({ onStart: update, onComplete: stop });
      moveKnighTl
        .to(knight, 0.5, {
          left: 0,
          bottom: 10,
          sclae: 0.9,
          ease: Power0.easeNone
        })
        .to(knight, 1.5, {
          left: 240,
          bottom: 50,
          sclae: 0.8,
          ease: Power0.easeNone
        })
        .to(knight, 1, {
          left: 400,
          bottom: 20,
          scale: 0.7,
          ease: Power0.easeNone
        })
        .to(knight, 2, {
          left: 612,
          bottom: 27,
          scale: 0.6,
          ease: Power0.easeNone
        });

      function update() {
        walkingAnimation(legTl, rLegTl);
      }
      function stop() {
        walkingAnimationStop(legTl, rLegTl);
        knightSpeaker();
        let text__box = document.querySelector(".text__box");
        let bubble = document.querySelector(".oval-speech-border");
        let knight__eyes = document.querySelector(".knight__eyes");
        let spechTl = new TimelineMax({
          onStart: onStartSpeach,
          onComplete: OnCompleteSpeach
        });
        spechTl
          .to(knight__eyes, 1, { x: -41 })
          .set(bubble, { className: "+=showBubble" })
          .to(text__box, 9, {
            text:
              "Это перекресток. Я понимаю, что я Капитан  Очевидность, но ... Я не знаю куда идти. Куда пойдем, вождь?",
            ease: Linear.easeNone
          })
          .set(bubble, { className: "-=showBubble" }, "+=3")
          .to(knight__eyes, 1, { x: 0 });
        function onStartSpeach() {
          audioStart();
        }
        function OnCompleteSpeach() {
          audioStop();
        }
      }
    },
    mutation_test() {
      this.$store.commit("mutation_test", {
        hello: "hello",
        test2: "test2"
      });
    },
    updateCurrentState() {
      this.$store.commit("updateCurrentState", {
        ...this.$store.state.inventory.weapons,
        weapon: this.$store.state.inventory.weapons.sword
      });
    },
    hello() {
      alert("yo");
    }
  },
  mounted() {
    this.moveKnight_scene1_part1(
      this.walkingAnimation,
      this.walkingAnimationStop,
      this.knightSpeaker,
      this.audioStart,
      this.audioStop
    );
  }
};
</script>

<style scoped>
.visual-component {
  position: relative;
}
.right-leg {
  /* transition:all 1s ease;
    animation: walking-right-leg 0.5s linear 10; */
}
.left-leg {
  /* transition:all 1s ease; */
  /* animation: walking-left-leg 0.5s linear 10;  */
}

.level-1-bg {
  background-image: url("../assets/Cave.png");
  width: 1080px;
  height: 600px;
  background-size: cover;
}
img {
  width: 300px;
  height: 300px;
}
@keyframes walking-right-leg {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes walking-left-leg {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes moveRight {
  0% {
    left: 0px;
    transform: scale(1);
  }
  30% {
    left: 240px;
    bottom: 50px;
    transform: scale(0.8);
  }
  70% {
    left: 400px;
    bottom: 20px;
    transform: scale(0.7);
  }
  100% {
    left: 612px;
    bottom: 27px;
    transform: scale(0.67);
  }
}
.showBubble {
  opacity: 1 !important;
  transition: 2s all;
}
.oval-speech-border {
  transition: 1s all;
  display: block;
  opacity: 0;
  position: absolute;
  padding: 70px 30px;
  margin: 1em auto 60px;
  border: 10px solid #000;
  text-align: center;
  color: #333;
  background: #fff;
  -webkit-border-top-left-radius: 100%;
  -webkit-border-top-right-radius: 100%;
  -webkit-border-bottom-right-radius: 100%;
  -webkit-border-bottom-left-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  right: 412px;
  top: 150px;
}
.oval-speech-border:before {
  content: "";
  position: absolute;
  z-index: 2;
  bottom: -40px;
  right: 50%;
  width: 50px;
  height: 30px;
  border-style: solid;
  border-width: 0 10px 10px 0;
  border-color: #000;
  margin-right: -10px;
  background: transparent;
  -webkit-border-bottom-right-radius: 80px 50px;
  -moz-border-radius-bottomright: 80px 50px;
  border-bottom-right-radius: 80px 50px;
  display: block;
}
.oval-speech-border:after {
  content: "";
  position: absolute;
  z-index: 2;
  bottom: -41px;
  right: 50%;
  width: 20px;
  height: 31px;
  border-style: solid;
  border-width: 0 10px 10px 0;
  border-color: #000;
  margin-right: 20px;
  background: transparent;
  -webkit-border-bottom-right-radius: 40px 50px;
  -moz-border-radius-bottomright: 40px 50px;
  border-bottom-right-radius: 40px 50px;
  display: block;
}
.oval-speech-border > :first-child:before {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: -40px;
  right: 50%;
  width: 10px;
  height: 10px;
  margin-right: 45px;
  background: #000;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
blockquote {
  width: 300px;
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 40px;
  -webkit-margin-end: 40px;
}

/* circle{
fill:none;
stroke:#008B6F;
stroke-width:7px;
stroke-dasharray: 850;
stroke-dashoffset: 850;
animation: offset 4s linear forwards;
}
line{
  stroke:black;
  stroke-width:5px;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: offset 3s linear forwards;
  animation-delay: 6s;
}
text{
  font-size: 40px;
  text-anchor: middle;
  stroke:#000;
  stroke-width:2px;
  fill:rgb(255, 255, 255);
  stroke-dasharray: 250;
  stroke-dashoffset: 250;
  animation: offset 5s linear forwards;
  animation-delay: 9s;
}
polygon{
  fill:none;
  stroke:#000;
  stroke-width:2px;
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: offset 2s linear forwards;
  animation-delay: 4s;
}

@keyframes offset {
  100%{stroke-dashoffset: 0}
  
} */
</style>

  <!-- <svg 
  height="100" 
  width="100">
  <rect height="80" width="100"/>
  <rect height="50" width="80" fill="white" x="10" y="10"/>
  <rect height="10" width="40" x="30" y="90"/>
  </svg>
    <svg 
  height="150" 
  width="100">
  <rect height="100" width="70" fill="white" stroke="#FF2626" stroke-width="10" x="5" y="5" rx="5" ry="5"/>
  <circle cx="40" cy="105" r="3" fill="white"  />
  </svg> -->
  <!-- <svg height="268"
       width="268"
       version="1.1"
       xmlns="http://www.w3.org/2000/svg"
  >
  <circle r="130" cx="134" cy="134" />
  <line x1="47" y1="198" x2="221" y2="198" />
  <polygon points="55,190 134,30 216,190" />
  <text x="134" y="142">TEST</text>
  </svg> -->