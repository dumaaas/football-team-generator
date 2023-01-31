<template>
  <div id="app">
    <div class="header">
      <h1 v-if="!pickedPlayers.length">Football team generator</h1>
      <div v-else class="header-picked">
        <h1>Picked: {{ pickedPlayers.length }}/{{ teamSize * 2 }}</h1>
        <div class="header-players">
          <div
            class="header-player"
            v-for="player in pickedPlayers"
            :key="player.id"
          >
            <img class="" :src="require(`./assets/${player.avatar}.png`)" />
            <p>{{ player.nick }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="players-wrapper">
      <h2>
        Pick players
        <select v-model="teamTermin" style="margin-left: 8px">
          <option value="andro">Termin: Andro</option>
          <option value="pejke">Termin: Pejke</option>
        </select>
      </h2>
      <div class="">
        <input
          type="text"
          v-model="searchByName"
          placeholder="Search by name.."
          style="margin-top: 10px"
        />
        <select
          v-model="filterSearch"
          style="margin-left: 8px; margin-top: 10px"
        >
          <option selected value="random-filter">Random filter</option>
          <option value="overall-asc">Overall ASC</option>
          <option value="overall-desc">Overall DESC</option>
          <option value="pace-asc">Pace ASC</option>
          <option value="pace-desc">Pace DESC</option>
          <option value="shooting-asc">Shooting ASC</option>
          <option value="shooting-desc">Shooting DESC</option>
          <option value="pass-asc">Pass ASC</option>
          <option value="pass-desc">Pass DESC</option>
          <option value="dribling-asc">Dribling ASC</option>
          <option value="dribling-desc">Dribling DESC</option>
          <option value="defensive-asc">Defensive ASC</option>
          <option value="defensive-desc">Defensive DESC</option>
          <option value="physics-asc">Physics ASC</option>
          <option value="physics-desc">Physics DESC</option>
        </select>
        <select v-model="teamSize" style="margin-left: 8px; margin-top: 10px">
          <option value="3">Team size: 3</option>
          <option value="4">Team size: 4</option>
          <option value="5">Team size: 5</option>
          <option value="6">Team size: 6</option>
        </select>
      </div>
      <div class="players">
        <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
          @pickPlayer="pickPlayer"
        />
      </div>
      <button @click="generateTeams()">Generate teams</button>
      <button style="margin-left: 10px" @click="generateTeams('random')">
        Quick teams
      </button>
    </div>
    <FieldModal
      v-if="showField"
      :teamOne="teamOne"
      :teamTwo="teamTwo"
      :showTeams="showTeams"
      :players="players"
      :odds="odds"
      @openBettingModal="openBettingModal"
      @closeField="closeField"
    />
    <BettingModal
      :showBettingModal="showBettingModal"
      :odd="odd"
      :fix="fix"
      @closeBettingModal="closeBettingModal()"
    />
    <ErrorModal :msg="errorMsg" />
    <div class="overlay" v-if="showField"></div>
  </div>
</template>

<script>
import FieldModal from "./components/FieldModal.vue";
import PlayerCard from "./components/PlayerCard.vue";
import BettingModal from "./components/BettingModal.vue";
import ErrorModal from "./components/ErrorModal.vue";

export default {
  name: "App",
  components: {
    PlayerCard,
    FieldModal,
    BettingModal,
    ErrorModal,
  },
  data() {
    return {
      showField: false,
      showTeams: false,
      odds: null,
      showBettingModal: false,
      searchByName: "",
      filterSearch: "random-filter",
      teamSize: "5",
      teamTermin: "andro",
      playersCopy: [],
      errorMsg: "",
      showErrorModal: false,
      players: [],
      playersPejke: [
        {
          id: 1,
          name: "Marko Dumnić",
          avatar: "duma",
          nick: "duma",
          overall: 97,
          position: "ST",
          nationalityImg:
            "https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg",
          clubImg:
            "https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 80,
            shoot: 71,
            pass: 89,
            dribling: 80,
            physics: 52,
            defensive: 73,
          },
        },
        {
          id: 2,
          name: "Nemanja Pejaković",
          avatar: "pejache",
          nick: "pejache",
          overall: 98,
          position: "CB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
          height: "1.86",
          weight: "94",
          picked: false,
          strength: {
            pace: 74,
            shoot: 85,
            pass: 88,
            dribling: 82,
            physics: 89,
            defensive: 92,
          },
        },
        {
          id: 3,
          name: "Miloš Jovović",
          avatar: "ckemi",
          nick: "ckemi",
          overall: 99,
          position: "RW",
          nationalityImg:
            "https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg",
          clubImg:
            "https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg",
          height: "1.86",
          weight: "76",
          picked: false,
          strength: {
            pace: 86,
            shoot: 83,
            pass: 81,
            dribling: 82,
            physics: 63,
            defensive: 72,
          },
        },
        {
          id: 4,
          name: "Strahinja Kovačević",
          avatar: "capo",
          nick: "capo",
          overall: 91,
          position: "CB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/commons/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg",
          height: "1.90",
          weight: "110",
          picked: false,
          strength: {
            pace: 72,
            shoot: 79,
            pass: 81,
            dribling: 73,
            physics: 92,
            defensive: 91,
          },
        },
        {
          id: 5,
          name: "Vojin Jovović",
          avatar: "vojo",
          nick: "vojo",
          overall: 99,
          position: "AMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/commons/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg",
          height: "1.85",
          weight: "85",
          picked: false,
          strength: {
            pace: 83,
            shoot: 92,
            pass: 89,
            dribling: 91,
            physics: 82,
            defensive: 56,
          },
        },
        {
          id: 6,
          name: "Stefan Tomović",
          avatar: "toma1",
          nick: "toma",
          overall: "99",
          position: "DMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
          height: "1.78",
          weight: "98",
          picked: false,
          strength: {
            pace: 72,
            shoot: 89,
            pass: 79,
            dribling: 71,
            physics: 92,
            defensive: 86,
          },
        },
        {
          id: 7,
          name: "Ivan Vuksanović",
          avatar: "smit",
          nick: "smit",
          overall: 99,
          position: "LB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/commons/5/5d/Logo_FC_Red_Star_Belgrade.svg",
          height: "1.86",
          weight: "96",
          picked: false,
          strength: {
            pace: 81,
            shoot: 91,
            pass: 80,
            dribling: 84,
            physics: 92,
            defensive: 91,
          },
        },
        {
          id: 8,
          name: "Ilija Dumnić",
          avatar: "mladji",
          nick: "mladji",
          overall: 99,
          position: "CMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/sco/5/56/Real_Madrid_CF.svg",
          height: "1.84",
          weight: "89",
          picked: false,
          strength: {
            pace: 74,
            shoot: 93,
            pass: 83,
            dribling: 78,
            physics: 83,
            defensive: 79,
          },
        },
        {
          id: 9,
          name: "Srđan Bajović",
          avatar: "srki",
          nick: "srki",
          overall: 99,
          position: "RB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.80",
          weight: "90",
          picked: false,
          strength: {
            pace: 84,
            shoot: 82,
            pass: 78,
            dribling: 83,
            physics: 89,
            defensive: 89,
          },
        },
        {
          id: 10,
          name: "Dejan Đurđevac",
          avatar: "dejo",
          nick: "dejo",
          overall: 99,
          position: "FW",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.92",
          weight: "90",
          picked: false,
          strength: {
            pace: 89,
            shoot: 91,
            pass: 82,
            dribling: 86,
            physics: 84,
            defensive: 81,
          },
        },
        {
          id: 11,
          name: "Kure Arizabalaga",
          avatar: "kure",
          nick: "kure",
          overall: 99,
          position: "GK",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.92",
          weight: "90",
          picked: false,
          strength: {
            pace: 72,
            shoot: 79,
            pass: 81,
            dribling: 73,
            physics: 92,
            defensive: 56,
          },
        },
        {
          id: 12,
          name: "Branko Marković",
          avatar: "banjac",
          nick: "banjac",
          overall: 99,
          position: "RB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.80",
          weight: "90",
          picked: false,
          strength: {
            pace: 79,
            shoot: 71,
            pass: 73,
            dribling: 70,
            physics: 81,
            defensive: 73,
          },
        },
        {
          id: 13,
          name: "Stefan Terić",
          avatar: "tera",
          nick: "tera",
          overall: 99,
          position: "CB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.80",
          weight: "90",
          picked: false,
          strength: {
            pace: 74,
            shoot: 82,
            pass: 81,
            dribling: 84,
            physics: 85,
            defensive: 90,
          },
        },
        {
          id: 14,
          name: "Peđa Knežević",
          avatar: "djape",
          nick: "djape",
          overall: 99,
          position: "GK",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.92",
          weight: "90",
          picked: false,
          strength: {
            pace: 72,
            shoot: 79,
            pass: 81,
            dribling: 73,
            physics: 92,
            offensive: 33,
            defensive: 91,
          },
        },
      ],
      playersAndro: [
        {
          id: 1,
          name: "Marko Dumnić",
          avatar: "duma",
          nick: "duma",
          overall: 97,
          position: "ST",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
          clubImg:
            "https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 70,
            physics: 72,
            defensive: 70,
            shoot: 75,
            pass: 80,
            dribling: 82,
          },
        },
        {
          id: 2,
          name: "Pavle Janjić",
          avatar: "kure",
          nick: "paka",
          overall: 97,
          position: "AMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
          clubImg:
            "https://upload.wikimedia.org/wikinews/en/f/ff/AS_Roma_logo.svg",
          height: "1.90",
          weight: "82",
          picked: false,
          strength: {
            pace: 88,
            physics: 78,
            defensive: 83,
            shoot: 75,
            pass: 75,
            dribling: 87,
          },
        },
        {
          id: 3,
          name: "Luka Rakojević",
          avatar: "ludza",
          nick: "ludza",
          overall: 97,
          position: "CMF",
          nationalityImg:
            "https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/commons/e/e3/Boca_Juniors_logo18.svg",
          height: "1.93",
          weight: "128",
          picked: false,
          strength: {
            pace: 55,
            physics: 95,
            defensive: 55,
            shoot: 80,
            pass: 95,
            dribling: 70,
          },
        },
        {
          id: 4,
          name: "Andrija Vasiljević",
          avatar: "andro",
          nick: "andro",
          overall: 97,
          position: "CB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 90,
            physics: 95,
            defensive: 90,
            shoot: 70,
            pass: 70,
            dribling: 66,
          },
        },
        {
          id: 5,
          name: "Luka Vasiljević",
          avatar: "lukaV",
          nick: "luka",
          overall: 97,
          position: "CB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 85,
            physics: 90,
            defensive: 85,
            shoot: 70,
            pass: 70,
            dribling: 70,
          },
        },
        {
          id: 6,
          name: "Luka Tončić",
          avatar: "kure",
          nick: "tonči",
          overall: 97,
          position: "LW",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 72,
            physics: 65,
            defensive: 70,
            shoot: 72,
            pass: 75,
            dribling: 75,
          },
        },
        {
          id: 7,
          name: "Andrej Vukajlović",
          avatar: "kure",
          nick: "andrej",
          overall: 97,
          position: "RB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://i1.sndcdn.com/avatars-000143681077-7am4hl-t200x200.jpg",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 70,
            physics: 67,
            defensive: 70,
            shoot: 65,
            pass: 65,
            dribling: 62,
          },
        },
        {
          id: 8,
          name: "Mićo Kontić",
          avatar: "mico",
          nick: "mićo",
          overall: 97,
          position: "LB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 70,
            physics: 72,
            defensive: 70,
            shoot: 60,
            pass: 65,
            dribling: 62,
          },
        },
        {
          id: 9,
          name: "Stefan Karadžić",
          avatar: "švedo",
          nick: "švedo",
          overall: 97,
          position: "AMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 73,
            physics: 80,
            defensive: 62,
            shoot: 80,
            pass: 75,
            dribling: 80,
          },
        },
        {
          id: 10,
          name: "Nemanja Delić",
          avatar: "kure",
          nick: "neli",
          overall: 97,
          position: "DMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 67,
            physics: 80,
            defensive: 68,
            shoot: 67,
            pass: 82,
            dribling: 75,
          },
        },
        {
          id: 11,
          name: "Zoran ?",
          avatar: "kure",
          nick: "zoran",
          overall: 97,
          position: "CB",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 73,
            physics: 85,
            defensive: 68,
            shoot: 80,
            pass: 70,
            dribling: 80,
          },
        },
        {
          id: 12,
          name: "Nemanja Ostojić",
          avatar: "kure",
          nick: "ostoja",
          overall: 97,
          position: "AMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 85,
            physics: 62,
            defensive: 55,
            shoot: 82,
            pass: 85,
            dribling: 82,
          },
        },
        {
          id: 13,
          name: "Nikola Backović",
          avatar: "kure",
          nick: "bacak",
          overall: 97,
          position: "CF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://i1.sndcdn.com/avatars-000143681077-7am4hl-t200x200.jpg",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 58,
            physics: 95,
            defensive: 60,
            shoot: 79,
            pass: 65,
            dribling: 62,
          },
        },
        {
          id: 14,
          name: "Miodrag Radović",
          avatar: "kure",
          nick: "toba",
          overall: 97,
          position: "DMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://i1.sndcdn.com/avatars-000143681077-7am4hl-t200x200.jpg",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 65,
            physics: 80,
            defensive: 65,
            shoot: 70,
            pass: 67,
            dribling: 67,
          },
        },
        {
          id: 15,
          name: "Filip Sarić",
          avatar: "kure",
          nick: "fika",
          overall: 97,
          position: "DMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 66,
            physics: 80,
            defensive: 68,
            shoot: 80,
            pass: 85,
            dribling: 80,
          },
        },
        {
          id: 16,
          name: "Igor Perović",
          avatar: "kure",
          nick: "iggi",
          overall: 97,
          position: "CMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 73,
            physics: 80,
            defensive: 65,
            shoot: 85,
            pass: 67,
            dribling: 70,
          },
        },
        {
          id: 17,
          name: "Dado Perović",
          avatar: "kure",
          nick: "dado",
          overall: 97,
          position: "CMF",
          nationalityImg:
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
          clubImg:
            "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
          height: "1.86",
          weight: "74",
          picked: false,
          strength: {
            pace: 67,
            physics: 75,
            defensive: 68,
            shoot: 77,
            pass: 77,
            dribling: 82,
          },
        },
      ],
      teamOne: [],
      teamTwo: [],
      odd: null,
      fix: null,
      pickedPlayers: [],
    };
  },
  watch: {
    searchByName(newVal) {
      var results = this.playersCopy.filter((obj) => {
        return obj.name.toLowerCase().includes(newVal.toLowerCase());
      });

      this.players = results;
    },
    teamTermin(newVal) {
      localStorage.setItem("teamTermin", newVal);
      this.playersCopy =
        newVal == "andro" ? this.playersAndro : this.playersPejke;
      this.players = newVal == "andro" ? this.playersAndro : this.playersPejke;
      this.pickedPlayers = [];
      console.log("hej");
    },
    teamSize(newVal) {
      if (this.pickedPlayers.length > parseInt(newVal) * 2) {
        this.errorMsg = "You picked too many players for this team size!";
        setTimeout(() => {
          this.errorMsg = "";
        }, 5000);
        this.pickedPlayers = [];
        this.players.forEach((obj) => {
          if (obj.picked) {
            obj.picked = !obj.picked;
          }
        });
      }
    },
    filterSearch(newVal) {
      switch (newVal) {
        case "random-filter":
          this.players.sort(() => {
            return Math.random() - 0.5;
          });
          break;
        case "overall-asc":
          this.players.sort(
            (a, b) =>
              Math.round(
                (a.strength.pace +
                  a.strength.physics +
                  a.strength.defensive +
                  a.strength.shoot +
                  a.strength.pass +
                  a.strength.dribling) /
                  6
              ) -
              Math.round(
                (b.strength.pace +
                  b.strength.physics +
                  b.strength.defensive +
                  b.strength.shoot +
                  b.strength.pass +
                  b.strength.dribling) /
                  6
              )
          );
          break;
        case "overall-desc":
          this.players.sort(
            (a, b) =>
              Math.round(
                (b.strength.pace +
                  b.strength.physics +
                  b.strength.defensive +
                  b.strength.shoot +
                  b.strength.pass +
                  b.strength.dribling) /
                  6
              ) -
              Math.round(
                (a.strength.pace +
                  a.strength.physics +
                  a.strength.defensive +
                  a.strength.shoot +
                  a.strength.pass +
                  a.strength.dribling) /
                  6
              )
          );
          break;
        case "pace-asc":
          this.players.sort((a, b) => a.strength.pace - b.strength.pace);
          break;
        case "pace-desc":
          this.players.sort((a, b) => b.strength.pace - a.strength.pace);
          break;
        case "shooting-asc":
          this.players.sort(
            (a, b) => a.strength.shooting - b.strength.shooting
          );
          break;
        case "shooting-desc":
          this.players.sort(
            (a, b) => b.strength.shooting - a.strength.shooting
          );
          break;
        case "pass-asc":
          this.players.sort((a, b) => a.strength.pass - b.strength.pass);
          break;
        case "pass-desc":
          this.players.sort((a, b) => b.strength.pass - a.strength.pass);
          break;
        case "dribling-asc":
          this.players.sort(
            (a, b) => a.strength.dribling - b.strength.dribling
          );
          break;
        case "dribling-desc":
          this.players.sort(
            (a, b) => b.strength.dribling - a.strength.dribling
          );
          break;
        case "defensive-asc":
          this.players.sort(
            (a, b) => a.strength.defensive - b.strength.defensive
          );
          break;
        case "defensive-desc":
          this.players.sort(
            (a, b) => b.strength.defensive - a.strength.defensive
          );
          break;
        case "physics-asc":
          this.players.sort((a, b) => a.strength.physics - b.strength.physics);
          break;
        case "physics-desc":
          this.players.sort((a, b) => b.strength.physics - a.strength.physics);
          break;
        default:
          break;
      }
    },
    players: {
      deep: true,
      handler() {
        this.pickedPlayers = this.playersCopy.filter((obj) => {
          return obj.picked == true;
        });
      },
    },
  },
  mounted() {
    this.teamTermin =
      localStorage.getItem("teamTermin") == "pejke" ? "pejke" : "andro";

    this.players =
      localStorage.getItem("teamTermin") == "pejke"
        ? this.playersPejke
        : this.playersAndro;

    this.playersCopy = this.players;
    this.players.sort(() => {
      return Math.random() - 0.5;
    });
  },
  methods: {
    openBettingModal(odd, fix) {
      this.showBettingModal = true;
      this.odd = odd;
      this.fix = fix;
      this;
    },
    closeField() {
      const b = document.querySelector("body");
      b.classList.remove("locked");
      this.showField = false;
    },
    closeBettingModal() {
      this.showBettingModal = false;
    },
    pickPlayer(value) {
      if (!value.picked && this.pickedPlayers.length + 1 > this.teamSize * 2) {
        this.errorMsg = "You already picked maximum nubmer of players.";
        setTimeout(() => {
          this.errorMsg = "";
        }, 5000);
      } else {
        let objIndex = this.players.findIndex((obj) => obj.id == value.id);
        this.players[objIndex].picked = !this.players[objIndex].picked;
      }
    },
    generateTeams(teamKind) {
      // validations
      if (this.pickedPlayers.length % 2 !== 0 && teamKind === undefined) {
        this.errorMsg = "Number of players must be even!";
        setTimeout(() => {
          this.errorMsg = "";
        }, 5000);
        return;
      }
      if (
        this.pickedPlayers.length !== this.teamSize * 2 &&
        teamKind === undefined
      ) {
        this.errorMsg =
          "You have to pick exactly " + this.teamSize * 2 + " players!";
        setTimeout(() => {
          this.errorMsg = "";
        }, 5000);
        return;
      }

      // ako je prosao validacije zakljucaj body
      window.scrollTo(0, 0);
      const b = document.querySelector("body");
      b.classList.add("locked");

      // generating teams

      // show team field
      this.showField = true;
      this.showTeams = true;
      setTimeout(() => {
        this.showTeams = false;
      }, 2250);

      // find picked players and sort them randomly
      var results = [];
      if (teamKind === undefined) {
        results = this.pickedPlayers.sort(() => {
          return Math.random() - 0.5;
        });
      } else {
        results = this.players
          .sort(() => {
            return Math.random() - 0.5;
          })
          .slice(0, parseInt(this.teamSize * 2));
        console.log(
          results,
          "hehejhejhejhe",
          this.players,
          "team size",
          this.teamSize
        );
      }

      // divide picked players into two equal teams
      var [prvi, drugi] = this.divideIntoTeams(results);
      this.teamOne = prvi;
      this.teamTwo = drugi;

      // get teamOne and teamTwo strength score
      var [teamOneSum, teamTwoSum] = this.getTeamSums();
      // counts odds
      var [oddOne, oddTwo, oddDraw] = this.izracunajKvote(
        teamOneSum,
        teamTwoSum
      );
      // set odds
      this.odds = {
        oddOne: oddOne,
        oddTwo: oddTwo,
        oddDraw: oddDraw,
      };
    },
    getTeamSums() {
      let teamOneSum = 0;
      let teamTwoSum = 0;

      this.teamOne.forEach((item) => {
        teamOneSum +=
          item.strength.pace +
          item.strength.shoot +
          item.strength.pass +
          item.strength.dribling +
          item.strength.defensive +
          item.strength.physics;
      });

      this.teamTwo.forEach((item) => {
        teamTwoSum +=
          item.strength.pace +
          item.strength.shoot +
          item.strength.pass +
          item.strength.dribling +
          item.strength.defensive +
          item.strength.physics;
      });
      return [teamOneSum, teamTwoSum];
    },
    findClosestPair(firstTeam, secondTeam) {
      let closestPair;
      let closestDiff = Infinity;
      for (let i = 0; i < firstTeam.length; i++) {
        for (let j = 0; j < secondTeam.length; j++) {
          let currentDiff = 0;
          for (let prop in firstTeam[i].strength) {
            console.log(prop, "hejhejej", firstTeam[i].strength[prop]);
            currentDiff += Math.abs(
              firstTeam[i].strength[prop] - secondTeam[j].strength[prop]
            );
          }
          if (currentDiff < closestDiff) {
            closestDiff = currentDiff;
            closestPair = [
              firstTeam[i],
              secondTeam[j],
              { better: firstTeam[i] },
            ];
          } else if (currentDiff === closestDiff) {
            closestPair = [firstTeam[i], secondTeam[j], { better: "Same" }];
          } else {
            closestPair = [
              firstTeam[i],
              secondTeam[j],
              { better: secondTeam[j] },
            ];
          }
        }
      }
      console.log(closestPair, "hej mala malena");
      return closestPair;
    },
    divideIntoTeams(players) {
      // sortiraj igrače po zbiru svih ocena
      // players.sort(
      //   (a, b) =>
      //     a.strength.pace +
      //     a.strength.physics +
      //     a.strength.defensive +
      //     a.strength.shoot +
      //     a.strength.pass +
      //     a.strength.dribling -
      //     (b.strength.pace +
      //       b.strength.physics +
      //       b.strength.defensive +
      //       b.strength.shoot +
      //       b.strength.pass +
      //       b.strength.dribling)
      // );

      // podeli igrače na dva tima
      let team1 = [];
      let team2 = [];

      for (let i = 0; i < players.length; i++) {
        const player = players[i];

        // ako igrač ima veći broj bodova u ofanzivnim kriterijumima
        if (
          player.strength.shoot +
            player.strength.pass +
            player.strength.dribling >
          player.strength.pace +
            player.strength.physics +
            player.strength.defensive
        ) {
          // dodaj u tim sa većim brojem igrača sa ofanzivnim kriterijumima
          (team1.filter(
            (p) =>
              p.strength.shoot + p.strength.pass + p.strength.dribling >
              p.strength.pace + p.strength.physics + p.strength.defensive
          ).length >=
          team2.filter(
            (p) =>
              p.strength.shoot + p.strength.pass + p.strength.dribling >
              p.strength.pace + p.strength.physics + p.strength.defensive
          ).length
            ? team2
            : team1
          ).push(player);
        } else {
          // dodaj u tim sa većim brojem igrača sa defanzivnim kriterijumima
          (team1.filter(
            (p) =>
              p.strength.shoot + p.strength.pass + p.strength.dribling <=
              p.strength.pace + p.strength.physics + p.strength.defensive
          ).length >=
          team2.filter(
            (p) =>
              p.strength.shoot + p.strength.pass + p.strength.dribling <=
              p.strength.pace + p.strength.physics + p.strength.defensive
          ).length
            ? team2
            : team1
          ).push(player);
        }

        // ako jedan tim ima više igrača od drugog, prebaci igrača iz jednog tima u drugi
        if (team1.length > team2.length + 1) {
          const movedPlayer = team1.pop();
          team2.push(movedPlayer);
        } else if (team2.length > team1.length + 1) {
          const movedPlayer = team2.pop();
          team1.push(movedPlayer);
        }
      }

      // ako timovi nisu jednake dužine, vrati grešku
      if (team1.length !== team2.length) {
        return new Error("Teams are not of equal length");
      }

      return [team1, team2];
    },
    izracunajKvote(snagaEkipe1, snagaEkipe2) {
      console.log("hej ti", typeof snagaEkipe1);
      var implicitnaKvota1 = 1 / (snagaEkipe1 / (snagaEkipe1 + snagaEkipe2));
      var implicitnaKvota2 = 1 / (snagaEkipe2 / (snagaEkipe1 + snagaEkipe2));
      var implicitnaKvotaN = 1 - (implicitnaKvota1 + implicitnaKvota2);
      // console.log('hej jajaja',  implicitnaKvota1)
      // var kvota1 = parseFloat((1 / implicitnaKvota1).toFixed(2));
      // var kvota2 = parseFloat((1 / implicitnaKvota2).toFixed(2));
      // var kvotaN = parseFloat((1 / implicitnaKvotaN).toFixed(2));
      // console.log('hej jajaja 2',  kvota1)

      return [
        implicitnaKvota1.toFixed(2),
        implicitnaKvota2.toFixed(2),
        Math.abs(implicitnaKvotaN).toFixed(2),
      ];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed&display=swap");
#app {
  font-family: "Saira Semi Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #997521;
  background: radial-gradient(ellipse at center, #45350f 0%, black);
  min-height: 100vh;
  overflow-x: hidden;
}

body.locked {
  overflow: hidden;
}

input,
select {
  position: relative;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #e9cc74;
  background: rgba(255, 255, 255, 0.23);
  color: #e9cc74;
}

select {
  padding: 5px 8px;
}

body {
  overflow-x: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.overlay {
  top: 0;
  left: 0;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: red;
  position: absolute;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.87);
}

h1 {
  text-transform: uppercase;
  color: #e9cc74;
  font-size: 44px;
}

@media only screen and (max-width: 520px) {
  h1 {
    font-size: 32px;
  }
}

.header {
  background: #110f08;
  padding: 20px 0;
  border-bottom: 1px solid #e9cc74;
}

.header-players {
  margin: 0 auto;
  overflow-x: auto;
}

.header-player {
  display: inline-block;
  margin-right: 8px;
}

.header-player:last-child() {
  margin-right: 0;
}

.header-player img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #e9cc74;
  background: linear-gradient(to right, #997521, #e9cc74);
}

.header-player p {
  color: #e9cc74;
  text-transform: uppercase;
}

.header-picker {
  display: flex;
  gap: 10px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.players-wrapper {
  padding: 20px 0;
}

.players-wrapper h2 {
  font-size: 32px;
  border-bottom: 1px solid #e9cc74;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  color: #e9cc74;
  width: 200px;
  text-align: center;
  text-shadow: 2px 2px #997521;
}

.players {
  font-weight: 400;
  padding: 0 20px;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
}

button {
  background: radial-gradient(ellipse at center, #45350f 0%, black);
  color: #997521;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  text-transform: uppercase;
  border: 1px solid #997521;
  margin-top: 30px;
  transition: all 0.3s ease-in-out;
}

button:hover {
  color: rgba(0, 0, 0, 0.87);
  background: #997521;
  border: 1px solid rgba(0, 0, 0, 0.87);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: radial-gradient(ellipse at center, #45350f 0%, black);
}
::-webkit-scrollbar-thumb {
  background: #997521;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
