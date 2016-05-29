
console.info('Connecting to socket.io...');

var socket = io('http://localhost:8888');
var Observable = Rx.Observable;

var div = CycleDOM.div;
var span = CycleDOM.span;
var p = CycleDOM.p;

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

  var vtree$ = props$.map(function (category) {
    var title = p('.category-title', category.name);
    var orders = div('.category-property.category-orders', ['# orders:', span(null, category.orders)]);
    var totalNoi = div('.category-property.category-amount', ['Amount:', span(null, category.amount)]);
    return div('.category', [title, orders, totalNoi]);
  });

  return {
    DOM: vtree$
  };
}


var drivers = {
  props$: function () { return Observable.of({name: 'bedroom', orders: 0, amount: 1}) },
  DOM: window.CycleDOM.makeDOMDriver('#main-container')
};


Cycle.run(main, drivers);