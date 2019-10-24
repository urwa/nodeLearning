'use strict';

const Lab = require('lab');
const { expect } = require('code');
const Pinger = require('../pinger');

const lab = exports.lab = Lab.script();

lab.experiment('Pinger tests', () => {

    lab.test('should say pong', () => {

        // Arrange

        // Act
        const result = Pinger.sayPong();

        // Assert
        expect(result).to.equal('Pong');
    });
});
