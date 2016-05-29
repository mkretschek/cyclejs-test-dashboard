
console.info('Connecting to socket.io...');

var socket = io('http://localhost:8888');
var Observable = Rx.Observable;

var h1 = CycleDOM.h1;
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


function Category(data) {

  var vtree$ = Observable.of(data).map(function (category) {
    var title = p('.category-title', category.name);
    var orders = div('.category-property.category-orders', ['# orders:', span(null, category.orders)]);
    var totalNoi = div('.category-property.category-amount', ['Amount:', span(null, category.amount)]);
    return div('.category', [title, orders, totalNoi]);
  });

  return {
    DOM: vtree$
  };
}


function main(sources) {

  var socket$ = Observable.fromEvent(socket, 'addOrder');
  var props$ = sources.props$;
  var values$ = props$.concat(socket$);

  var vtree$ = Observable.combineLatest(props$, values$, function (props, values) {
    return div([
              h1('Categories'),
              div(
                values.categories.map(function (categoryData) {
                  return Category(categoryData).DOM;
                })
              ),
              p('Total ' + values.total)
          ]
        )
  });

  return {
    DOM: vtree$
  };
}


var drivers = {
  props$: function () {
    return Observable.of({
      categories: [
        {name: 'bedroom', orders: 0, amount: 0},
        {name: 'kitchen', orders: 0, amount: 0}
      ],
      total: 0
    });
  },
  DOM: window.CycleDOM.makeDOMDriver('#main-container')
};


Cycle.run(main, drivers);
