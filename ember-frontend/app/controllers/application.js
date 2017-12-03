import Ember from 'ember';
const { get, set } = Ember;

function checkWinning(combo, symbol) {
  for (let i=0; i<combo.length; i++) {
    //loop through each array winning combo
    let count = 0;
    for (let j=0; j<symbol.length; j++) {
      if (combo[i].includes(symbol[j])) {
        count +=1;
      }
    }

    if (count === 3) {
      return true;
    }
  }
  return false;
}

export default Ember.Controller.extend({
  symbol: 'x',
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  seven: null,
  eight: null,
  nine: null,

  winCombo: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
  ],
  xBoxes: [],
  oBoxes: [],
  xScore: 0,
  oScore: 0,

  actions: {
    markBox(symbol, box, number){
      if (get(this, box)) { return }
      let currentPlayer = symbol === 'x' ? 'x' : 'o'
      let otherPlayer = symbol === 'x' ? '0' : 'x'
      let currentPlayerBoxes = get(this, eval('currentPlayer+"Boxes"'))
      let winCombo = get(this, 'winCombo');

      set(this, box, symbol);
      currentPlayerBoxes.pushObject(number);
      let won = checkWinning(winCombo, currentPlayerBoxes);
      if (won) {
        alert(currentPlayer + ' won')
        this.reset()
      } else if (this.draw()) {
        set(this, 'symbol', otherPlayer);
      }
    }
  },

  reset() {
    set(this, 'xBoxes', Ember.A());
    set(this, 'oBoxes', Ember.A());
    this.setProperties({ one: null, two: null, three: null, four: null, five: null, six: null, seven: null, eight: null, nine: null });
  }
});
