function getRandIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
  

function getRandItemFromArray(items) {
    const item = items[Math.floor(Math.random()*items.length)];

    return item;
}


function getRandKeyFromObj(obj) {
    const keys = Object.keys(obj);

    return keys[Math.floor(Math.random()*keys.length)];
}

export {
    getRandIntRange,
    getRandItemFromArray,
    getRandKeyFromObj,
};
