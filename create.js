const Handlebars = require('handlebars')
const fs = require('fs')

function render(source, data = {}) {
    let template = Handlebars.compile(source);
    return template(data);
}

let items = "First Second".split(/\s+/).map((label, idx) => {
    return {
        text: `${label} ${idx+1}`,
        url: `#`,
    }
})
let source = fs.readFileSync(`template.hbs`, "utf-8")
let output = render(source, {items: items})
fs.writeFileSync('result.html', output, "utf-8");
console.log(source);
