var expect = chai.expect;
 
function suma(x,y) {
    return x+y;
}
 
describe('Funkcja suma()', function() {
 it('Zwraca 4 dla 2+2', function() {
   expect(suma(2,2)).to.equal(4);
 });
 it('Zwraca 0 dla -2+2', function() {
   expect(suma(-2,2)).to.equal(0);
 });
});