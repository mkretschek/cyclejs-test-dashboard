
console.info('Connecting to socket.io...');

var socket = io('http://localhost:8888');
var Observable = Rx.Observable;

socket.on('connect', function () {
  console.info('connected');

  socket.on('addOrder', function (msg) {
    console.log('ADD ORDER:', msg);
  });
});


console.log('@@@@@@@@@@@@@@@@@@@@', Cycle);
console.log('>>>>>>>>>>>>>>>>>>>>', CycleDOM);
console.log('>>>>>>>>>>>>>>>>>>>>', Rx);

function main () {

  var source$ = Observable.from([
    {category: 'bedroom', orders: 0, amount: 0},
    {category: 'kitchen', orders: 2, amount: 0},
  ]);

  var vtree$ = source$.map(function (el) {
    return CycleDOM.p('num. of orders ' + el.orders);
  });

  return {
    DOM: vtree$
  };
}


var drivers = {
  DOM: window.CycleDOM.makeDOMDriver('#main-container')
};


Cycle.run(main, drivers);