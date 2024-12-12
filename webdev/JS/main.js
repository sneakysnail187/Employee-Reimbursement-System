console.log("check");


//Datatypes JS

/*



*/
var myoldvar = 56; //var pre ES6 dont do this


let mynewvar = "bear"; //good way
const myconstvar = true;

//undefined
let x; //declared but unassigned

//objects, usually collection of keys and values

let person ={
    name:"Marcel",
    age: 23,
    address: "101 Random Rd"
};

//Arrays can be dynamically resized

let fruits = ["apple", "blueberry", "bannana"];

//Type coercion

let sum = "5" + 1; // "51"
let sub = "5" - 1; // 4   , string gets converted

// "==" and "==="

//"===" - strict equality, if your going to compare "5" and 5 this returns false

// functions

function greet(name){
    //console.log("hello " + name);
    console.log('hello ${name}');
}


const myModGreet = (name) =>{
    console.log("hello "+ name);
}

greet(person.name);