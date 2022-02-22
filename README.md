html-email-obfuscator for Node.js
============================

This module combines some Email obfuscation technics.

 * The @ char is removed and only its index is passed on. It will be reinserted using the expression String.fromCharCode(4*2*2*4).
 * The address itself will be transmitted as a ROT13 transformed string which will be retransformed by Javascript.


Installation
------------

```
npm install --save @fischerpascal/html-email-obfuscator
```


Usage
-----

The Email address "mail@example.com" will result in the following string:

```js
var emailObfuscator = require('@fischerpascal/html-email-obfuscator');

// Obfuscate and encode as HTML <script>
var htmlScript = emailObfuscator.asHtmlScript('mail@example.com');
// htmlScript = See below

// Obfuscate and return as string
var obfuscated = emailObfuscator.obfuscate('mail@example.com');
// obfuscated = 'znvyrknzcyr.pbz/4'
var original = emailObfuscator.unobfuscate(obfuscated);
// original = 'mail@example.com'
```

asHtmlScript output which can be included instead of the email address:

```html
<script type="text/javascript">
var action=":otliam".split("").reverse().join("");
var href="znvyrknzcyr.pbz".replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
href=href.substr(0, 4) + String.fromCharCode(4*2*2*4) + href.substr(4);
var a = "<a href=\""+action+href+"\">"+href+"</a>";
document.write(a);
</script>
```
