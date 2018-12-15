function boy(name,age){
    this.name = name;
    this.age = age;
    this.greet = function(){
        console.log("hello world..1533" + this.name);
    }  
}

module.exports = boy;