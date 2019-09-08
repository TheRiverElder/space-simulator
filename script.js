

let cvsSpace = document.getElementById('cvsSpace');
cvsSpace.width = window.innerWidth;
cvsSpace.height = window.innerHeight;

window.addEventListener('resize', () => {
    cvsSpace.width = window.innerWidth;
    cvsSpace.height = window.innerHeight;
});

let dragging = false;
let last = null;
cvsSpace.addEventListener('mousedown', (event) => {
    dragging = true;
    last = new Vector(event.offsetX, event.offsetY);
});
cvsSpace.addEventListener('mousemove', () => {
    if (dragging) {
        let pos = new Vector(event.offsetX, event.offsetY);
        let delta = pos.sub(last);
        spaceGraphic.offset.addSelf(delta);
        last = pos;
    }
});
cvsSpace.addEventListener('mouseup', () => dragging = false);
cvsSpace.addEventListener('mouseleave', () => dragging = false);


let spaceGraphic = new SpaceGraphic(cvsSpace);

let refresher = sm => spaceGraphic.drawSpace(sm);

let spaceManager = new SpaceManager(refresher);

let prevTime = Date.now();
let pid = setInterval(() => {
    let time = Date.now();
    spaceManager.update((time - prevTime) / 1000 * CONFIG.TIME_RATE);
    prevTime = time;
}, 1 / CONFIG.UPS);


function init() {
    let sun = new StaticStar({
        mass: 10000,
        density: 10,
        position: Vector.zero,
        color: '#FFFFFF',
    });
    spaceManager.add(sun);

    let rMax = (cvsSpace.width > cvsSpace.height ? cvsSpace.width : cvsSpace.height) / 2;

    for (let i = 0; i < 500; i++) {
        let pl = rand(rMax , rMax / 2);
        let pa = rand(2 * Math.PI);
        let star = new Star({
            mass: rand(10,3),
            position: new Vector(pl * Math.cos(pa), pl * Math.sin(pa)),
            //velocity: new Vector(rand(3, -3), rand(3, -3)),
            color: randColor(),
        });
        spaceManager.born(star);
    }
}

init();

