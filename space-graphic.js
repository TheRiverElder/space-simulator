
// 专门绘制Space的绘图库
class SpaceGraphic {

    constructor(canvas) {
        this.canvas = canvas;
        this.offset = new Vector(canvas.width / 2, canvas.height / 2);
    }

    drawStarArrow(star) {
        let g = this.canvas.getContext('2d');
        let {position: {x, y}, radius, velocity} = star;
        x += this.offset.x;
        y += this.offset.y;

        let facing = velocity.angle();
        //console.log("facing", facing);

        g.fillStyle = 'black';
        g.beginPath();
        if (facing === null) {
            g.arc(x, y, radius, 0, 2 * Math.PI);
        } else {
            let len = 2 * radius;
            let da = Math.PI / 3;
            let agl1 = facing + da;
            let agl2 = facing - da;

            let p0x = x + len * Math.cos(facing);
            let p0y = y + len * Math.sin(facing);

            g.moveTo(p0x, p0y);
            g.arc(x, y, radius, agl1, agl2);
        }
        g.closePath();
        g.fill();
        //console.log('draw');

        g.fillStyle = 'white';
        g.beginPath();
        g.arc(x, y, 0.6 * radius, 0, 2 * Math.PI);
        g.fill();
    }

    drawStar(star) {
        let g = this.canvas.getContext('2d');
        let {position: {x, y}, radius, color} = star;
        x += this.offset.x;
        y += this.offset.y;

        g.fillStyle = color;
        g.beginPath();
        g.arc(x, y, radius, 0, 2 * Math.PI);
        g.fill();

        let name = '#' + star.id;
        let nameAnchorX = x;
        let nameAnchorY = y - radius - 5;
        let fontHeight = 20;
        g.font = 'fontHeight' + 'px serif';
        g.textAlign = 'center';
        g.textBaseline = 'bottom';

        let tm = g.measureText(name);
        g.fillStyle = '#00000080';
        g.fillRect(
            nameAnchorX - tm.width / 2 - 3,
            nameAnchorY - fontHeight + 2,
            tm.width + 6,
            fontHeight + 2
        );
        g.fillStyle = '#FFFFFF';
        g.fillText(name, nameAnchorX, nameAnchorY);
    }

    drawStarTail(star) {
        let g = this.canvas.getContext('2d');
        let tail = star.tail;
        if (tail.data.length === 0) {
            return;
        }
        g.strokeStyle = star.color;
        g.strokeWidth = 2;
        g.beginPath();
        let {x, y} = tail.data[0];
        g.moveTo(this.offset.x + x, this.offset.y + y);
        for (let i = 1; i < tail.data.length; i++) {
            let {x, y} = tail.data[i];
            g.lineTo(this.offset.x + x, this.offset.y + y);
        }
        g.lineTo(this.offset.x + star.position.x, this.offset.y + star.position.y);
        g.stroke();
    }

    drawSpace(spaceManager) {
        let g = this.canvas.getContext('2d');
        g.fillStyle = '#222233';
        g.fillRect(0, 0, this.canvas.width, this.canvas.height);
        spaceManager.stars.forEach(star => this.drawStarTail(star));
        spaceManager.staticStars.forEach(staticStar => this.drawStar(staticStar));
        spaceManager.stars.forEach(star => this.drawStar(star));
    }

}