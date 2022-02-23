const expect = require('chai').expect;
const emailObfuscator = require('../index');

describe('obfuscate', function() {
	let obfuscated = emailObfuscator.obfuscate('mail@example.com');

	it('should not contain a @', function () {
		expect(obfuscated).not.to.match(/@/);
	});
	
	it('should contain a /', function () {
		expect(obfuscated).to.match(/\//);
	});
});

describe('asHtmlScript', function() {
	let obfuscated = emailObfuscator.asHtmlScript('mail@example.com');

	it('should return script tags', function () {
		expect(obfuscated).to.match(/<script>/);
		expect(obfuscated).to.match(/<\/script>/);
	});
});

describe('unobfuscate', function() {
	it('should return original email', function () {
		let email = 'mail@example.com';
		let obfuscated = emailObfuscator.obfuscate(email);
		let original = emailObfuscator.unobfuscate(obfuscated);
		expect(original).to.equal(email);
	});
});

describe('obfuscateEMailsInHtml', function() {
	it('obfuscateEMailInText', function () {
		let html = "<p>This is my Mail test@test.de in a simple Text</p>";
		let obfuscatedHtml = emailObfuscator.obfuscateEMailsInHtml(html);
		expect(obfuscatedHtml).not.to.match(/test@test.de/);
		expect(obfuscatedHtml).to.match(/<script>/);
		expect(obfuscatedHtml).to.match(/<\/script>/);
	});
	it('obfuscateEMailInLinkTag', function () {
		let html = "<p>This is my Mail <a href='mailto:test@test.de'>test@test.de</a> in a simple Text</p>";
		let obfuscatedHtml = emailObfuscator.obfuscateEMailsInHtml(html);
		expect(obfuscatedHtml).not.to.match(/test@test.de/);
		expect(obfuscatedHtml).not.to.match(/mailto/);
		expect(obfuscatedHtml).to.match(/<script>/);
		expect(obfuscatedHtml).to.match(/<\/script>/);
	});
});
