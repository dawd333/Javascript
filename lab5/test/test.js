//Źródło: https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var should = require("should");
 
// This agent refers to PORT where program is runninng.
 
var server = supertest.agent("http://localhost:3000");
 
// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, done);
      });
      it('add with parameters', function(done) {
        server
        .get('/add/20/30')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          if(err){
            return done(err);   
          }
          res.text.should.match(/50/);
          done();
        });
      });
      it('add from file', function(done) {
        server
        .get('/')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          if(err){
            return done(err);   
          }
          res.text.should.match(/3/);
          done();
        });
      });
});