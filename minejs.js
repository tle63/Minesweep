
//This function give a random number
function randomNum(a) {
	let randomNum = Math.floor(Math.random() * a);
	return randomNum;
}

// this function create the map
function createTable(a) {
	
	let createTable = document.createElement('table');
	
	for (let i = 0; i < a; i++){
		
		let createTR = document.createElement('tr');
		createTable.appendChild(createTR);
		
		for (let z = 0; z < a; z++){
			
			let createTD = document.createElement('td');
			createTD.setAttribute('value', 0);
			createTR.appendChild(createTD);
		}
	}
	document.body.appendChild(createTable);
};

// This function create and add bombs in to the map
function createBombs(a,b) {
	for (let i = 0; i < b ; i++) {
		let b = document.getElementsByTagName('table')[0];
		let num1 = randomNum(a);
		let num2 = randomNum(a);
		let c = b.children[num1];
		let d = c.children[num2];
		
		if (d.className === 'bomb'){
			i--;
		} else {
			d.className = 'bomb';
			addValue(d);
			markNext(d);
			markTopBottom(c, num2);
		}
	}	
};

//This function increase the value up by 1 and show the value
function addValue(a) {
	let b = Number(a.getAttribute('value')) + 1;
	a.setAttribute('value', b )
	if (a.className !== 'bomb'){
		a.textContent = a.getAttribute('value');
	} else {
		a.textContent = '';
	}
}

//This function add value to the two cells left and right of the bomb
function markNext(a) {
	let aa = a.nextSibling;
	let bb = a.previousSibling;
	checkNull(aa);
	checkNull(bb);
}

//This function add value to the cells above and below the bomb
function markTopBottom(a, b) {
	let aa = a.nextSibling;
	let bb = a.previousSibling;
	checkNullRow(aa,b);
	checkNullRow(bb,b);
}

//This funcion check for Null row then add value if they are exist
function checkNullRow(a,b) {
	if (a !== null){
		let bb = a.children[b];
		addValue(bb)
		markNext(bb);
	}
}

//This funcion check if the cell exist , if it is then add value
function checkNull(a) {
	if( a !== null){
		addValue(a);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let size = 6;
let numBomb = 10;
let winCount = Math.pow(size,2) - numBomb;
let clickCount = 0;

createTable(size);
createBombs(size, numBomb);

// These codes set all the cells in to unclick 
let b = document.getElementsByTagName('td');
for (let i = 0; i < b.length; i++){
	let a = document.getElementsByTagName('td')[i];
	a.classList.add('unclick');
	
	//These codes add click event into the cells and increase the count and check for win and lose conditions.
	a.addEventListener('click',function (clickCount){
		
		a.classList.remove('unclick');
		if (a.className === 'bomb'){

			createEndP('You Lose !');
			
			setTimeout(function () {
				location.reload();
			},5000);

		} else {
			clickCount++;

			if (clickCount === winCount){

				createEndP('You Win !!!');

				setTimeout(function () {
					location.reload();
				},5000);
			}
		}
	}); 
}

//Show the result in p tag
function createEndP(a){
	let createP = document.createElement('p');
	createP.setAttribute('class','endP');
	createP.textContent = a;
	document.body.appendChild(createP);
}