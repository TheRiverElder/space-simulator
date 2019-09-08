

class Record {
    constructor(maxLength, step = 1) {
        this.maxLength = maxLength;
        this.step = step;
        this.data = [];

        this.stepCounter = maxLength;
    }

    push(elem) {
        if (this.stepCounter < this.step) {
            this.stepCounter++;
            return;
        }
        this.stepCounter = 0;
        this.data.push(elem);
        if (this.data.length > this.maxLength) {
            this.data.splice(0, 1);
        }
    }

}