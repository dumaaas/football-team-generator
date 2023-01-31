<template>
    <div id="card">
      <div class="wrapper" @click="pickPlayer(player)">
        <div v-if="player.picked" class="player-picked">✅</div>
        <!-- *** fut-player-card ***-->
        <div class="fut-player-card" :class="player.picked ? 'picked' : ''">
          <!-- Player Card Top-->
          <div class="player-card-top">
            <div class="player-master-info">
              <div class="player-rating">
                <span>{{
                  Math.round(
                    (player.strength.pace +
                      player.strength.shoot +
                      player.strength.pass +
                      player.strength.dribling +
                      player.strength.defensive +
                      player.strength.physics) /
                      6
                  )
                }}</span>
              </div>
              <div class="player-position">
                <span>{{ player.position }}</span>
              </div>
              <div class="player-nation">
                <img
                  :src="player.nationalityImg"
                  alt="Argentina"
                  draggable="false"
                />
              </div>
              <div class="player-club">
                <img :src="player.clubImg" alt="Barcelona" draggable="false" />
              </div>
            </div>
            <div class="player-picture">
              <img
                :src="require(`../assets/${player.avatar}.png`)"
                alt="Dumaaas"
                draggable="false"
              />
              <div class="player-extra">
                <span>{{ player.height }}cm</span
                ><span>{{ player.weight }}kg</span>
              </div>
            </div>
          </div>
          <!-- Player Card Bottom-->
          <div class="player-card-bottom">
            <div class="player-info">
              <!-- Player Name-->
              <div class="player-name">
                <span>{{ player.name }}</span>
              </div>
              <!-- Player Features-->
              <div class="player-features">
                <div class="player-features-col">
                  <span>
                    <div class="player-feature-value">
                      {{ player.strength.pace }}
                    </div>
                    <div class="player-feature-title">PAC</div></span
                  ><span>
                    <div class="player-feature-value">
                      {{ player.strength.shoot }}
                    </div>
                    <div class="player-feature-title">SHO</div></span
                  ><span>
                    <div class="player-feature-value">
                      {{ player.strength.pass }}
                    </div>
                    <div class="player-feature-title">PAS</div></span
                  >
                </div>
                <div class="player-features-col">
                  <span>
                    <div class="player-feature-value">
                      {{ player.strength.dribling }}
                    </div>
                    <div class="player-feature-title">DRI</div></span
                  ><span>
                    <div class="player-feature-value">
                      {{ player.strength.defensive }}
                    </div>
                    <div class="player-feature-title">DEF</div></span
                  ><span>
                    <div class="player-feature-value">
                      {{ player.strength.physics }}
                    </div>
                    <div class="player-feature-title">PHY</div></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  props: {
    player: Object,
  },
  methods: {
    pickPlayer(player) {
      this.$emit("pickPlayer", player);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  min-height: 550px;
}

.wrapper .picked {
  filter: blur(3px);
}

.player-picked {
  position: absolute;
  top: 103px;
  z-index: 1000;
  right: 7px;
}

/*
  *** fut-player-card styles ***
*/
.fut-player-card {
  position: relative;
  width: 300px;
  height: 485px;
  background-image: url("../assets/card_bg.png");
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 3.8rem 0;
  z-index: 2;
  transition: 200ms ease-in;
}
.fut-player-card .player-card-top {
  position: relative;
  display: flex;
  color: #e9cc74;
  padding: 0 1.5rem;
}
.fut-player-card .player-card-top .player-master-info {
  position: absolute;
  line-height: 2.2rem;
  font-weight: 300;
  padding: 1.5rem 0;
  text-transform: uppercase;
}
.fut-player-card .player-card-top .player-master-info .player-rating {
  font-size: 2rem;
}
.fut-player-card .player-card-top .player-master-info .player-position {
  font-size: 1.4rem;
}
.fut-player-card .player-card-top .player-master-info .player-nation {
  display: block;
  width: 2rem;
  height: 25px;
  margin: 0.3rem 0;
}
.fut-player-card .player-card-top .player-master-info .player-nation img {
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.fut-player-card .player-card-top .player-master-info .player-club {
  display: block;
  width: 2.1rem;
  height: 40px;
}
.fut-player-card .player-card-top .player-master-info .player-club img {
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.fut-player-card .player-card-top .player-picture {
  width: 200px;
  height: 200px;
  margin-left: auto;
  overflow: hidden;
  margin-right: -21px;
  margin-top: 0;
}
.fut-player-card .player-card-top .player-picture img {
  width: 100%;
  height: 100%;

  position: relative;
  right: -1.5rem;
  bottom: 0;
}
.fut-player-card .player-card-top .player-picture .player-extra {
  position: absolute;
  right: 0;
  bottom: -0.5rem;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  height: 2rem;
  text-align: left;
  background: none;
  padding: 0 1.5rem;
}
.fut-player-card .player-card-top .player-picture .player-extra span {
  margin-left: 0.6rem;
  text-shadow: 2px 2px #333;
}

.fut-player-card
  .player-card-top
  .player-picture
  .player-extra
  span:first-child {
  margin-left: 0;
  text-shadow: 2px 2px #333;
}
.fut-player-card .player-card-bottom {
  position: relative;
}
.fut-player-card .player-card-bottom .player-info {
  display: block;
  padding: 0.3rem 0;
  color: #e9cc74;
  width: 90%;
  margin: 0 auto;
  height: auto;
  position: relative;
  z-index: 2;
}
.fut-player-card .player-card-bottom .player-info .player-name {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 1.6rem;
  text-transform: uppercase;
  border-bottom: 2px solid rgba(233, 204, 116, 0.1);
  padding-bottom: 0.3rem;
  overflow: hidden;
}
.fut-player-card .player-card-bottom .player-info .player-name span {
  display: block;
  text-shadow: 2px 2px #111;
}
.fut-player-card .player-card-bottom .player-info .player-features {
  margin: 0.5rem auto;
  display: flex;
  justify-content: center;
}
.fut-player-card
  .player-card-bottom
  .player-info
  .player-features
  .player-features-col {
  border-right: 2px solid rgba(233, 204, 116, 0.1);
  padding: 0 2.3rem;
}
.fut-player-card
  .player-card-bottom
  .player-info
  .player-features
  .player-features-col
  span {
  display: flex;
  font-size: 1.2rem;
  text-transform: uppercase;
}
.fut-player-card
  .player-card-bottom
  .player-info
  .player-features
  .player-features-col
  span
  .player-feature-value {
  margin-right: 0.3rem;
  font-weight: 700;
}
.fut-player-card
  .player-card-bottom
  .player-info
  .player-features
  .player-features-col
  span
  .player-feature-title {
  font-weight: 300;
}
.fut-player-card
  .player-card-bottom
  .player-info
  .player-features
  .player-features-col:last-child {
  border: 0;
}
</style>