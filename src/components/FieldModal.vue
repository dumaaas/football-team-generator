<template>
  <div id="field">
    <div class="field-outline">
      <div class="sixten-first"></div>
      <div class="sixten-second"></div>
      <div class="sixten-circle-first"></div>
      <div class="sixten-circle-second"></div>

      <div class="center-line"></div>
      <div class="center-circle"></div>
      <div class="center-point"></div>
    </div>
    <div class="calculation" :class="!showTeams ? 'calculation-out' : ''">
      <h3>Calculating...</h3>
      <!-- <img
        class="calculation-img"
        v-for="player in players"
        :key="player.id"
        :src="require(`../assets/${player.avatar}.png`)"
        :class="`player-${player.id}`"
      /> -->
      <img
        class="calculation-img player-1"
        :src="require(`../assets/${teamTwo[0].avatar}.png`)"
      />
      <img
        class="calculation-img player-2"
        :src="require(`../assets/${teamOne[0].avatar}.png`)"
      />
      <!-- <img
        class="calculation-img"
        v-for="player in players"
        :key="player.id"
        :src="require(`../assets/${player.avatar}.png`)"
        :class="`player-${player.id}`"
      /> -->
      <img
        class="football-ball"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/1024px-Soccerball.svg.png?20190202162056"
      />
    </div>
    <div v-if="!showTeams" class="team-one">
      <div
        class="player-i"
        v-for="(player, index) in teamOne"
        :key="player.id"
        :class="[
          index == 3 && teamOne.length == 5
            ? `player-i-5`
            : `player-i-${index}`,
        ]"
      >
        <img :src="require(`../assets/${player.avatar}.png`)" />
        <p>
          <!-- {{
            player.strength.pace +
            player.strength.shoot +
            player.strength.pass +
            player.strength.dribling +
            player.strength.defensive +
            player.strength.physics
          }} -->
          {{ player.avatar }}
        </p>
      </div>
    </div>
    <div v-if="!showTeams" class="team-two">
      <div
        class="player-j"
        v-for="(player, index) in teamTwo"
        :key="player.id"
        :class="[
          index == 3 && teamTwo.length == 5
            ? `player-j-5`
            : `player-j-${index}`,
        ]"
      >
        <img :src="require(`../assets/${player.avatar}.png`)" />
        <p>
          <!-- {{
            player.strength.pace +
            player.strength.shoot +
            player.strength.pass +
            player.strength.dribling +
            player.strength.defensive +
            player.strength.physics
          }} -->
          {{ player.avatar }}
        </p>
      </div>
    </div>
    <div v-if="!showTeams" class="odds">
      <div class="odd-item" @click="openBettingModal(odds.oddOne, '1')">
        <p>1</p>
        <p>{{ odds.oddOne }}</p>
      </div>
      <div class="odd-item" @click="openBettingModal(odds.oddDraw, 'X')">
        <p>X</p>
        <p>{{ odds.oddDraw }}</p>
      </div>
      <div class="odd-item" @click="openBettingModal(odds.oddTwo, '2')">
        <p>2</p>
        <p>{{ odds.oddTwo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teamOne: Array,
    teamTwo: Array,
    showTeams: Boolean,
    players: Array,
    odds: Object,
  },
  methods: {
    openBettingModal(odd, fix) {
      this.$emit("openBettingModal", odd, fix);
    },
  },
};
</script>

<style>
#field {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  height: 576px;
  width: 387px;
  background-size: contain;
  background-repeat: no-repeat;
  border: 4px solid #e9cc74;
  background: rgba(0, 0, 0, 1);
  /* background-image: url("../assets/field.png"); */
}

.calculation {
  position: relative;
}

.calculation-out {
  animation: fadeCalculation linear 0.9s forwards;
}

.calculation h3 {
  color: white;
  position: absolute;
  left: 134px;
  text-transform: uppercase;
  top: 25px;
}

.odds {
  bottom: -39px;
  position: absolute;
  width: 100%;
  color: #e9cc74;
  opacity: 0;
  animation: fadeInField linear 0.9s forwards;
  animation-delay: 1.8s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.odds p {
  padding: 0 8px;
}

.odd-item {
  cursor: pointer;
  display: flex;
  width: 80px;
  border: 1px solid #e9cc74;
  background: #000;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  transition: ease-in-out 0.3s;
}

.odd-item:hover {
  border: 1px solid #000;
  background: #e9cc74;
  color: #000;
}

.field-outline {
  position: absolute;
  top: 10px;
  left: 10px;
  border: 1px solid #e9cc74;
  width: 97%;
  height: 548px;
  width: 358px;
  animation: fadeInField linear 0.9s forwards;
  opacity: 0;
  /* animation-delay: 3.9s; */
}

@keyframes fadeInField {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.sixten-first {
  position: absolute;
  top: 0;
  left: 56px;
  height: 20%;
  width: 70%;
  border: 1px solid #e9cc74;
  border-top: 0;
  background: rgba(0, 0, 0, 1);
}

.sixten-circle-first {
  position: absolute;
  top: 39px;
  left: 129px;
  border-radius: 50%;
  border: 1px solid #e9cc74;
  width: 100px;
  height: 100px;
  z-index: -1;
}

.sixten-second {
  position: absolute;
  bottom: 0;
  left: 56px;
  height: 20%;
  width: 70%;
  border: 1px solid #e9cc74;
  border-bottom: 0;
  background: rgba(0, 0, 0, 1);
}

.sixten-circle-second {
  position: absolute;
  bottom: 39px;
  left: 129px;
  border-radius: 50%;
  border: 1px solid #e9cc74;
  width: 100px;
  height: 100px;
  z-index: -1;
}

.center-line {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #e9cc74;
}

.center-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  border: 1px solid #e9cc74;
  border-radius: 50%;
}

.center-point {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border: 1px solid #e9cc74;
  background: #e9cc74;
  border-radius: 50%;
}

.player-i {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  opacity: 0;
  animation: fadeInTop linear 0.9s forwards;
  animation-delay: 0.9s;
}

@keyframes fadeCalculation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeInTop {
  0% {
    transform: translate(-50%, -90%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInBottom {
  0% {
    transform: translate(-50%, 10%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.player-i-1 {
  position: absolute;
  top: 100px;
  left: 60px;
}

.player-i-0 {
  /* animation: ; */
}

.player-i-2 {
  position: absolute;
  top: 100px;
  right: -10px;
  left: auto;
}

.player-i-3 {
  top: 165px;
}

.player-i-4 {
  position: absolute;
  top: 233px;
  left: 102px;
}

.player-i-5 {
  position: absolute;
  top: 233px;
  left: auto;
  right: 32px;
}

.player-i img {
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 50%;
  background: linear-gradient(to right, #997521, #e9cc74);
}

.calculation-img {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 50%;
  background: linear-gradient(to right, #997521, #e9cc74);
}

.player-1 {
  left: 162px;
  top: 483px;
  -webkit-animation: animation2 linear 3s infinite;
  animation: animation2 linear 3s infinite;
}

@keyframes animation2 {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(12px, -40px);
  }
  20% {
    transform: translate(25px, -80px);
  }
  30% {
    transform: translate(40px, -120px);
  }
  40% {
    transform: translate(60px, -160px);
  }
  50% {
    transform: translate(50px, -200px);
  }
  60% {
    transform: translate(30px, -240px);
  }
  70% {
    transform: translate(-20px, -280px);
  }
  80% {
    transform: translate(-40px, -320px);
  }
  100% {
    transform: translate(-60px, -280px);
  }
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes ballAnimation {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(12px, -40px);
  }
  20% {
    transform: translate(25px, -80px);
  }
  30% {
    transform: translate(40px, -120px);
  }
  40% {
    transform: translate(60px, -160px);
  }
  50% {
    transform: translate(50px, -200px);
  }
  60% {
    transform: translate(30px, -240px);
  }
  80% {
    transform: translate(-40px, -320px);
  }
  100% {
    transform: translate(0, -450px);
  }
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  95% {
    opactiy: 1;
  }
  100% {
    opacity: 0;
  }
}

.player-2 {
  left: 163px;
  top: 52px;
  -webkit-animation: animation3 linear 3s infinite;
  animation: animation3 linear 3s infinite;
}

.football-ball {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 435px;
  -webkit-animation: ballAnimation linear 3s infinite;
  animation: ballAnimation linear 3s infinite;
  /* animation: ballAnimation linear 19s infinite; */
}

.player-i p {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  background: #17191f;
  width: auto;
  padding: 2px 6px;
  border: 1px solid #e9cc74;
  color: white;
}

.team-one {
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
  width: 100%;
}

.team-two {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50%;
  width: 100%;
}

.player-j {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  opacity: 0;
  animation: fadeInBottom linear 0.9s forwards;
  animation-delay: 0.9s;
}

.player-j-1 {
  position: absolute;
  bottom: 38px;
  left: 60px;
}

.player-j-2 {
  position: absolute;
  bottom: 38px;
  right: -10px;
  left: auto;
}

.player-j-3 {
  bottom: 102px;
}

.player-j-4 {
  position: absolute;
  bottom: 151px;
  left: 102px;
}

.player-j-5 {
  position: absolute;
  bottom: 151px;
  left: auto;
  right: 32px;
}

.player-j img {
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 50%;
  background: linear-gradient(to right, #021b79, #0575e6);
}

.player-j p {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  background: #17191f;
  width: auto;
  padding: 2px 6px;
  border: 1px solid #0575e6;
  color: white;
}

@keyframes animation3 {
  0% {
    transform: translate(-54px, 0);
  }
  25% {
    transform: translate(54px, 0);
  }
  50% {
    transform: translate(-54px, 0);
  }
  75% {
    transform: translate(32px, 0);
  }
  100% {
    transform: translate(-100px, -20px);
  }
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>