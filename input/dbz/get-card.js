const fs = require('fs')

function levelChip(level, index) {
    return `<circle style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke markers fill" id="levelout${index + 1}" cx="${333.67 - (24 * index)}" cy="42.348" r="10" /><text style="font-style:normal;font-weight:normal;font-size:15.8746px;line-height:1.25;font-family:sans-serif;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.264574" x="${328.87 - (24 * index)}" y="48.152" id="levelin${index + 1}"><tspan sodipodi:role="line" id="tspanlevel1" style="font-size:15.8746px;stroke-width:0.264574" x="${328.87 - (24 * index)}" y="48.152">${level}</tspan></text>`
}

function costChip(cost) {
    const parts = cost.split('@')
    const size = parts[1]
    const image = base64File(`input/${gameName}/images/cost.png`)

    return `<image width="49.398" height="22.048" preserveAspectRatio="none" xlink:href="${image}" id="image" x="299.62" y="298.56" />
    <text style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264571" text-anchor="end" dominant-baseline="middle" x="342.74" y="311" id="text">
    <tspan sodipodi:role="line" id="text" style="font-size:${size}px;stroke-width:0.264571" x="342.74" y="311">${parts[0]}</tspan></text>`
}

function descriptionLine(text, index) {
    return `<tspan sodipodi:role="line" style="font-size:14px;stroke-width:0.26458" x="42" y="${375.52 + (18.52 * index)}" id="tspanline${index + 1}">${text}</tspan>`
}

function generateSvg(gameName, title, frame, image, subtitle, cost, description, levels) {
    const template = fs.readFileSync(`input/${gameName}/templates/template_card.svg`, 'utf-8')
    let card = template
        .replace('{{TITLE}}', title)
        .replace('{{SUBTITLE}}', subtitle)
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    let descriptionTag = ''

    for (let i = 0; i < description.length; i++) {
        if (descriptionTag) {
            descriptionTag += '\n\t\t\t'
        }

        descriptionTag += descriptionLine(description[i], i)
    }

    card = card.replace('{{DESCRIPTION}}', descriptionTag)

    let levelsTag = ''

    for (let i = 0; i < levels.length; i++) {
        if (levelsTag) {
            levelsTag += '\n\t\t\t'
        }

        levelsTag += levelChip(levels[i], i)
    }

    card = card.replace('{{LEVELS}}', levelsTag)

    if (cost) {
        card = card.replace('{{COST}}', costChip(cost))
    } else {
        card = card.replace('{{COST}}', '')
    }

    return card
}

module.exports = {
    generateSvg
}