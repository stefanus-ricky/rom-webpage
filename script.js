/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

const debuffFormula= {
  "stun-chance-atk":{str:0.2, max:0.6},
  "stun-chance-res":{vit:0.2, agi:0.2, max:1},
  "fear-chance-atk":{dex:0.3, max:0.6},
  "fear-chance-res":{int:0.2, luk:0.2, max:1},
  "sleep-chance-atk":{dex:0.2, max:0.6},
  "sleep-chance-res":{int:0.2, luk:0.2, max:1},
  "freeze-chance-atk":{int:0.2, max:0.6},
  "freeze-chance-res":{int:0.2, dex:0.2, max:1},
  "poison-chance-atk":{luk:0.3, max:0.8},
  "poison-chance-res":{vit:0.2, int:0.2, max:1},
  "petrify-chance-atk":{int:0.2, max:0.6},
  "petrify-chance-res":{int:0.2, dex:0.2, max:1},
  
  
  "stun-duration-atk": {str:0.3, max:0.8},
  "stun-duration-res": {vit:0.4, max:1},
  "fear-duration-atk": {dex:0.3, max:0.8},
  "fear-duration-res": {int:0.4, max:1},
  "sleep-duration-atk": {dex:0.3, max:0.8},
  "sleep-duration-res": {int:0.4, max:1},
  "freeze-duration-atk": {int:0.3, max:0.8},
  "freeze-duration-res": {int:0.4, max:1},
  "poison-duration-atk": {luk:0.2, max:0.8},
  "poison-duration-res": {vit:0.4, max:1},
  "petrify-duration-atk": {int:0.3, max:0.8},
  "petrify-duration-res": {int:0.4, max:1},
};




function newFunction(table){
  console.log("testing new function");
  
  // resist-table ==> trTable ==> tdRows
  const resTable = document.getElementById("resist-table").childNodes;
  const trTable = filterElement(resTable, 'TR');
  // console.log(`tr0 classname is ${trTable[0]}`);
  
  
  // separate into other function?
  // will loop through the trTable
  for (let i=0; i<trTable.length; i++){
     console.log(trTable[i]);
    //console.log(`i is ${i} trTable.length is ${trTable.length}`)
      // parse the stats needed from the dictionary, using table id as input
      // {stats:float,..., max:float}
    // {agi:0.2, str:0.2, max:1}
    let parsedStats = Object.entries(debuffFormula[trTable[i].id]);
      //console.log("checkpoint 1")
    
    // add loop to iterate the tdRows
    // parsedStats have max variable included, so length-1
    // PARSEDSTATS = i2
    for (let i2=0; i2<parsedStats.length-1; i2++){
      //console.log("checkpoint 2")
      // get player stats, playerStats.vit = 220
      let playerStats = getPlayerStats();
      // parsedStats[0][0]= vit, [0][1] = 0.2
      let calcResist = playerStats[parsedStats[i2][0]] * parsedStats[i2][1]/100;
      console.log(`the ${trTable[i].id} calcResist of ${parsedStats[i2][0]} is ${calcResist}`); // expect 0.44
      // get row with class=vit
      let tdTable = getChildWithClass(trTable[i], parsedStats[i2][0]) ;
      console.log(`tdTable is ${tdTable} the parsedStats is ${parsedStats[i2][0]}`);
      // update the table value
      tdTable.textContent = calcResist.toFixed(2);
    }
    // calculating the sum of tr table
    let sum = getChildWithClass(trTable[i], "sum");
    console.log(sum);
    console.log(`max is ${debuffFormula[trTable[i].id].max}`);
    sum.textContent = 0;
    let resistSum =  calcSum(trTable[i]);
    let maxResist = debuffFormula[trTable[i].id].max;
    if(resistSum > maxResist){
      sum.textContent = maxResist + "(max)";
      sum.style.color = 'green';
    } else{
    sum.textContent = resistSum ;
    sum.style.color = 'black';
    }
  
  }
 
}

function updateSum(trTable){
  let max= debuffFormula[trTable.id].max;
  sum.textContent = 0;

}




function myFunction() {
  console.log("testing new function");
  
  // resist-table ==> trTable ==> tdRows
  const resTable = document.getElementById("resist-table").childNodes;
  const trTable = filterElement(resTable, 'TR');
  // console.log(`tr0 classname is ${trTable[0]}`);
  
  // will loop through the trTable
  for (let i=0; i<trTable.length; i++){
     console.log(trTable[i]);
    //console.log(`i is ${i} trTable.length is ${trTable.length}`)
      // parse the stats needed from the dictionary, using table id as input
      // {stats:float,..., max:float}
    // {agi:0.2, str:0.2, max:1}
    let parsedStats = Object.entries(debuffFormula[trTable[i].id]);
      //console.log("checkpoint 1")
    
    // add loop to iterate the tdRows
    // parsedStats have max variable included, so length-1
    // PARSEDSTATS = i2
    for (let i2=0; i2<parsedStats.length-1; i2++){
      //console.log("checkpoint 2")
      // get player stats, playerStats.vit = 220
      let playerStats = getPlayerStats();
      // parsedStats[0][0]= vit, [0][1] = 0.2
      let calcResist = playerStats[parsedStats[i2][0]] * parsedStats[i2][1]/100;
      console.log(`the ${trTable[i].id} calcResist of ${parsedStats[i2][0]} is ${calcResist}`); // expect 0.44
      
      
      // get row with class=vit
      let tdTable = getChildWithClass(trTable[i], parsedStats[i2][0]) ;
      console.log(`tdTable is ${tdTable} the parsedStats is ${parsedStats[i2][0]}`);
      // update the table value
      tdTable.textContent = calcResist.toFixed(2);
    }
    // calculating the sum of tr table
    let sum = getChildWithClass(trTable[i], "sum");
    console.log(sum);
    console.log(`max is ${debuffFormula[trTable[i].id].max}`);
    sum.textContent = 0;
    let resistSum =  calcSum(trTable[i]);
    let maxResist = debuffFormula[trTable[i].id].max;
    if(resistSum > maxResist){
      sum.textContent = maxResist + "(max)";
      sum.style.color = 'green';
    } else{
    sum.textContent = resistSum ;
    sum.style.color = 'black';
    }
  
  }
 
  
}

// every table have className=stats
// this used to get class of respective class
function getChildWithClass(parent, childClass){
  var notes = null;
  childClass= childClass.toLowerCase();
  for (var i = 0; i < parent.childNodes.length; i++) {
      //console.log(` class ${parent.childNodes[i].className} stats ${childClass}`)
    if (parent.childNodes[i].className === childClass) {
      //console.log(`found child at ${i}`)
      notes = parent.childNodes[i];
      return notes;
    }
  }
  return notes;
}

// filter tr element from table
function filterElement(element, type){
  let result =[];
  for (let i = 0; i<element.length; i++){
    if (element[i].nodeName === type){
      result.push(element[i]);
    }
  }
  return result;
}
//retrieve updated stats 
function getPlayerStats(){
  return {
    'str' : document.getElementById("textstr-a").value,
    'agi' : document.getElementById("textagi-a").value,
    'vit' : document.getElementById("textvit-a").value,
    'int' : document.getElementById("textint-a").value,
    'dex' : document.getElementById("textdex-a").value,
    'luk' : document.getElementById("textluk-a").value
  }
}

function getEnemyStats(){
    return {
    'str' : document.getElementById("textstr-b").value,
    'agi' : document.getElementById("textagi-b").value,
    'vit' : document.getElementById("textvit-b").value,
    'int' : document.getElementById("textint-b").value,
    'dex' : document.getElementById("textdex-b").value,
    'luk' : document.getElementById("textluk-b").value
  }
}


function printObj(obj){
    for (const [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`);
  }
}



// to filter input, only accept number
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


// used to get individual stat nodes of the result table
function getStats(element, stats){
  const child = element.childNodes;
  
  if (stats === null || stats === undefined){
      return [child[3], child[5], child[7], child[9], child[11], child[13]];
  }
  stats= stats.toLowerCase();
  switch (stats) {
    case 'str':
    return child[3];
  case 'agi':
    return child[5];
  case 'vit':
    return child[7];
  case 'int':
    return child[9];
  case 'dex':
    return child[11];
  case 'luk':
    return child[13];
  }  
}

// will calculate the sum of result
//  @param element = row table nodes
function calcSum(element){
  const child = element.childNodes;
  let sum = 0;
  for (let index=0; index< child.length;index++){
    let value = parseFloat(child[index].textContent);
    if (!isNaN(value)){
      sum = Math.round(value*100 + sum*100)/100;    
    }
    //console.log(`Sum is ${sum} and value is ${value} is value NaN${isNaN(value)}`);
  }
  return sum;
}


// untested
// function to take all stats of the table?
function getAttackerStats(element, stat){
  const child = element.childNodes;
  let arr = [];
  for (let index=0; index< child.length;index++){
    let value = parseFloat(child[index].textContent);
    if (!isNaN(value)){
      arr.push(value);    
    } 
  }
}


