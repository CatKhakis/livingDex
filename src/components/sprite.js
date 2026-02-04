import '../assets/spritesheet.json';

const scale = 2;

const response = await fetch(require('../assets/spritesheet.json'));
let spritesheet = await response.json();

const size = spritesheet.meta.size;
const slices = spritesheet.meta.slices;

const stylesheet = document.styleSheets[0];
stylesheet.insertRule(`sprite{background-size: ${size.w * scale}px ${size.h * scale}px;}`, stylesheet.cssRules.length);
stylesheet.insertRule(`:root{--scale: ${scale};}`, 0);

for (const slice of slices) {

    let selector;

    if (slice.name.split("_")[1] === "selected") {
        selector = slice.name.split("_")[0] + ':hover';
    } else {
        selector = slice.name;
    }
    
    const bounds = slice.keys[0].bounds;
    stylesheet.insertRule(`
        #${selector}{
            background-position: -${bounds.x * scale}px -${bounds.y * scale}px;
            height: ${bounds.h * scale}px;
            width: ${bounds.w * scale}px;
        }`, stylesheet.cssRules.length);

}

console.log(stylesheet);