

const debuffFormula = {
  "stun-chance-atk": { str: 0.2, max: 0.6 },
  "stun-chance-res": { vit: 0.2, agi: 0.2, max: 1 },
  "fear-chance-atk": { dex: 0.3, max: 0.6 },
  "fear-chance-res": { int: 0.2, luk: 0.2, max: 1 },
  "sleep-chance-atk": { dex: 0.2, max: 0.6 },
  "sleep-chance-res": { int: 0.2, luk: 0.2, max: 1 },
  "freeze-chance-atk": { int: 0.2, max: 0.6 },
  "freeze-chance-res": { int: 0.2, dex: 0.2, max: 1 },
  "poison-chance-atk": { luk: 0.3, max: 0.8 },
  "poison-chance-res": { vit: 0.2, int: 0.2, max: 1 },
  "petrify-chance-atk": { int: 0.2, max: 0.6 },
  "petrify-chance-res": { int: 0.2, dex: 0.2, max: 1 },
  "silence-chance-atk": { dex: 0.2, max: 1 },
  "silence-chance-res": { vit: 0.2, str: 0.2, max: 1 },
  "snare-chance-atk": { agi: 0.2, max: 0.6 },
  "snare-chance-res": { vit: 0.2, str: 0.2, max: 1 },
  "curse-chance-atk": { str: 0.3, max: 0.6 },
  "curse-chance-res": { int: 0.3, dex: 0.3, max: 1 },
  "blind-chance-atk": { str: 0.3, max: 1 },
  "blind-chance-res": { int: 0.2, dex: 0.2, max: 1 },
  "burn-chance-atk": { int: 0.3, max: 0.8 },
  "burn-chance-res": { vit: 0.2, agi: 0.2, max: 1 },
  "bleed-chance-atk": { int: 0.3, max: 0.8 },
  "bleed-chance-res": { vit: 0.2, int: 0.2, max: 1 },
  

  "stun-duration-atk": { str: 0.3, max: 0.8 },
  "stun-duration-res": { vit: 0.4, max: 1 },
  "fear-duration-atk": { dex: 0.3, max: 0.8 },
  "fear-duration-res": { int: 0.4, max: 1 },
  "sleep-duration-atk": { dex: 0.3, max: 0.8 },
  "sleep-duration-res": { int: 0.4, max: 1 },
  "freeze-duration-atk": { int: 0.3, max: 0.8 },
  "freeze-duration-res": { int: 0.4, max: 1 },
  "poison-duration-atk": { luk: 0.2, max: 0.8 },
  "poison-duration-res": { vit: 0.4, max: 1 },
  "petrify-duration-atk": { int: 0.3, max: 0.8 },
  "petrify-duration-res": { int: 0.4, max: 1 },
  "silence-duration-atk": { dex: 0.3, max: 0.8 },
  "silence-duration-res": { vit: 0.4, max: 1 },
  "snare-duration-atk": { agi: 0.3, max: 0.8 },
  "snare-duration-res": { vit: 0.4, max: 1 },
  "curse-duration-atk": { str: 0.3, max: 0.8 },
  "curse-duration-res": { int: 0.4, max: 1 },
  "blind-duration-atk": { str: 0.3, max: 0.8 },
  "blind-duration-res": { int: 0.4, max: 1 },
  "burn-duration-atk": { int: 0.3, max: 0.8 },
  "burn-duration-res": { vit: 0.4, max: 1 },
  "bleed-duration-atk": { int: 0.3, max: 0.8 },
  "bleed-duration-res": { vit: 0.4, max: 1 }
};

function newFunction(table) {
  console.log("testing x");

}

// @params trTable[i], parsedStats[i2], notice the 2
function calcResist(trTable, parsedStats) {
  let tdTable = getChildWithClass(trTable, parsedStats[0]);
  let playerStats = getPlayerStats();
  let resist = (playerStats[parsedStats[0]] * parsedStats[1]) / 100;
  tdTable.textContent = resist.toFixed(2);
}

function updateSum(trTable) {
  let sumBlock = getChildWithClass(trTable, "sum");
  sumBlock.textContent = 0;
  let resistSum = calcSum(trTable);
  let maxResist = debuffFormula[trTable.id].max;
  if (resistSum > maxResist) {
    sumBlock.textContent = maxResist + "(max)";
    sumBlock.style.color = "green";
  } else {
    sumBlock.textContent = resistSum;
    sumBlock.style.color = "black";
  }
}

function myFunction() {
  // resist-table ==> trTable ==> tdRows
  const resTable = document.getElementById("resist-table").childNodes;
  const trTable = filterElement(resTable, "TR");
  // will loop through the trTable
  for (let i = 0; i < trTable.length; i++) {
    console.log(trTable[i]);
    // parse the stats needed from the dictionary, using table id as input
    // {stats:float,..., max:float}
    // {agi:0.2, str:0.2, max:1}
    let parsedStats = Object.entries(debuffFormula[trTable[i].id]);

    // add loop to iterate the tdRows
    // parsedStats have max variable included, so length-1
    for (let i2 = 0; i2 < parsedStats.length - 1; i2++) {
      calcResist(trTable[i], parsedStats[i2]);
    }
    updateSum(trTable[i]);
  }
}

// every table have className=stats
// this used to get class of respective class
function getChildWithClass(parent, childClass) {
  var notes = null;
  childClass = childClass.toLowerCase();
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
function filterElement(element, type) {
  let result = [];
  for (let i = 0; i < element.length; i++) {
    if (element[i].nodeName === type) {
      result.push(element[i]);
    }
  }
  return result;
}

//retrieve updated stats
function getPlayerStats() {
  return {
    str: document.getElementById("textstr-a").value,
    agi: document.getElementById("textagi-a").value,
    vit: document.getElementById("textvit-a").value,
    int: document.getElementById("textint-a").value,
    dex: document.getElementById("textdex-a").value,
    luk: document.getElementById("textluk-a").value
  };
}

function getEnemyStats() {
  return {
    str: document.getElementById("textstr-b").value,
    agi: document.getElementById("textagi-b").value,
    vit: document.getElementById("textvit-b").value,
    int: document.getElementById("textint-b").value,
    dex: document.getElementById("textdex-b").value,
    luk: document.getElementById("textluk-b").value
  };
}

function printObj(obj) {
  for (const [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`);
  }
}

// to filter input, only accept number
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

// will calculate the sum of result
//  @param element = row table nodes
function calcSum(element) {
  const child = element.childNodes;
  let sum = 0;
  for (let index = 0; index < child.length; index++) {
    let value = parseFloat(child[index].textContent);
    if (!isNaN(value)) {
      sum = Math.round(value * 100 + sum * 100) / 100;
    }
    //console.log(`Sum is ${sum} and value is ${value} is value NaN${isNaN(value)}`);
  }
  return sum;
}

// untested
// function to take all stats of the table?
function getAttackerStats(element, stat) {
  const child = element.childNodes;
  let arr = [];
  for (let index = 0; index < child.length; index++) {
    let value = parseFloat(child[index].textContent);
    if (!isNaN(value)) {
      arr.push(value);
    }
  }
}
