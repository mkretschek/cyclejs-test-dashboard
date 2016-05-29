
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

function main (sources) {

  var props$ = sources.props$;
  var vtree$ = props$.map(function (el) {
    console.log(el);
    return CycleDOM.p('num. of orders ' + el.orders);
  });

  return {
    DOM: vtree$
  };
}


var drivers = {
  props$: function () { return Observable.of({category: 'bedroom', orders: 0, amount: 0}) },
  DOM: window.CycleDOM.makeDOMDriver('#main-container')
};


Cycle.run(main, drivers);