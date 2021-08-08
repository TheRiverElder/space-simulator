

let cvsSpace = document.getElementById('cvsSpace');
cvsSpace.width = window.innerWidth;
cvsSpace.height = window.innerHeight;

window.addEventListener('resize', () => {
    cvsSpace.width = window.innerWidth;
    cvsSpace.height = window.innerHeight;
});

let paused = false;
let dragging = false;
let last = null;
cvsSpace.addEventListener('mousedown', (event) => {
    dragging = true;
    last = new Vector(event.offsetX, event.offsetY);
});
cvsSpace.addEventListener('mousemove', (event) => {
    if (dragging) {
        let pos = new Vector(event.offsetX, event.offsetY);
        moveCanvas(last, pos);
        last = pos;
    }
});
cvsSpace.addEventListener('mouseup', () => dragging = false);
cvsSpace.addEventListener('mouseleave', () => dragging = false);

cvsSpace.addEventListener('wheel', (event) => {
    scaleCanvas(-constraints(event.deltaY, -0.1, 0.1), new Vector(event.offsetX, event.offsetY));
});

document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
        paused = !paused;
        event.preventDefault();
        event.stopPropagation();
    }
});

function scaleCanvas(delta, mousePos) {
    const oldScale = spaceGraphic.scale;
    const newScale = constraints(oldScale + delta, 0.2, 20);
    const newOffset = mousePos.sub(spaceGraphic.offset).mul(newScale / oldScale).opposite().add(mousePos);
    spaceGraphic.offset.setSelf(newOffset);
    spaceGraphic.scale = newScale;
}

function moveCanvas(lastMousePos, newMousePos) {
    let delta = newMousePos.sub(lastMousePos);
    spaceGraphic.offset.addSelf(delta);
}


let spaceGraphic = new SpaceGraphic(cvsSpace);

let refresher = sm => spaceGraphic.drawSpace(sm);

// let spaceManager = new SpaceManager(refresher);
let spaceManager = new SpaceManager(2000, null);

let prevTime = 0;
let pid = setInterval(() => {
    let time = prevTime + 1 / CONFIG.UPS;
    if (!paused) {
        spaceManager.update((time - prevTime) / 1000 * CONFIG.TIME_RATE);
    }
    prevTime = time;
}, 1 / CONFIG.UPS);

function genOrthogonalVector(center, position, min, max) {
    const len = rand(min, max);
    if (position.x === center.x) return new Vector(len, 0);
    const k = (position.y - center.y)/(position.x - center.x);
    if (k === 0) return new Vector(0, len);
    return new Vector(1, -1 / k).normalize().mul(len);
}

function init() {
    const sun = new StaticStar({
        mass: 10000,
        density: 10,
        position: Vector.zero,
        color: '#FFFFFF',
    });
    spaceManager.add(sun);

    const rMax = (cvsSpace.width > cvsSpace.height ? cvsSpace.width : cvsSpace.height) / 2;

    for (let i = 0; i < 500; i++) {
        let pl = rand(rMax , rMax / 2);
        let pa = rand(2 * Math.PI);
        const position = new Vector(pl * Math.cos(pa), pl * Math.sin(pa));
        const velocity = genOrthogonalVector(sun.position, position, -10, 10);
        const star = new Star({
            mass: rand(10,3),
            position,
            velocity,
            color: randColor(),
        });
        spaceManager.born(star);
    }
}

init();

function refreshCanvas(timestamp) {
    spaceGraphic.drawSpace(spaceManager);
    window.requestAnimationFrame(refreshCanvas);
}


let graphicPid = window.requestAnimationFrame(refreshCanvas);