var path='test.json'

const fs = require('fs')
fs.accessSync(path, fs.constants.R_OK);
data=fs.readFileSync(path,'utf8');

var json = JSON.parse(data);

for(var i=0;i<json.ops.length;i++) {
    var out=json.ops[i].args[0];
    var str=out.toString();
    for(var j=1; j<json.ops[i].args.length;j++) {   
        switch(json.ops[i].type) {
            case "add":
                out+=json.ops[i].args[j];
                str+=' + '+json.ops[i].args[j].toString();
                break;
            case "sub":
                out-=json.ops[i].args[j];
                str+=' - '+json.ops[i].args[j].toString();
                break;
            case "mul":
                out*=json.ops[i].args[j];
                str+=' * '+json.ops[i].args[j].toString();
                break;
            case "div":
                out/=json.ops[i].args[j];
                str+=' / '+json.ops[i].args[j].toString();
                break;
        }
    }
    str+=' = '+out.toString();
    console.log(str);
}