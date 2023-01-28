<template>
  <div id="field">
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
        <p>{{ player.avatar }}</p>
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
        <p>{{ player.avatar }}</p>
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
  background-image: url("../assets/field.png");
  height: 576px;
  width: 387px;
  background-size: contain;
  background-repeat: no-repeat;
  border: 4px solid #e9cc74;
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
background: #17191F;
  width: auto;
  padding: 2px 6px;
  border: 1px solid #000;
  color: white;
}
</style>