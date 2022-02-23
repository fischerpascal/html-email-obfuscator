const htmlencode = require('htmlencode');
const rot = require('rot');

module.exports.obfuscate = function (email) {
	email = htmlencode.htmlEncode(email);

	let atIndex = email.indexOf('@');
	if (atIndex === -1) return email;

	email = rot(email.replace('@', ''));
	return email + '/' + atIndex;
};

function extractIndexAndRotEmail(obfuscated) {
	let slashIndex = obfuscated.lastIndexOf('/');
	if (slashIndex === -1) return null;

	let rotEmail = obfuscated.substr(0, slashIndex),
		index = +obfuscated.substr(slashIndex+1);
	return [rotEmail, index];
}

module.exports.asHtmlScript = function (email) {
	let obfuscated = module.exports.obfuscate(email),
		res = extractIndexAndRotEmail(obfuscated),
		rotMail = res[0],
		atIndex = res[1];

	return '<script>'
		+ 'var action=":otliam".split("").reverse().join("");'
		+ 'var href="'+rotMail+'".replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});'
		+ 'href=href.substr(0, '+atIndex+') + String.fromCharCode(4*2*2*4) + href.substr('+atIndex+');'
		+ 'var a = \'<a href="\'+action+href+\'">\'+href+\'</a>\';'
		+ 'document.write(a);'
		+ '</script>';
};

module.exports.unobfuscate = function (obfuscated) {
	let res = extractIndexAndRotEmail(obfuscated);
	if (res === null) return null;

	let atIndex = res[1],
		email = rot(res[0]);
	return email.substr(0, atIndex) + '@' + email.substr(atIndex);
};

function replacer(match, p1){
  return module.exports.asHtmlScript(p1);
}

module.exports.obfuscateEMailsInHtml = function (html) {
  html = html.replace(/<a.*?>([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)<\/a>/g, '$1');
  html = html.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, replacer);
  return html;
};
