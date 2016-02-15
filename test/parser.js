'use strict';

var expect = require('expect.js'),
	parse = require('../index');


describe('parser test', function() {
	it('should throw error on non-buffer', function() {
		expect(function() {
			parse('i an not buffer');
		}).to.throwException(/buffer required/);
	});

	it('should throw error on buffer smaller than fixed header', function() {
		expect(function() {
			parse(new Buffer('deadbeef', 'hex'));
		}).to.throwException(/can not parse buffer smaller than fixed header/);
	});
});