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
      <img
        class="calculation-img"
        v-for="player in players"
        :key="player.id"
        :src="require(`../assets/${player.avatar}.png`)"
        :class="`player-${player.id}`"
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
  </div>
</template>

<script>
export default {
  props: {
    teamOne: Array,
    teamTwo: Array,
    showTeams: Boolean,
    players: Array,
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
  animation-delay: 3.9s;
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

.player-10 {
  left: 156px;
  top: 193px;
  -webkit-animation: animation1 linear 20s infinite;
  animation: animation1 linear 20s infinite;
}

.player-1 {
  left: -100px;
  top: 31px;
  -webkit-animation: animation2 linear 19s infinite;
  animation: animation2 linear 19s infinite;
}

.player-2 {
  left: -4px;
  top: 112px;
  -webkit-animation: animation3 linear 16s infinite;
  animation: animation3 linear 16s infinite;
}

.player-3 {
  left: -100px;
  top: -50px;
  -webkit-animation: animation4 linear 19s infinite;
  animation: animation4 linear 19s infinite;
}

.player-4 {
  left: 28px;
  top: -50px;
  -webkit-animation: animation5 linear 18s infinite;
  animation: animation5 linear 18s infinite;
}

.player-5 {
  left: 156px;
  top: -23px;
  -webkit-animation: animation6 linear 20s infinite;
  animation: animation6 linear 20s infinite;
}

.player-6 {
  left: 28px;
  top: -23px;
  -webkit-animation: animation7 linear 19s infinite;
  animation: animation7 linear 19s infinite;
}

.player-7 {
  left: -36px;
  top: -23px;
  -webkit-animation: animation8 linear 17s infinite;
  animation: animation8 linear 17s infinite;
}

.player-8 {
  left: -4px;
  top: -50px;
  -webkit-animation: animation9 linear 20s infinite;
  animation: animation9 linear 20s infinite;
}

.player-9 {
  left: -100px;
  top: 139px;
  -webkit-animation: animation10 linear 18s infinite;
  animation: animation10 linear 18s infinite;
}

.player-11 {
  left: -68px;
  top: 4px;
  -webkit-animation: animation11 linear 17s infinite;
  animation: animation11 linear 17s infinite;
}

.player-12 {
  left: -36px;
  top: 85px;
  -webkit-animation: animation12 linear 17s infinite;
  animation: animation12 linear 17s infinite;
}

.player-13 {
  left: 188px;
  top: 166px;
  -webkit-animation: animation13 linear 16s infinite;
  animation: animation13 linear 16s infinite;
}

.player-14 {
  left: 124px;
  top: 112px;
  -webkit-animation: animation14 linear 20s infinite;
  animation: animation14 linear 20s infinite;
}

.player-15 {
  left: -100px;
  top: 112px;
  -webkit-animation: animation15 linear 18s infinite;
  animation: animation15 linear 18s infinite;
}

.player-16 {
  left: -36px;
  top: 4px;
  -webkit-animation: animation16 linear 18s infinite;
  animation: animation16 linear 18s infinite;
}

.player-17 {
  left: 124px;
  top: 31px;
  -webkit-animation: animation17 linear 19s infinite;
  animation: animation17 linear 19s infinite;
}

.player-18 {
  left: -100px;
  top: 112px;
  -webkit-animation: animation18 linear 19s infinite;
  animation: animation18 linear 19s infinite;
}

.player-19 {
  left: -4px;
  top: 139px;
  -webkit-animation: animation19 linear 19s infinite;
  animation: animation19 linear 19s infinite;
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

@keyframes animation1 {
  0% {
    transform: translate(50px, 95px);
  }
  8.33% {
    transform: translate(70px, 120px);
  }
  16.67% {
    transform: translate(40px, 30px);
  }
  25% {
    transform: translate(0px, 45px);
  }
  33.33% {
    transform: translate(20px, 30px);
  }
  41.67% {
    transform: translate(120px, 80px);
  }
  50% {
    transform: translate(110px, 70px);
  }
  58.33% {
    transform: translate(60px, 65px);
  }
  66.67% {
    transform: translate(40px, 86px);
  }
  75% {
    transform: translate(20px, 31px);
  }
  83.33% {
    transform: translate(80px, 30px);
  }
  91.67% {
    transform: translate(76px, 121px);
  }
  100% {
    transform: translate(40px, 30px);
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

@keyframes animation2 {
  0% {
    transform: translate(188px, 355px);
  }
  11.11% {
    transform: translate(220px, 382px);
  }
  22.22% {
    transform: translate(252px, 409px);
  }
  33.33% {
    transform: translate(284px, 382px);
  }
  44.44% {
    transform: translate(316px, 382px);
  }
  55.56% {
    transform: translate(348px, 355px);
  }
  66.67% {
    transform: translate(380px, 355px);
  }
  77.78% {
    transform: translate(412px, 328px);
  }
  88.89% {
    transform: translate(444px, 355px);
  }
  100% {
    transform: translate(476px, 355px);
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

@keyframes animation3 {
  0% {
    transform: translate(54px, -23px);
  }
  11.11% {
    transform: translate(57px, 4px);
  }
  22.22% {
    transform: translate(60px, 4px);
  }
  33.33% {
    transform: translate(63px, 31px);
  }
  44.44% {
    transform: translate(66px, 4px);
  }
  55.56% {
    transform: translate(70px, 4px);
  }
  66.67% {
    transform: translate(73px, -23px);
  }
  77.78% {
    transform: translate(76px, -23px);
  }
  88.89% {
    transform: translate(79px, 4px);
  }
  100% {
    transform: translate(82px, -23px);
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

@keyframes animation4 {
  0% {
    transform: translate(73px, -50px);
  }
  4.55% {
    transform: translate(76px, -50px);
  }
  9.09% {
    transform: translate(76px, -50px);
  }
  13.64% {
    transform: translate(88px, -50px);
  }
  18.18% {
    transform: translate(60px, -23px);
  }
  22.73% {
    transform: translate(82px, -50px);
  }
  27.27% {
    transform: translate(24px, -23px);
  }
  31.82% {
    transform: translate(56px, -50px);
  }
  36.36% {
    transform: translate(98px, -23px);
  }
  40.91% {
    transform: translate(120px, -50px);
  }
  45.45% {
    transform: translate(152px, -23px);
  }
  50% {
    transform: translate(184px, 4px);
  }
  54.55% {
    transform: translate(116px, 4px);
  }
  59.09% {
    transform: translate(148px, 4px);
  }
  63.64% {
    transform: translate(110px, 4px);
  }
  68.18% {
    transform: translate(112px, 31px);
  }
  72.73% {
    transform: translate(144px, 58px);
  }
  77.27% {
    transform: translate(176px, 31px);
  }
  81.82% {
    transform: translate(138px, 58px);
  }
  86.36% {
    transform: translate(140px, 58px);
  }
  90.91% {
    transform: translate(132px, 31px);
  }
  95.45% {
    transform: translate(144px, 31px);
  }
  100% {
    transform: translate(136px, 58px);
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

@keyframes animation5 {
  0% {
    transform: translate(188px, 65px);
  }
  25% {
    transform: translate(220px, 62px);
  }
  50% {
    transform: translate(252px, 25px);
  }
  75% {
    transform: translate(284px, 98px);
  }
  100% {
    transform: translate(316px, 58px);
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

@keyframes animation6 {
  0% {
    transform: translate(28px, 103px);
  }
  33.33% {
    transform: translate(60px, 97px);
  }
  66.67% {
    transform: translate(92px, 96px);
  }
  100% {
    transform: translate(124px, 49px);
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

@keyframes animation7 {
  0% {
    transform: translate(124px, 32px);
  }
  4.35% {
    transform: translate(156px, 49px);
  }
  8.7% {
    transform: translate(188px, 36px);
  }
  13.04% {
    transform: translate(22px, 63px);
  }
  17.39% {
    transform: translate(25px, 90px);
  }
  21.74% {
    transform: translate(28px, 40px);
  }
  26.09% {
    transform: translate(36px, 46px);
  }
  30.43% {
    transform: translate(38px, 63px);
  }
  34.78% {
    transform: translate(30px, 63px);
  }
  39.13% {
    transform: translate(42px, 43px);
  }
  43.48% {
    transform: translate(44px, 43px);
  }
  47.83% {
    transform: translate(76px, 40px);
  }
  52.17% {
    transform: translate(58px, 51px);
  }
  56.52% {
    transform: translate(54px, 49px);
  }
  60.87% {
    transform: translate(52px, 43px);
  }
  65.22% {
    transform: translate(60px, 46px);
  }
  69.57% {
    transform: translate(66px, 46px);
  }
  73.91% {
    transform: translate(68px, 40px);
  }
  78.26% {
    transform: translate(70px, 49px);
  }
  82.61% {
    transform: translate(72px, 51px);
  }
  86.96% {
    transform: translate(76px, 40px);
  }
  91.3% {
    transform: translate(76px, 57px);
  }
  95.65% {
    transform: translate(82px, 40px);
  }
  100% {
    transform: translate(80px, 40px);
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

@keyframes animation8 {
  0% {
    transform: translate(28px, 20px);
  }
  7.14% {
    transform: translate(36px, 27px);
  }
  14.29% {
    transform: translate(38px, 22px);
  }
  21.43% {
    transform: translate(30px, 24px);
  }
  28.57% {
    transform: translate(42px, 24px);
  }
  35.71% {
    transform: translate(44px, 31px);
  }
  42.86% {
    transform: translate(46px, 24px);
  }
  50% {
    transform: translate(58px, 31px);
  }
  57.14% {
    transform: translate(54px, 24px);
  }
  64.29% {
    transform: translate(57px, 27px);
  }
  71.43% {
    transform: translate(64px, 20px);
  }
  78.57% {
    transform: translate(63px, 24px);
  }
  85.71% {
    transform: translate(68px, 20px);
  }
  92.86% {
    transform: translate(70px, 13px);
  }
  100% {
    transform: translate(32px, 93px);
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

@keyframes animation9 {
  0% {
    transform: translate(148px, 52px);
  }
  16.67% {
    transform: translate(180px, 62px);
  }
  33.33% {
    transform: translate(122px, 69px);
  }
  50% {
    transform: translate(144px, 76px);
  }
  66.67% {
    transform: translate(176px, 06px);
  }
  83.33% {
    transform: translate(138px, 76px);
  }
  100% {
    transform: translate(140px, 73px);
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

@keyframes animation10 {
  0% {
    transform: translate(20px, 51px);
  }
  2.63% {
    transform: translate(22px, 54px);
  }
  5.26% {
    transform: translate(28px, 54px);
  }
  7.89% {
    transform: translate(36px, 57px);
  }
  10.53% {
    transform: translate(34px, 54px);
  }
  13.16% {
    transform: translate(80px, 51px);
  }
  15.79% {
    transform: translate(12px, 58px);
  }
  18.42% {
    transform: translate(44px, 51px);
  }
  21.05% {
    transform: translate(76px, 44px);
  }
  23.68% {
    transform: translate(58px, 57px);
  }
  26.32% {
    transform: translate(54px, 49px);
  }
  28.95% {
    transform: translate(52px, 57px);
  }
  31.58% {
    transform: translate(64px, 54px);
  }
  34.21% {
    transform: translate(36px, 57px);
  }
  36.84% {
    transform: translate(68px, 54px);
  }
  39.47% {
    transform: translate(70px, 54px);
  }
  42.11% {
    transform: translate(32px, 57px);
  }
  44.74% {
    transform: translate(74px, 54px);
  }
  47.37% {
    transform: translate(79px, 51px);
  }
  50% {
    transform: translate(88px, 51px);
  }
  52.63% {
    transform: translate(80px, 98px);
  }
  55.26% {
    transform: translate(82px, 58px);
  }
  57.89% {
    transform: translate(94px, 65px);
  }
  60.53% {
    transform: translate(95px, 65px);
  }
  63.16% {
    transform: translate(98px, 58px);
  }
  65.79% {
    transform: translate(100px, 65px);
  }
  68.42% {
    transform: translate(102px, 62px);
  }
  71.05% {
    transform: translate(184px, 25px);
  }
  73.68% {
    transform: translate(116px, 62px);
  }
  76.32% {
    transform: translate(118px, 65px);
  }
  78.95% {
    transform: translate(110px, 62px);
  }
  81.58% {
    transform: translate(122px, 65px);
  }
  84.21% {
    transform: translate(124px, 62px);
  }
  86.84% {
    transform: translate(127px, 62px);
  }
  89.47% {
    transform: translate(130px, 65px);
  }
  92.11% {
    transform: translate(130px, 62px);
  }
  94.74% {
    transform: translate(172px, 52px);
  }
  97.37% {
    transform: translate(104px, 65px);
  }
  100% {
    transform: translate(136px, 25px);
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

@keyframes animation11 {
  0% {
    transform: translate(63px, 58px);
  }
  12.5% {
    transform: translate(68px, 85px);
  }
  25% {
    transform: translate(70px, 85px);
  }
  37.5% {
    transform: translate(72px, 58px);
  }
  50% {
    transform: translate(74px, 58px);
  }
  62.5% {
    transform: translate(79px, 58px);
  }
  75% {
    transform: translate(28px, 58px);
  }
  87.5% {
    transform: translate(60px, 85px);
  }
  100% {
    transform: translate(92px, 58px);
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

@keyframes animation12 {
  0% {
    transform: translate(12px, 103px);
  }
  2.94% {
    transform: translate(15px, 103px);
  }
  5.88% {
    transform: translate(18px, 103px);
  }
  8.82% {
    transform: translate(22px, 103px);
  }
  11.76% {
    transform: translate(25px, 76px);
  }
  14.71% {
    transform: translate(24px, 96px);
  }
  17.65% {
    transform: translate(36px, 99px);
  }
  20.59% {
    transform: translate(38px, 22px);
  }
  23.53% {
    transform: translate(30px, 92px);
  }
  26.47% {
    transform: translate(12px, 99px);
  }
  29.41% {
    transform: translate(44px, 99px);
  }
  32.35% {
    transform: translate(47px, 92px);
  }
  35.29% {
    transform: translate(58px, 89px);
  }
  38.24% {
    transform: translate(54px, 22px);
  }
  41.18% {
    transform: translate(57px, 85px);
  }
  44.12% {
    transform: translate(60px, 85px);
  }
  47.06% {
    transform: translate(63px, 92px);
  }
  50% {
    transform: translate(66px, 99px);
  }
  52.94% {
    transform: translate(70px, 96px);
  }
  55.88% {
    transform: translate(72px, 76px);
  }
  58.82% {
    transform: translate(74px, 103px);
  }
  61.76% {
    transform: translate(76px, 103px);
  }
  64.71% {
    transform: translate(88px, 96px);
  }
  67.65% {
    transform: translate(80px, 94px);
  }
  70.59% {
    transform: translate(89px, 96px);
  }
  73.53% {
    transform: translate(94px, 103px);
  }
  76.47% {
    transform: translate(95px, 100px);
  }
  79.41% {
    transform: translate(98px, 96px);
  }
  82.35% {
    transform: translate(102px, 103px);
  }
  85.29% {
    transform: translate(102px, 100px);
  }
  88.24% {
    transform: translate(108px, 003px);
  }
  91.18% {
    transform: translate(116px, 96px);
  }
  94.12% {
    transform: translate(148px, 99px);
  }
  97.06% {
    transform: translate(110px, 97px);
  }
  100% {
    transform: translate(121px, 103px);
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

@keyframes animation13 {
  0% {
    transform: translate(76px, -23px);
  }
  10% {
    transform: translate(88px, -23px);
  }
  20% {
    transform: translate(86px, -23px);
  }
  30% {
    transform: translate(82px, -23px);
  }
  40% {
    transform: translate(94px, 4px);
  }
  50% {
    transform: translate(95px, 31px);
  }
  60% {
    transform: translate(98px, 4px);
  }
  70% {
    transform: translate(120px, 4px);
  }
  80% {
    transform: translate(152px, -23px);
  }
  90% {
    transform: translate(184px, -50px);
  }
  100% {
    transform: translate(116px, -23px);
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

@keyframes animation14 {
  0% {
    transform: translate(20px, 43px);
  }
  3.85% {
    transform: translate(22px, 46px);
  }
  7.69% {
    transform: translate(28px, 46px);
  }
  11.54% {
    transform: translate(31px, 49px);
  }
  15.38% {
    transform: translate(34px, 40px);
  }
  19.23% {
    transform: translate(38px, 32px);
  }
  23.08% {
    transform: translate(41px, 35px);
  }
  26.92% {
    transform: translate(44px, 32px);
  }
  30.77% {
    transform: translate(47px, 38px);
  }
  34.62% {
    transform: translate(58px, 49px);
  }
  38.46% {
    transform: translate(54px, 40px);
  }
  42.31% {
    transform: translate(52px, 43px);
  }
  46.15% {
    transform: translate(60px, 43px);
  }
  50% {
    transform: translate(63px, 40px);
  }
  53.85% {
    transform: translate(68px, 49px);
  }
  57.69% {
    transform: translate(70px, 40px);
  }
  61.54% {
    transform: translate(72px, 43px);
  }
  65.38% {
    transform: translate(74px, 46px);
  }
  69.23% {
    transform: translate(79px, 40px);
  }
  73.08% {
    transform: translate(82px, 57px);
  }
  76.92% {
    transform: translate(86px, 57px);
  }
  80.77% {
    transform: translate(89px, 54px);
  }
  84.62% {
    transform: translate(94px, 71px);
  }
  88.46% {
    transform: translate(96px, 54px);
  }
  92.31% {
    transform: translate(98px, 57px);
  }
  96.15% {
    transform: translate(120px, 49px);
  }
  100% {
    transform: translate(152px, 90px);
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
@-webkit-keyframes animation15 {
  0% {
    transform: translate(156px, 922px);
  }
  25% {
    transform: translate(188px, 895px);
  }
  50% {
    transform: translate(220px, 895px);
  }
  75% {
    transform: translate(252px, 868px);
  }
  100% {
    transform: translate(284px, 868px);
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
@keyframes animation15 {
  0% {
    transform: translate(156px, 922px);
  }
  25% {
    transform: translate(188px, 895px);
  }
  50% {
    transform: translate(220px, 895px);
  }
  75% {
    transform: translate(252px, 868px);
  }
  100% {
    transform: translate(284px, 868px);
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
@-webkit-keyframes animation16 {
  0% {
    transform: translate(700px, 409px);
  }
  5.26% {
    transform: translate(732px, 436px);
  }
  10.53% {
    transform: translate(764px, 463px);
  }
  15.79% {
    transform: translate(796px, 463px);
  }
  21.05% {
    transform: translate(828px, 490px);
  }
  26.32% {
    transform: translate(860px, 490px);
  }
  31.58% {
    transform: translate(892px, 463px);
  }
  36.84% {
    transform: translate(924px, 463px);
  }
  42.11% {
    transform: translate(956px, 463px);
  }
  47.37% {
    transform: translate(988px, 436px);
  }
  52.63% {
    transform: translate(1020px, 463px);
  }
  57.89% {
    transform: translate(1052px, 463px);
  }
  63.16% {
    transform: translate(1084px, 436px);
  }
  68.42% {
    transform: translate(1116px, 436px);
  }
  73.68% {
    transform: translate(1148px, 463px);
  }
  78.95% {
    transform: translate(1180px, 436px);
  }
  84.21% {
    transform: translate(1212px, 409px);
  }
  89.47% {
    transform: translate(1244px, 382px);
  }
  94.74% {
    transform: translate(1276px, 355px);
  }
  100% {
    transform: translate(1308px, 382px);
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
@keyframes animation16 {
  0% {
    transform: translate(700px, 409px);
  }
  5.26% {
    transform: translate(732px, 436px);
  }
  10.53% {
    transform: translate(764px, 463px);
  }
  15.79% {
    transform: translate(796px, 463px);
  }
  21.05% {
    transform: translate(828px, 490px);
  }
  26.32% {
    transform: translate(860px, 490px);
  }
  31.58% {
    transform: translate(892px, 463px);
  }
  36.84% {
    transform: translate(924px, 463px);
  }
  42.11% {
    transform: translate(956px, 463px);
  }
  47.37% {
    transform: translate(988px, 436px);
  }
  52.63% {
    transform: translate(1020px, 463px);
  }
  57.89% {
    transform: translate(1052px, 463px);
  }
  63.16% {
    transform: translate(1084px, 436px);
  }
  68.42% {
    transform: translate(1116px, 436px);
  }
  73.68% {
    transform: translate(1148px, 463px);
  }
  78.95% {
    transform: translate(1180px, 436px);
  }
  84.21% {
    transform: translate(1212px, 409px);
  }
  89.47% {
    transform: translate(1244px, 382px);
  }
  94.74% {
    transform: translate(1276px, 355px);
  }
  100% {
    transform: translate(1308px, 382px);
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
@-webkit-keyframes animation17 {
  0% {
    transform: translate(348px, 490px);
  }
  3.7% {
    transform: translate(380px, 517px);
  }
  7.41% {
    transform: translate(412px, 490px);
  }
  11.11% {
    transform: translate(444px, 517px);
  }
  14.81% {
    transform: translate(476px, 490px);
  }
  18.52% {
    transform: translate(508px, 463px);
  }
  22.22% {
    transform: translate(540px, 436px);
  }
  25.93% {
    transform: translate(572px, 409px);
  }
  29.63% {
    transform: translate(604px, 436px);
  }
  33.33% {
    transform: translate(636px, 409px);
  }
  37.04% {
    transform: translate(668px, 436px);
  }
  40.74% {
    transform: translate(700px, 436px);
  }
  44.44% {
    transform: translate(732px, 409px);
  }
  48.15% {
    transform: translate(764px, 409px);
  }
  51.85% {
    transform: translate(796px, 382px);
  }
  55.56% {
    transform: translate(828px, 409px);
  }
  59.26% {
    transform: translate(860px, 409px);
  }
  62.96% {
    transform: translate(892px, 436px);
  }
  66.67% {
    transform: translate(924px, 463px);
  }
  70.37% {
    transform: translate(956px, 463px);
  }
  74.07% {
    transform: translate(988px, 490px);
  }
  77.78% {
    transform: translate(1020px, 463px);
  }
  81.48% {
    transform: translate(1052px, 463px);
  }
  85.19% {
    transform: translate(1084px, 436px);
  }
  88.89% {
    transform: translate(1116px, 409px);
  }
  92.59% {
    transform: translate(1148px, 409px);
  }
  96.3% {
    transform: translate(1180px, 409px);
  }
  100% {
    transform: translate(1212px, 409px);
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
@keyframes animation17 {
  0% {
    transform: translate(348px, 490px);
  }
  3.7% {
    transform: translate(380px, 517px);
  }
  7.41% {
    transform: translate(412px, 490px);
  }
  11.11% {
    transform: translate(444px, 517px);
  }
  14.81% {
    transform: translate(476px, 490px);
  }
  18.52% {
    transform: translate(508px, 463px);
  }
  22.22% {
    transform: translate(540px, 436px);
  }
  25.93% {
    transform: translate(572px, 409px);
  }
  29.63% {
    transform: translate(604px, 436px);
  }
  33.33% {
    transform: translate(636px, 409px);
  }
  37.04% {
    transform: translate(668px, 436px);
  }
  40.74% {
    transform: translate(700px, 436px);
  }
  44.44% {
    transform: translate(732px, 409px);
  }
  48.15% {
    transform: translate(764px, 409px);
  }
  51.85% {
    transform: translate(796px, 382px);
  }
  55.56% {
    transform: translate(828px, 409px);
  }
  59.26% {
    transform: translate(860px, 409px);
  }
  62.96% {
    transform: translate(892px, 436px);
  }
  66.67% {
    transform: translate(924px, 463px);
  }
  70.37% {
    transform: translate(956px, 463px);
  }
  74.07% {
    transform: translate(988px, 490px);
  }
  77.78% {
    transform: translate(1020px, 463px);
  }
  81.48% {
    transform: translate(1052px, 463px);
  }
  85.19% {
    transform: translate(1084px, 436px);
  }
  88.89% {
    transform: translate(1116px, 409px);
  }
  92.59% {
    transform: translate(1148px, 409px);
  }
  96.3% {
    transform: translate(1180px, 409px);
  }
  100% {
    transform: translate(1212px, 409px);
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
@-webkit-keyframes animation18 {
  0% {
    transform: translate(412px, 139px);
  }
  3.23% {
    transform: translate(444px, 166px);
  }
  6.45% {
    transform: translate(476px, 166px);
  }
  9.68% {
    transform: translate(508px, 166px);
  }
  12.9% {
    transform: translate(540px, 166px);
  }
  16.13% {
    transform: translate(572px, 139px);
  }
  19.35% {
    transform: translate(604px, 166px);
  }
  22.58% {
    transform: translate(636px, 139px);
  }
  25.81% {
    transform: translate(668px, 112px);
  }
  29.03% {
    transform: translate(700px, 112px);
  }
  32.26% {
    transform: translate(732px, 139px);
  }
  35.48% {
    transform: translate(764px, 139px);
  }
  38.71% {
    transform: translate(796px, 139px);
  }
  41.94% {
    transform: translate(828px, 166px);
  }
  45.16% {
    transform: translate(860px, 139px);
  }
  48.39% {
    transform: translate(892px, 166px);
  }
  51.61% {
    transform: translate(924px, 139px);
  }
  54.84% {
    transform: translate(956px, 112px);
  }
  58.06% {
    transform: translate(988px, 85px);
  }
  61.29% {
    transform: translate(1020px, 58px);
  }
  64.52% {
    transform: translate(1052px, 85px);
  }
  67.74% {
    transform: translate(1084px, 85px);
  }
  70.97% {
    transform: translate(1116px, 85px);
  }
  74.19% {
    transform: translate(1148px, 58px);
  }
  77.42% {
    transform: translate(1180px, 85px);
  }
  80.65% {
    transform: translate(1212px, 58px);
  }
  83.87% {
    transform: translate(1244px, 58px);
  }
  87.1% {
    transform: translate(1276px, 58px);
  }
  90.32% {
    transform: translate(1308px, 58px);
  }
  93.55% {
    transform: translate(1340px, 85px);
  }
  96.77% {
    transform: translate(1372px, 85px);
  }
  100% {
    transform: translate(1404px, 58px);
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
@keyframes animation18 {
  0% {
    transform: translate(412px, 139px);
  }
  3.23% {
    transform: translate(444px, 166px);
  }
  6.45% {
    transform: translate(476px, 166px);
  }
  9.68% {
    transform: translate(508px, 166px);
  }
  12.9% {
    transform: translate(540px, 166px);
  }
  16.13% {
    transform: translate(572px, 139px);
  }
  19.35% {
    transform: translate(604px, 166px);
  }
  22.58% {
    transform: translate(636px, 139px);
  }
  25.81% {
    transform: translate(668px, 112px);
  }
  29.03% {
    transform: translate(700px, 112px);
  }
  32.26% {
    transform: translate(732px, 139px);
  }
  35.48% {
    transform: translate(764px, 139px);
  }
  38.71% {
    transform: translate(796px, 139px);
  }
  41.94% {
    transform: translate(828px, 166px);
  }
  45.16% {
    transform: translate(860px, 139px);
  }
  48.39% {
    transform: translate(892px, 166px);
  }
  51.61% {
    transform: translate(924px, 139px);
  }
  54.84% {
    transform: translate(956px, 112px);
  }
  58.06% {
    transform: translate(988px, 85px);
  }
  61.29% {
    transform: translate(1020px, 58px);
  }
  64.52% {
    transform: translate(1052px, 85px);
  }
  67.74% {
    transform: translate(1084px, 85px);
  }
  70.97% {
    transform: translate(1116px, 85px);
  }
  74.19% {
    transform: translate(1148px, 58px);
  }
  77.42% {
    transform: translate(1180px, 85px);
  }
  80.65% {
    transform: translate(1212px, 58px);
  }
  83.87% {
    transform: translate(1244px, 58px);
  }
  87.1% {
    transform: translate(1276px, 58px);
  }
  90.32% {
    transform: translate(1308px, 58px);
  }
  93.55% {
    transform: translate(1340px, 85px);
  }
  96.77% {
    transform: translate(1372px, 85px);
  }
  100% {
    transform: translate(1404px, 58px);
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
@-webkit-keyframes animation19 {
  0% {
    transform: translate(156px, 706px);
  }
  2.56% {
    transform: translate(188px, 706px);
  }
  5.13% {
    transform: translate(220px, 733px);
  }
  7.69% {
    transform: translate(252px, 733px);
  }
  10.26% {
    transform: translate(284px, 733px);
  }
  12.82% {
    transform: translate(316px, 733px);
  }
  15.38% {
    transform: translate(348px, 760px);
  }
  17.95% {
    transform: translate(380px, 787px);
  }
  20.51% {
    transform: translate(412px, 814px);
  }
  23.08% {
    transform: translate(444px, 787px);
  }
  25.64% {
    transform: translate(476px, 787px);
  }
  28.21% {
    transform: translate(508px, 787px);
  }
  30.77% {
    transform: translate(540px, 787px);
  }
  33.33% {
    transform: translate(572px, 760px);
  }
  35.9% {
    transform: translate(604px, 733px);
  }
  38.46% {
    transform: translate(636px, 706px);
  }
  41.03% {
    transform: translate(668px, 733px);
  }
  43.59% {
    transform: translate(700px, 760px);
  }
  46.15% {
    transform: translate(732px, 787px);
  }
  48.72% {
    transform: translate(764px, 814px);
  }
  51.28% {
    transform: translate(796px, 787px);
  }
  53.85% {
    transform: translate(828px, 814px);
  }
  56.41% {
    transform: translate(860px, 787px);
  }
  58.97% {
    transform: translate(892px, 814px);
  }
  61.54% {
    transform: translate(924px, 841px);
  }
  64.1% {
    transform: translate(956px, 841px);
  }
  66.67% {
    transform: translate(988px, 841px);
  }
  69.23% {
    transform: translate(1020px, 868px);
  }
  71.79% {
    transform: translate(1052px, 868px);
  }
  74.36% {
    transform: translate(1084px, 868px);
  }
  76.92% {
    transform: translate(1116px, 868px);
  }
  79.49% {
    transform: translate(1148px, 895px);
  }
  82.05% {
    transform: translate(1180px, 922px);
  }
  84.62% {
    transform: translate(1212px, 922px);
  }
  87.18% {
    transform: translate(1244px, 895px);
  }
  89.74% {
    transform: translate(1276px, 922px);
  }
  92.31% {
    transform: translate(1308px, 949px);
  }
  94.87% {
    transform: translate(1340px, 922px);
  }
  97.44% {
    transform: translate(1372px, 949px);
  }
  100% {
    transform: translate(1404px, 949px);
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
@keyframes animation19 {
  0% {
    transform: translate(156px, 706px);
  }
  2.56% {
    transform: translate(188px, 706px);
  }
  5.13% {
    transform: translate(220px, 733px);
  }
  7.69% {
    transform: translate(252px, 733px);
  }
  10.26% {
    transform: translate(284px, 733px);
  }
  12.82% {
    transform: translate(316px, 733px);
  }
  15.38% {
    transform: translate(348px, 760px);
  }
  17.95% {
    transform: translate(380px, 787px);
  }
  20.51% {
    transform: translate(412px, 814px);
  }
  23.08% {
    transform: translate(444px, 787px);
  }
  25.64% {
    transform: translate(476px, 787px);
  }
  28.21% {
    transform: translate(508px, 787px);
  }
  30.77% {
    transform: translate(540px, 787px);
  }
  33.33% {
    transform: translate(572px, 760px);
  }
  35.9% {
    transform: translate(604px, 733px);
  }
  38.46% {
    transform: translate(636px, 706px);
  }
  41.03% {
    transform: translate(668px, 733px);
  }
  43.59% {
    transform: translate(700px, 760px);
  }
  46.15% {
    transform: translate(732px, 787px);
  }
  48.72% {
    transform: translate(764px, 814px);
  }
  51.28% {
    transform: translate(796px, 787px);
  }
  53.85% {
    transform: translate(828px, 814px);
  }
  56.41% {
    transform: translate(860px, 787px);
  }
  58.97% {
    transform: translate(892px, 814px);
  }
  61.54% {
    transform: translate(924px, 841px);
  }
  64.1% {
    transform: translate(956px, 841px);
  }
  66.67% {
    transform: translate(988px, 841px);
  }
  69.23% {
    transform: translate(1020px, 868px);
  }
  71.79% {
    transform: translate(1052px, 868px);
  }
  74.36% {
    transform: translate(1084px, 868px);
  }
  76.92% {
    transform: translate(1116px, 868px);
  }
  79.49% {
    transform: translate(1148px, 895px);
  }
  82.05% {
    transform: translate(1180px, 922px);
  }
  84.62% {
    transform: translate(1212px, 922px);
  }
  87.18% {
    transform: translate(1244px, 895px);
  }
  89.74% {
    transform: translate(1276px, 922px);
  }
  92.31% {
    transform: translate(1308px, 949px);
  }
  94.87% {
    transform: translate(1340px, 922px);
  }
  97.44% {
    transform: translate(1372px, 949px);
  }
  100% {
    transform: translate(1404px, 949px);
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