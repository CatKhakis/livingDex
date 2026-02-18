import '../assets/genvicons.json';

const response_sheet = await fetch(require('../assets/genvicons.json'));
let spritesheet = await response_sheet.json();

const size = spritesheet.meta.size;

const stylesheet = document.styleSheets[0];

const scale = parseInt(stylesheet.cssRules[0].cssText.substring(17, 18));

stylesheet.insertRule(`icon{background-size: ${size.w * scale}px ${size.h * scale}px;}`, stylesheet.cssRules.length);

for (const frame of spritesheet.frames) {

    

    const constructor = `#dex${frame.filename.split(".")[0]}`

    const bounds = frame['frame'];
    
    stylesheet.insertRule(`
        ${constructor} {
            background-position: -${bounds.x * scale}px -${bounds.y * scale}px;
            height: ${bounds.h * scale}px;
            width: ${bounds.w * scale}px;
        }`, stylesheet.cssRules.length);
    
    if (frame.filename.split(".")[0] === '204') {
        console.log(`
        ${constructor} {
            background-position: -${bounds.x * scale}px -${bounds.y * scale}px;
            height: ${bounds.h * scale}px;
            width: ${bounds.w * scale}px;
        }`)
    }
}

//icon spritesheet is missing these icons!!! along with the corresponding JSON.

//missing icon IDs

//205 - 228
//230 - 231
//410 - 416
//457 - 491
//623 - 638
//641