'use strict';

var FIXED_HEADER_LENGTH = 12;

exports.parseRtpPacket = function parseRtpPacket(buf) {
	if (!Buffer.isBuffer(buf)) {
		throw new Error('buffer required');
	}

	if (buf.length < FIXED_HEADER_LENGTH) {
		throw new Error('can not parse buffer smaller than fixed header');
	}

	var firstByte = buf.readUInt8(0),
		secondByte = buf.readUInt8(1),
		csrcLength = 0;

	var parsed = {
		version: firstByte >> 6,
		padding: (firstByte >> 5) & 1,
		extension: (firstByte >> 4) & 1,
		csrcCount: firstByte & 0x0f,
		marker: secondByte >> 7,
		payloadType: secondByte & 0x7f,
		sequenceNumber: buf.readUInt16BE(2),
		timestamp: buf.readUInt32BE(4),
		ssrc: buf.readUInt32BE(8),
		csrc: []
	};

	// TODO add csrc support

	parsed.payload = buf.slice(FIXED_HEADER_LENGTH + csrcLength);

	return parsed;
};

exports.FIXED_HEADER_LENGTH = FIXED_HEADER_LENGTH;
