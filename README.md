# hbsmon

Monitor .hbs (Handlebar) file for changes and execute specified .js file

## Quick demo

This example shows how you to monitor changes to a `.hbs` template file and run a script when template file changes.

1. Create a `template.hbs` file: this is the file template file you will monitor for changes

```hbs
<ul>
    {{#each items as |item|}}
    <li>
        <a href="{{{item.url}}}" title="">{{{item.text}}}</a>
    </li>
    {{/each}}
</ul>
```

2. Create a `create.js` file: this is the script you will invoke when `template.hbs` file changes.

```js
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

```

3. Install `hbsmon` globally, if not already installed.

```bash
npm i -g hbsmon
```

To check `hbsmon` is already installed, type `hbsmon -V` at the command prompt.

4. Run `hbsmon` in a terminal

```bash
hbsmon template create
```

5. In your IDE, open `template.hbs` and `result.html`

As you type changes to your template, the `result.html` also changes. When `hbsmon` detects a change in the `.hbs` file, it invokes the `change.js` script, which uses the `.hbs` file to create the `result.html` file.