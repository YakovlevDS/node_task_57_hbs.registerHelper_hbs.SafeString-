// Хелперы позволяют оптимизировать создание кода представлений.
// мы можем один раз определить функцию хелпера, а затем многократно применять ее в самых различных местах для генерации кода.
const express = require("express");
const hbs = require("hbs");
  
const app = express();
  
hbs.registerHelper("getTime", function(){
      
    const myDate = new Date();
    const hour = myDate.getHours();
    let minute = myDate.getMinutes();
    let second = myDate.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return `Текущее время: ${hour}:${minute}:${second}`;
});
  
hbs.registerHelper("createStringList", function(array){
      
    let result="";
    for(let i=0; i<array.length; i++){
        result +=`<li>${array[i]}</li>`;
    }
    // Здесь добавлено определение хелпера createStringList(),
    //  который в качестве параметра принимает некоторый массив строк и из них создает элемент
    //   "<ul>". Однако чтобы возвращаемое значение расценивалось именно как html,
    //    его надо обернуть в функцию hbs.SafeString().
    return new hbs.SafeString(`<ul>${result}</ul>`);
});
  
  
app.set("view engine", "hbs");
  
app.get("/", function(_, response){
      
    response.render("home.hbs", { 
        fruit: [ "apple", "lemon", "banana", "grape"]
    });
});
app.listen(3000);