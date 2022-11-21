function add(x, y) {
    console.log(x, y);
    return x + y;
}
function position(x, y) {
    return { x: x + 1, y: y + 1 };
}

async function run() {
    const p = new Promise((resolve, reject) => {
        resolve(true);
    });
    const action = { test: p };
    console.log(111);
    await p.then(value => value);
    await action.test.then(value => value);
}
