import Ember from 'ember';
const { get, set } = Ember;

function checkWinning(combo, symbol) {
  for (let i = 0; i < combo.length; i++) {
    let count = 0;
    for (let j = 0; j < symbol.length; j++) {
      if (combo[i].includes(symbol[j])) {
        count ++;
      }
    }

    if (count === 3) {
      return true;
    }
  }
  return false;
}

function isDraw(xBoxes, oBoxes){
  return ((xBoxes.length + oBoxes.length) === 9)
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

  winCombos: [
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

  actions: {
    markBox(symbol, box, number){
      if (get(this, box)) { return }
      let currentPlay = symbol === 'x' ? 'x' : 'o'
      let otherPlay = symbol === 'x' ? 'o' : 'x'
      let currentPlayBoxes = get(this, eval('currentPlay+"Boxes"'))
      let winCombos = get(this, 'winCombos');

      set(this, box, symbol);
      currentPlayBoxes.pushObject(number);
      let won = checkWinning(winCombos, currentPlayBoxes);
      if (won) {
        this.winActions(currentPlay)
      } else if (isDraw(get(this, 'xBoxes'), get(this, 'oBoxes'))) {
        alert('Game is a draw')
        this.reset()
      } else {
        set(this, 'symbol', otherPlay);
      }
    },
    clearScores(){
      let model = this.model
      model.map(record => {
        record.set('score', 0)
        record.save()
      });
    }
  },
  winActions(winner){
    alert(winner + ' won')
    let record = this.get('model').findBy('name', winner)
    record.incrementProperty('score')
    record.save()
    this.reset()
  },
  reset() {
    set(this, 'xBoxes', Ember.A());
    set(this, 'oBoxes', Ember.A());
    this.setProperties({ one: null, two: null, three: null, four: null, five: null, six: null, seven: null, eight: null, nine: null });
  }
});
