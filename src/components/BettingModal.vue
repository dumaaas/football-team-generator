<template>
  <div
    class="betting-modal"
    :class="showBettingModal ? 'animate-modal-in' : 'animate-modal-out'"
  >
    <div class="betting-modal-header">
      <h4>Bet Slip</h4>
      <span @click="closeBettingModal()">X</span>
    </div>
    <div class="bet-slip">
      <div class="bet-slip-left">
        <span> sat, 29.01.2023. 18:00h </span>
        <h5>Team 1 - Team 2</h5>
        <p>Correct result</p>
      </div>
      <div class="bet-slip-right">
        <p>1</p>
        <span> 2.25 </span>
      </div>
    </div>

    <div class="winning-slip">
      <div class="winning-slip-first">
        <div>
          <p>GAMES <span>1</span></p>
        </div>
        <div>
          <p>ODD <span>2.25</span></p>
        </div>
      </div>
      <div class="winning-slip-second">
        <p>Stake</p>
        <input type="number" placeholder="Enter your stake" />
      </div>
      <div class="winning-slip-third">
        <p>Total stake</p>
        <span>25 €</span>
      </div>
      <div class="winning-slip-fourth">
        <p>Potentional payout</p>
        <span>300 €</span>
      </div>
    </div>

    <button class="betting-btn">Place your bet</button>
  </div>
</template>

<script>
export default {
  props: {
    showBettingModal: Boolean,
  },
  methods: {
    closeBettingModal() {
      this.$emit("closeBettingModal");
    },
  },
};
</script>

<style>
.betting-modal {
  position: absolute;
  right: 0;
  top: 0;
  min-height: 100vh;
  height: 100%;
  background: #000;
  width: 325px;
  border-left: 1px solid #e9cc74;
  z-index: 10000000;
  padding: 14px;
  transition: ease-in-out 0.65s;
  transform: translateX(350px);
}

.betting-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.betting-modal-header span {
  color: white;
  font-weight: 600;
  font-size: 23px;
  cursor: pointer;
}

.animate-modal-out {
  transform: translateX(350px);
  transition: ease-in-out 0.9s;
}

.animate-modal-in {
  transform: translateX(0);
  transition: ease-in-out 0.9s;
}

.betting-modal h4 {
  text-align: left;
  font-size: 23px;
  color: #e9cc74;
}

.bet-slip {
  border-radius: 8px;
  border: 1px solid #e9cc74;
  padding: 10px;
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  text-align: left;
}

.winning-slip {
  border-radius: 8px;
  border: 1px solid #e9cc74;
  padding: 10px;
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.winning-slip-first {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9cc74;
  padding-bottom: 10px;
}

.winning-slip-second {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9cc74;
  padding: 10px 0;
}

.winning-slip-third {
  display: flex;
  align-items: center;
  gap: 5px;
  border-bottom: 1px solid #e9cc74;
  padding: 10px 0;
}

.winning-slip-fourth {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}

.winning-slip-fourth p {
  color: white;
  font-size: 14px;
  font-weight: 400;
}

.winning-slip-fourth span {
  color: #e9cc74;
  font-size: 22px;
  font-weight: 800;
}

.winning-slip-third p {
  color: white;
  font-size: 14px;
  font-weight: 400;
}

.winning-slip-third span {
  color: #e9cc74;
  font-size: 14px;
  font-weight: 500;
}

.winning-slip-second p {
  font-size: 14px;
  font-weight: 400;
  color: white;
}

.winning-slip-second input {
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #e9cc74;
  background: rgba(255, 255, 255, 0.23);

  color: #e9cc74;
}

button.betting-btn {
  border: 1px solid #e9cc74;
  color: #e9cc74;
  background: #000;
  font-size: 16px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  margin-left: auto;
}

button.betting-btn:hover {
  border: 1px solid #000;
  color: #000;
  background: #e9cc74;
  font-size: 16px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  margin-left: auto;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #e9cc74;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #e9cc74;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: #e9cc74;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #e9cc74;
}

:focus {
  outline: 0 solid black;
  outline-offset: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.winning-slip-first p {
  font-weight: 600;
  font-size: 14;
  color: white;
}

.winning-slip-first span {
  font-weight: 600;
  font-size: 14;
  color: #e9cc74;
  padding-left: 6px;
}

.bet-slip span {
  color: rgba(255, 255, 255, 0.56);
  font-size: 12px;
  font-weight: 400;
}

.bet-slip h5 {
  color: #e9cc74;
  font-weight: 600;
  font-size: 18px;
}

.bet-slip p {
  color: white;
  font-weight: 500;
  font-size: 16px;
}

.bet-slip-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.bet-slip-right {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 80px;
}

.bet-slip-right p {
  font-size: 14px;
  font-weight: 500;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 6px;
  border: 1px solid #e9cc74;
  color: #e9cc74;
}

.bet-slip-right span {
  font-size: 14px;
  font-weight: 500;
  color: white;
}
</style>