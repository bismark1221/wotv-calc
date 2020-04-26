ng2-slugify
=============

> Converts a string into a slug

Angular2 Slugify
----------------

Features
--------

- Removes all special characters from a string.
- Provides custom replacements for German, French, Spanish, Russian, Ukrainian, Polish, Czech, Latvian, Greek,
Esperanto, Arabian, Vietnamese, Burmese, Danish, Turkish, Finnish, Swedish, and Georgian special characters. Instead of
removing these characters, Slugify approximates them (e.g., `ae` replaces `ä`).

Installation
------------

You can install Slugify through npm:

```shell
$ npm install ng2-slugify
```

If you are using SystemJS you can map to ng2-slugify in your configuration.

```html
<!-- index.html -->
<script>
  SystemJS.config({
    map: {
      "ng2-slugify": "node_modules/ng2-slugify/ng2-slugify.js"
    }
  });
</script>
```

Usage Example
-------------

```ts
import {Component} from 'angular2/core';
import {Slug} from 'ng2-slugify';

class Test {
  title: string,
  slug:  string
}

@Component({
  selector: 'app',
  template: `
    <input type="text" 
           placeholder="Title"
           [(ngModel)]="test.title"
           ngControl="title"
           (keyup)="generateSlug()"
           required>
    <input type="text" 
           placeholder="Slug"
           [(ngModel)]="test.slug"
           ngControl="slug"
           readonly="true" 
           required>
  `
})

export class App {
  public test = new Test();
  private slug = new Slug(); // this will use 'default' keymap
  private slugGerman = new Slug('german'); // for list of all available keymaps see bellow

  public generateSlug(): void {
    this.test.slug = this.slug.slugify(this.test.title);
  }
}

```

Available keymaps
-----------------

'german', 'french', 'spanish', 'russian', 'ukrainian', 'polish', 'czech', 'latvian', 'greek',
'esperanto', 'arabian', 'vietnamese', 'burmese', 'danish', 'turkish', 'finnish', 'swedish', and 'georgian'

Acknowledgements
----------------

Sourcemaps have been cloned from (cocur/slugify)(https://github.com/cocur/slugify.git). Thanks to (Florian Eckerstorfer)[https://github.com/florianeckerstorfer] and all other contributors!

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jan Kuri

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

