# hbsmon

Monitor .hbs (Handlebar) file for changes and execute specified .js 

## Installation

Install the package globally so you can use the `hbsmon` CLI command:

```bash
npm i -g hbsmon
```

## Usage

### Get help

```bash
hbsmon -h
```

### Get version

```bash
hbsmon -V
```

### Monitor `.hbs` file, run script file with template basename

```bash
hbsmon template
```

* Monitor changes of `template.hbs` file and run `template.js` script
* Template default extension: `.hbs`
* Default JavaScript default extension `.js`
* Default Javascript filename: template file basename
  
### Monitor `.hbs` file, run specified script

```
hbsmon template create-page
```

* Monitor changes of `template.hbs` file
* Template default extension: `.hbs`
* Default JavaScript default extension `.js`
* Run javacript file: `create-page.js`


## Quick demo

This example shows you how to monitor changes to a `.hbs` template file and run a script when the template file changes.

* You will create an `.hbs` template file to monitor and a Javascript `.js` file to execute when the template file changes. In this example, the javascript creates `result.html` -- it uses the template.
* Next, you will invoke `hbsmon` CLI command with template and javascript filenames as arguments.
* Next, you open the template and `result.html` in your IDE.
* Edit the template file, and notice the `result.html` file -- it has the update template content.

**Follow this steps:**

1. Create a `template.hbs` file: this is the file template file you will monitor for changes

```hbs
<body>
    <ul>
        {{#each items as |item|}}
        <li>
            <a href="{{{item.url}}}" title="">{{{item.text}}}</a>
        </li>
        {{/each}}
    </ul>
</body>
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
