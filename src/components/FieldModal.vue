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
    <div class="team-one">
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
          {{
            player.strength.pace +
            player.strength.shoot +
            player.strength.pass +
            player.strength.dribling +
            player.strength.defensive +
            player.strength.physics
          }}
        </p>
      </div>
    </div>
    <div class="team-two">
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
          {{
            player.strength.pace +
            player.strength.shoot +
            player.strength.pass +
            player.strength.dribling +
            player.strength.defensive +
            player.strength.physics
          }}
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

.field-outline {
  position: absolute;
  top: 10px;
  left: 10px;
  border: 1px solid #e9cc74;
  width: 97%;
  height: 548px;
  width: 358px;
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
}

.player-i-1 {
  position: absolute;
  top: 100px;
  left: 60px;
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
  background: #e9cc74;
}

.player-i p {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background: #e9cc74;
  width: auto;
  padding: 2px 6px;
  border: 1px solid #000;
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
</style>