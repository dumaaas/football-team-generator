<template>
  <div id="app">
    <h1>Football team generator</h1>
    <div class="players-wrapper">
      <h2>Pick players</h2>
      <div class="players">
        <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
          @pickPlayer="pickPlayer"
        />
      </div>
      <button @click="generateTeams()">Generate teams</button>
    </div>
    <FieldModal
      v-if="showField"
      :teamOne="teamOne"
      :teamTwo="teamTwo"
      :showTeams="showTeams"
      :players="players"
      :odds="odds"
      @openBettingModal="openBettingModal"
    />
    <BettingModal
      :showBettingModal="showBettingModal"
      :odd="odd"
      :fix="fix"
      @closeBettingModal="closeBettingModal()"
    />
    <div class="overlay" v-if="showField"></div>
  </div>
</template>

<script>
import FieldModal from "./components/FieldModal.vue";
import PlayerCard from "./components/PlayerCard.vue";
import BettingModal from "./components/BettingModal.vue";

export default {
  name: "App",
  components: {
    PlayerCard,
    FieldModal,
    BettingModal,
  },
  data() {
    return {
      showField: false,
      showTeams: false,
      odds: null,
      showBettingModal: false,
      // players: [
      //   {
      //     id: 1,
      //     name: "Marko Dumnić",
      //     avatar: "duma",
      //     overall: 97,
      //     position: "ST",
      //     nationalityImg:
      //       "https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg",
      //     clubImg:
      //       "https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg",
      //     height: "1.86",
      //     weight: "74",
      //     picked: false,
      //     strength: {
      //       pace: 80,
      //       shoot: 71,
      //       pass: 89,
      //       dribling: 80,
      //       physics: 52,
      //       defensive: 73,
      //     },
      //   },
      //   {
      //     id: 2,
      //     name: "Nemanja Pejaković",
      //     avatar: "pejache",
      //     overall: 98,
      //     position: "CB",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
      //     height: "1.86",
      //     weight: "94",
      //     picked: false,
      //     strength: {
      //       pace: 74,
      //       shoot: 85,
      //       pass: 88,
      //       dribling: 82,
      //       physics: 89,
      //       defensive: 92,
      //     },
      //   },
      //   {
      //     id: 3,
      //     name: "Miloš Jovović",
      //     avatar: "ckemi",
      //     overall: 99,
      //     position: "RW",
      //     nationalityImg:
      //       "https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg",
      //     clubImg:
      //       "https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg",
      //     height: "1.86",
      //     weight: "76",
      //     picked: false,
      //     strength: {
      //       pace: 86,
      //       shoot: 83,
      //       pass: 81,
      //       dribling: 82,
      //       physics: 63,
      //       defensive: 72,
      //     },
      //   },
      //   {
      //     id: 4,
      //     name: "Strahinja Kovačević",
      //     avatar: "capo",
      //     overall: 91,
      //     position: "CB",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg",
      //     height: "1.90",
      //     weight: "110",
      //     picked: false,
      //     strength: {
      //       pace: 72,
      //       shoot: 79,
      //       pass: 81,
      //       dribling: 73,
      //       physics: 92,
      //       defensive: 91,
      //     },
      //   },
      //   {
      //     id: 5,
      //     name: "Vojin Jovović",
      //     avatar: "vojo",
      //     overall: 99,
      //     position: "AMF",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg",
      //     height: "1.85",
      //     weight: "85",
      //     picked: false,
      //     strength: {
      //       pace: 83,
      //       shoot: 92,
      //       pass: 89,
      //       dribling: 91,
      //       physics: 82,
      //       defensive: 56,
      //     },
      //   },
      //   {
      //     id: 6,
      //     name: "Stefan Tomović",
      //     avatar: "toma1",
      //     overall: "99",
      //     position: "DMF",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
      //     height: "1.78",
      //     weight: "98",
      //     picked: false,
      //     strength: {
      //       pace: 72,
      //       shoot: 89,
      //       pass: 79,
      //       dribling: 71,
      //       physics: 92,
      //       defensive: 86,
      //     },
      //   },
      //   {
      //     id: 7,
      //     name: "Ivan Vuksanović",
      //     avatar: "smit",
      //     overall: 99,
      //     position: "LB",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/5/5d/Logo_FC_Red_Star_Belgrade.svg",
      //     height: "1.86",
      //     weight: "96",
      //     picked: false,
      //     strength: {
      //       pace: 81,
      //       shoot: 91,
      //       pass: 80,
      //       dribling: 84,
      //       physics: 92,
      //       defensive: 91,
      //     },
      //   },
      //   {
      //     id: 8,
      //     name: "Ilija Dumnić",
      //     avatar: "mladji",
      //     overall: 99,
      //     position: "CMF",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/sco/5/56/Real_Madrid_CF.svg",
      //     height: "1.84",
      //     weight: "89",
      //     picked: false,
      //     strength: {
      //       pace: 74,
      //       shoot: 93,
      //       pass: 83,
      //       dribling: 78,
      //       physics: 83,
      //       defensive: 79,
      //     },
      //   },
      //   {
      //     id: 9,
      //     name: "Srđan Bajović",
      //     avatar: "srki",
      //     overall: 99,
      //     position: "RB",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
      //     height: "1.80",
      //     weight: "90",
      //     picked: false,
      //     strength: {
      //       pace: 84,
      //       shoot: 82,
      //       pass: 78,
      //       dribling: 83,
      //       physics: 89,
      //       defensive: 89,
      //     },
      //   },
      //   {
      //     id: 10,
      //     name: "Dejan Đurđevac",
      //     avatar: "dejo",
      //     overall: 99,
      //     position: "FW",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
      //     height: "1.92",
      //     weight: "90",
      //     picked: false,
      //     strength: {
      //       pace: 89,
      //       shoot: 91,
      //       pass: 82,
      //       dribling: 86,
      //       physics: 84,
      //       defensive: 81,
      //     },
      //   },
      //   {
      //     id: 11,
      //     name: "Kure Arizabalaga",
      //     avatar: "kure",
      //     overall: 99,
      //     position: "GK",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
      //     height: "1.92",
      //     weight: "90",
      //     picked: false,
      //     strength: {
      //       pace: 72,
      //       shoot: 79,
      //       pass: 81,
      //       dribling: 73,
      //       physics: 92,
      //       defensive: 56,
      //     },
      //   },
      //   {
      //     id: 12,
      //     name: "Branko Marković",
      //     avatar: "banjac",
      //     overall: 99,
      //     position: "RB",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
      //     height: "1.80",
      //     weight: "90",
      //     picked: false,
      //     strength: {
      //       pace: 79,
      //       shoot: 71,
      //       pass: 73,
      //       dribling: 70,
      //       physics: 81,
      //       defensive: 73,
      //     },
      //   },
      //   {
      //     id: 13,
      //     name: "Stefan Terić",
      //     avatar: "tera",
      //     overall: 99,
      //     position: "CB",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
      //     height: "1.80",
      //     weight: "90",
      //     picked: false,
      //     strength: {
      //       pace: 74,
      //       shoot: 82,
      //       pass: 81,
      //       dribling: 84,
      //       physics: 85,
      //       defensive: 90,
      //     },
      //   },
      //   {
      //     id: 14,
      //     name: "Peđa Knežević",
      //     avatar: "djape",
      //     overall: 99,
      //     position: "GK",
      //     nationalityImg:
      //       "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      //     clubImg:
      //       "https://upload.wikimedia.org/wikipedia/en/3/3c/FK_Sutjeska_updated_logo_%281920%29.png",
      //     height: "1.92",
      //     weight: "90",
      //     picked: false,
      //     strength: {
      //       pace: 72,
      //       shoot: 79,
      //       pass: 81,
      //       dribling: 73,
      //       physics: 92,
      //       offensive: 33,
      //       defensive: 91,
      //     },
      //   },
      // ],
      players: [
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
    };
  },
  mounted() {
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
    closeBettingModal() {
      this.showBettingModal = false;
    },
    pickPlayer(value) {
      let objIndex = this.players.findIndex((obj) => obj.id == value.id);
      this.players[objIndex].picked = !this.players[objIndex].picked;
    },
    generateTeams() {
      this.showField = true;
      this.showTeams = true;
      setTimeout(() => {
        this.showTeams = false;
      }, 2250);
      const goalkeepers = this.players.filter((obj) => {
        return obj.position === "GK" && obj.picked == true;
      });

      var results = [];

      if (goalkeepers.length == 2) {
        this.teamOne.push(goalkeepers[0]);
        this.teamTwo.push(goalkeepers[1]);

        results = this.players
          .filter((obj) => {
            return obj.picked === true && obj.position !== "GK";
          })
          .sort(() => {
            return Math.random() - 0.5;
          });
        let flag = true;
        let firstTeam = [];
        let secondTeam = [];
        for (let i = 0; i < results.length; i++) {
          if (flag) {
            firstTeam.push(results[i]);
            flag = false;
          } else {
            secondTeam.push(results[i]);
            flag = true;
          }
        }
        let countPlayers = 0;
        let lastStrongerTeam = undefined;
        while (countPlayers < results.length / 2) {
          let pairOfTwo = this.findClosestPair(firstTeam, secondTeam);
          // this.teamOne.push(pairOfTwo[0]);
          // this.teamTwo.push(pairOfTwo[1]);
          let findItemOne = firstTeam.findIndex(
            (item) => item.id === pairOfTwo[0].id
          );

          let firstStrength =
            pairOfTwo[0].strength.pace +
            pairOfTwo[0].strength.shoot +
            pairOfTwo[0].strength.pass +
            pairOfTwo[0].strength.dribling +
            pairOfTwo[0].strength.defensive +
            pairOfTwo[0].strength.physics;

          let secondStrength =
            pairOfTwo[1].strength.pace +
            pairOfTwo[1].strength.shoot +
            pairOfTwo[1].strength.pass +
            pairOfTwo[1].strength.dribling +
            pairOfTwo[1].strength.defensive +
            pairOfTwo[1].strength.physics;

          console.log(firstStrength, secondStrength, "snage");

          if (firstStrength > secondStrength) {
            if (lastStrongerTeam == "first") {
              this.teamTwo.push(pairOfTwo[0]);
              this.teamOne.push(pairOfTwo[1]);
            } else if (lastStrongerTeam == "second") {
              this.teamOne.push(pairOfTwo[0]);
              this.Two.push(pairOfTwo[1]);
            } else {
              this.teamTwo.push(pairOfTwo[1]);
              this.teamOne.push(pairOfTwo[0]);
            }
          } else if (firstStrength < secondStrength) {
            if (lastStrongerTeam == "first") {
              this.teamTwo.push(pairOfTwo[1]);
              this.teamOne.push(pairOfTwo[0]);
            } else if (lastStrongerTeam == "second") {
              this.teamOne.push(pairOfTwo[1]);
              this.Two.push(pairOfTwo[0]);
            } else {
              this.teamTwo.push(pairOfTwo[1]);
              this.teamOne.push(pairOfTwo[0]);
            }
          } else {
            this.teamTwo.push(pairOfTwo[1]);
            this.teamOne.push(pairOfTwo[0]);
          }

          console.log(
            pairOfTwo[0].strength.pace +
              pairOfTwo[0].strength.shoot +
              pairOfTwo[0].strength.pass +
              pairOfTwo[0].strength.dribling +
              pairOfTwo[0].strength.defensive +
              pairOfTwo[0].strength.physics,
            "TIM JEDAN"
          );

          console.log(
            pairOfTwo[1].strength.pace +
              pairOfTwo[1].strength.shoot +
              pairOfTwo[1].strength.pass +
              pairOfTwo[1].strength.dribling +
              pairOfTwo[1].strength.defensive +
              pairOfTwo[1].strength.physics,
            "TIM DVA"
          );
          firstTeam.splice(findItemOne, 1);
          var findItemTwo = secondTeam.findIndex(
            (item) => item.id === pairOfTwo[1].id
          );
          secondTeam.splice(findItemTwo, 1);
          countPlayers++;
        }

        var teamOneSum = 0;
        var teamTwoSum = 0;

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

        console.log(teamOneSum, "prviTimSum pa drugiTimSum", teamTwoSum);
      } else {
        results = this.players
          .filter((obj) => {
            return obj.picked === true;
          })
          .sort(() => {
            return Math.random() - 0.5;
          });
        var [prvi, drugi] = this.divideIntoTeams(results);
        console.log(prvi, "prvi igrac", drugi);
        this.teamOne = prvi;
        this.teamTwo = drugi;
        // console.log(prvi, "prvi tim - drugi tim", drugi);
        // let flag = true;
        // let firstTeam = [];
        // let secondTeam = [];
        // for (let i = 0; i < results.length; i++) {
        //   if (flag) {
        //     firstTeam.push(results[i]);
        //     flag = false;
        //   } else {
        //     secondTeam.push(results[i]);
        //     flag = true;
        //   }
        // }
        // let countPlayers = 0;
        // let lastStrongerTeam = undefined;
        // while (countPlayers < results.length / 2) {
        //   let pairOfTwo = this.findClosestPair(firstTeam, secondTeam);
        //   // this.teamOne.push(pairOfTwo[0]);
        //   // this.teamTwo.push(pairOfTwo[1]);
        //   let findItemOne = firstTeam.findIndex(
        //     (item) => item.id === pairOfTwo[0].id
        //   );

        //   console.log(pairOfTwo, "parDava");

        //   let firstStrength =
        //     pairOfTwo[0].strength.pace +
        //     pairOfTwo[0].strength.shoot +
        //     pairOfTwo[0].strength.pass +
        //     pairOfTwo[0].strength.dribling +
        //     pairOfTwo[0].strength.defensive +
        //     pairOfTwo[0].strength.physics;

        //   let secondStrength =
        //     pairOfTwo[1].strength.pace +
        //     pairOfTwo[1].strength.shoot +
        //     pairOfTwo[1].strength.pass +
        //     pairOfTwo[1].strength.dribling +
        //     pairOfTwo[1].strength.defensive +
        //     pairOfTwo[1].strength.physics;

        //   console.log(firstStrength, secondStrength, "snage");

        //   if (firstStrength > secondStrength) {
        //     if (lastStrongerTeam == "first") {
        //       this.teamTwo.push(pairOfTwo[0]);
        //       this.teamOne.push(pairOfTwo[1]);
        //       this.lastStrongerTeam == "second";
        //     } else if (lastStrongerTeam == "second") {
        //       this.teamOne.push(pairOfTwo[0]);
        //       this.Two.push(pairOfTwo[1]);
        //       this.lastStrongerTeam == "first";
        //     } else {
        //       this.teamTwo.push(pairOfTwo[1]);
        //       this.teamOne.push(pairOfTwo[0]);
        //     }
        //   } else if (firstStrength < secondStrength) {
        //     if (lastStrongerTeam == "first") {
        //       this.teamTwo.push(pairOfTwo[1]);
        //       this.teamOne.push(pairOfTwo[0]);
        //       this.lastStrongerTeam == "second";
        //     } else if (lastStrongerTeam == "second") {
        //       this.teamOne.push(pairOfTwo[1]);
        //       this.Two.push(pairOfTwo[0]);
        //       this.lastStrongerTeam == "first";
        //     } else {
        //       this.teamTwo.push(pairOfTwo[1]);
        //       this.teamOne.push(pairOfTwo[0]);
        //     }
        //   } else {
        //     this.teamTwo.push(pairOfTwo[1]);
        //     this.teamOne.push(pairOfTwo[0]);
        //   }

        //   console.log(
        //     pairOfTwo[0].strength.pace +
        //       pairOfTwo[0].strength.shoot +
        //       pairOfTwo[0].strength.pass +
        //       pairOfTwo[0].strength.dribling +
        //       pairOfTwo[0].strength.defensive +
        //       pairOfTwo[0].strength.physics,
        //     "TIM JEDAN"
        //   );

        //   console.log(
        //     pairOfTwo[1].strength.pace +
        //       pairOfTwo[1].strength.shoot +
        //       pairOfTwo[1].strength.pass +
        //       pairOfTwo[1].strength.dribling +
        //       pairOfTwo[1].strength.defensive +
        //       pairOfTwo[1].strength.physics,
        //     "TIM DVA"
        //   );
        //   firstTeam.splice(findItemOne, 1);
        //   let findItemTwo = secondTeam.findIndex(
        //     (item) => item.id === pairOfTwo[1].id
        //   );
        //   secondTeam.splice(findItemTwo, 1);
        //   countPlayers++;
        // }

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

        // console.log(teamOneSum, "prviTimSum pa drugiTimSum", teamTwoSum);

        var [oddOne, oddTwo, oddDraw] = this.izracunajKvote(
          teamOneSum,
          teamTwoSum
        );

        this.odds = {
          oddOne: oddOne,
          oddTwo: oddTwo,
          oddDraw: oddDraw,
        };
      }
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

body {
  overflow-x: hidden;
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
  background: #110f08;
  padding: 20px 0;
  border-bottom: 1px solid #e9cc74;
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
  margin: 10px auto;
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
