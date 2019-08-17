const request = require('request');
const app = require('../app');
const baseUrl = 'http://localhost:3000/';

describe('Hello World', () => {
  describe('GET /', () => {
    it('return 200 status code', () => {
      request.get(baseUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
