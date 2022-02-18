const scheduler = require('node-schedule');
const _ = require('lodash');
const tragaPerras = () => _.sample(['Manzana', 'Moneda', '7', 'Perro', 'Rem']);
const gameLoop = async (obj) => {
    --obj.tries;
	obj.score = (obj.current = tragaPerras()) === '7' ? 1000 : 0;
	console.log(`Antes: ${obj.previous}; Ahora: ${obj.current}`);
}
let player = new Proxy({
    win: false,
	tries: 3,
	previous: "",
	score: 0,
	current: "",
    name: "Daniel" /* TO DO: ASK FOR SMOOTH INPUT */,
    job: scheduler.scheduleJob(
        '*/1 * * * * *', 
        () => gameLoop(player)
    )
}, {
    set: (t, p, v) => {
        if(p === 'current') {
			t.previous = t[p];
		}
		if(p === 'score' && v > 0) t.win = true;
		t[p] = v;
        if(t.win || t.tries <= 0) t.job.cancel(false);
    }
});
