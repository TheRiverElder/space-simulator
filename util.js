
function rand(max, min = 0) {
    return Math.random() * (max - min) + min;
}


function randInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function fillStrHead(original, totalLength, fillChar) {
    let str = original;
    while (str.length < totalLength) {
        str = str + fillChar;
    }
    return str;
}

function randColor() {
    return '#' + fillStrHead(randInt(0xFFFFFF).toString(16), 6, '0');
}