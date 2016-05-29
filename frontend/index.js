
console.info('Connecting to socket.io...');

var socket = io('http://localhost:8888');

socket.on('connect', function () {
  console.info('connected');

  socket.on('addOrder', function (msg) {
    console.log('ADD ORDER:', msg);
  });
});


console.log('@@@@@@@@@@@@@@@@@@@@', Cycle);
console.log('>>>>>>>>>>>>>>>>>>>>', CycleDOM);
console.log('>>>>>>>>>>>>>>>>>>>>', Rx);

function main() {
  var vtree$ = Rx.Observable.from([CycleDOM.p('foobar')]);

  return {
    DOM: vtree$
  };
}


var drivers = {
  DOM: window.CycleDOM.makeDOMDriver('#main-container')
};


Cycle.run(main, drivers);