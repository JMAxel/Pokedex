const	searchForm = document.getElementById('search-form');
const	searchInput = document.getElementById('search-input');
const	banner = document.getElementById('banner');
const	sprite = document.getElementById('sprite');
const	pokemonName = document.getElementById('pokemon-name');
const	pokemonID = document.getElementById('pokemon-id');
const	types = document.getElementById('types');
const	height = document.getElementById('height');
const	weight = document.getElementById('weight');
const	HP = document.getElementById('hp');
const	progressHP = document.getElementById('progressHP');
const	attack = document.getElementById('attack');
const	progressAttack = document.getElementById('progressAttack');
const	defense = document.getElementById('defense');
const	progressDefense = document.getElementById('progressDefense');
const	spAttack = document.getElementById('special-attack');
const	progressSpAttack = document.getElementById('progressSpAttack');
const	spDefense = document.getElementById('special-defense');
const	progressSpDefense = document.getElementById('progressSpDefense');
const	speed = document.getElementById('speed');
const	progressSpeed = document.getElementById('progressSpeed');
const	prev = document.getElementById('prev');
const	next = document.getElementById('next');

let		searchPokemon = 0;

const	setMedia = async (type) => 
{
	const	responseType = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
	const	pokeData = await responseType.json();

	let		totalPokemons = pokeData.pokemon.length;
	let		pokeUrl = pokeData.pokemon.map(pokemon => pokemon.pokemon.url);

	const	pokemonResponses = await Promise.all(pokeUrl.map(url => fetch(url)));
	const	pokemonDataList = await Promise.all(pokemonResponses.map(response => response.json()));

	let		sumHP = 0, sumATK = 0, sumDEF = 0, sumSPATK = 0, sumSPDEF = 0, sumSPD = 0;

	pokemonDataList.forEach(pokemonData => {
		sumHP += pokemonData.stats[0].base_stat;
		sumATK += pokemonData.stats[1].base_stat;
		sumDEF += pokemonData.stats[2].base_stat;
		sumSPATK += pokemonData.stats[3].base_stat;
		sumSPDEF += pokemonData.stats[4].base_stat;
		sumSPD += pokemonData.stats[5].base_stat;
	});

	let mediaHP = sumHP / totalPokemons;
	let mediaATK = sumATK / totalPokemons;
	let mediaDEF = sumDEF / totalPokemons;
	let mediaSPATK = sumHP / totalPokemons;
	let mediaSPDEF = sumHP / totalPokemons;
	let mediaSPD = sumHP / totalPokemons;

	return [mediaHP, mediaATK, mediaDEF, mediaSPATK, mediaSPDEF, mediaSPD];
}

const	setBase = async (data, type) =>
{
	let	mediaStats = [];
	mediaStats = await setMedia(type);

	//HP
	progressHP.innerHTML = `${data.stats[0].base_stat}`;
	const	porcentageHP = (parseInt(data.stats[0].base_stat) * 100) / (mediaStats[0] * 2)
	let		formatHP;
	if (porcentageHP > 100)
		formatHP = `100%`
	else
		formatHP = `${porcentageHP}%`;
	progressHP.style.width = formatHP;
	if (porcentageHP < 33)
		progressHP.style.backgroundColor = '#a41919';
	else if (porcentageHP > 33 && porcentageHP < 66)
		progressHP.style.backgroundColor = '#9a9f05';
	else
		progressHP.style.backgroundColor = '#4caf50';

	//ATK
	progressAttack.innerHTML = `${data.stats[1].base_stat}`;
	const	porcentageAttack = (parseInt(data.stats[1].base_stat) * 100) / (mediaStats[1] * 2);
	let		formatAttack;
	if (porcentageAttack > 100)
		formatAttack = `100%`
	else
		formatAttack = `${porcentageAttack}%`;
	progressAttack.style.width = formatAttack;
	if (porcentageAttack < 33)
		progressAttack.style.backgroundColor = '#a41919';
	else if (porcentageAttack > 33 && porcentageAttack < 66)
		progressAttack.style.backgroundColor = '#9a9f05';
	else
		progressAttack.style.backgroundColor = '#4caf50';

	//DEF
	progressDefense.innerHTML = `${data.stats[2].base_stat}`;
	const	porcentageDefense = (parseInt(data.stats[2].base_stat) * 100) / (mediaStats[2] * 2);
	let		formatDefense;
	if (porcentageDefense > 100)
		formatDefense = `100%`
	else
		formatDefense = `${porcentageDefense}%`;
	progressDefense.style.width = formatDefense;
	if (porcentageDefense < 33)
		progressDefense.style.backgroundColor = '#a41919';
	else if (porcentageDefense > 33 && porcentageDefense < 66)
		progressDefense.style.backgroundColor = '#9a9f05';
	else
		progressDefense.style.backgroundColor = '#4caf50';

	//SPATK
	progressSpAttack.innerHTML = `${data.stats[3].base_stat}`;
	const	porcentageSpAttack = (parseInt(data.stats[3].base_stat) * 100) / (mediaStats[3] * 2);
	let		formatSpAttack;
	if (porcentageSpAttack > 100)
		formatSpAttack = `100%`
	else
		formatSpAttack = `${porcentageSpAttack}%`;
	progressSpAttack.style.width = formatSpAttack;
	if (porcentageSpAttack < 33)
		progressSpAttack.style.backgroundColor = '#a41919';
	else if (porcentageSpAttack > 33 && porcentageSpAttack < 66)
		progressSpAttack.style.backgroundColor = '#9a9f05';
	else
		progressSpAttack.style.backgroundColor = '#4caf50';

	//SPDEF
	progressSpDefense.innerHTML = `${data.stats[4].base_stat}`;
	const	porcentageSpDefense = (parseInt(data.stats[4].base_stat) * 100) / (mediaStats[4] * 2);
	let		formatSpDefense;
	if (porcentageSpDefense > 100)
		formatSpDefense = `100%`
	else
		formatSpDefense = `${porcentageSpDefense}%`;
	progressSpDefense.style.width = formatSpDefense;
	if (porcentageSpDefense < 33)
		progressSpDefense.style.backgroundColor = '#a41919';
	else if (porcentageSpDefense > 33 && porcentageSpDefense < 66)
		progressSpDefense.style.backgroundColor = '#9a9f05';
	else
		progressSpDefense.style.backgroundColor = '#4caf50';

	//SPD
	progressSpeed.innerHTML = `${data.stats[5].base_stat}`;
	const	porcentageSpeed = (parseInt(data.stats[5].base_stat) * 100) / (mediaStats[5] * 2);
	let		formatSpeed;
	if (porcentageSpeed > 100)
		formatSpeed = `100%`
	else
		formatSpeed = `${porcentageSpeed}%`;
	progressSpeed.style.width = formatSpeed;
	if (porcentageSpeed < 33)
		progressSpeed.style.backgroundColor = '#a41919';
	else if (porcentageSpeed > 33 && porcentageSpeed < 66)
		progressSpeed.style.backgroundColor = '#9a9f05';
	else
		progressSpeed.style.backgroundColor = '#4caf50';
}

const	grabData = async (ID) =>
{
	let pokemonNameOrID;

	if (ID === 0)
		pokemonNameOrID = searchInput.value.toLowerCase();
	else
		pokemonNameOrID = ID;
	const	response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrID}/`);
	if (response.status === 200)
	{
		const	data = await response.json();
		return data;
	}
} 

const	getPokemon = async (ID) =>
{
	pokemonName.textContent = `Loading...`;

	const	data = await grabData(ID);
	if (data)
	{
		//Determine background color
		if (banner.classList.length > 1)
			banner.classList.remove(banner.classList[1]);
		const	firstType = data.types.map(type => type.type.name);
		banner.classList.add(firstType[0]);

		//clears input
		searchInput.value = '';

		//Places sprite
		sprite.innerHTML = `<img id="pokemon-sprite" src="${data.sprites.front_default}" alt="${data.name} front sprite"/>`;

		//Name and ID
		let		formatName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
		pokemonName.textContent = `${formatName}`;

		let		formatID = "0".repeat(5 - data.id.toString().length);
		pokemonID.textContent = `#${formatID}${data.id}`;

		//Setting Type
		const	dataTypes = data.types.map(obj => obj.type.name);
		const	typeOne = dataTypes[0].charAt(0).toUpperCase() + dataTypes[0].slice(1);
		if (!dataTypes[1])
			types.innerHTML = `<span class="type ${dataTypes[0]}">${typeOne}</span>`;
		else
		{
			const	typeTwo = dataTypes[1].charAt(0).toUpperCase() + dataTypes[1].slice(1);
			types.innerHTML = `<span class="type ${dataTypes[0]}">${typeOne}</span><span class="type ${dataTypes[1]}">${typeTwo}</span>`;
		}

		//Setting Height and Weight
		height.textContent = data.height;
		weight.textContent = data.weight;

		//Setting Base Stats
		setBase(data, dataTypes[0]);

		//Saving pokemon loaded number
		searchPokemon = data.id;
	}
	else
	{
		//resets everything in case Pokemon does not exists
		searchInput.value = '';
		if (banner.classList.length > 2)
		{
			banner.classList.remove(banner.classList[2]);
			banner.classList.remove(banner.classList[1]);
		}
		else if (banner.classList.length > 1)
			banner.classList.remove(banner.classList[1]);
		sprite.innerHTML = ``;
		pokemonName.textContent = `Not Found`;
		pokemonID.textContent = `#00000`;
		types.innerHTML = ``;
		height.textContent = `0`;
		weight.textContent = `0`;
		progressHP.innerHTML = `&emsp;`
		progressHP.style.width = `0%`;
		progressAttack.innerHTML = `&emsp;`
		progressAttack.style.width = `0%`;
		progressDefense.innerHTML = `&emsp;`
		progressDefense.style.width = `0%`;
		progressSpAttack.innerHTML = `&emsp;`
		progressSpAttack.style.width = `0%`;
		progressSpDefense.innerHTML = `&emsp;`
		progressSpDefense.style.width = `0%`;
		progressSpeed.innerHTML = `&emsp;`
		progressSpeed.style.width = `0%`;
		searchPokemon = 0;
	}
};

prev.addEventListener('click', () =>
{
	if (searchPokemon == 0 || searchPokemon == 1)
		searchPokemon = 10277;
	else if (searchPokemon == 10001)
		searchPokemon = 1025;
	else
		searchPokemon -= 1;
	getPokemon(searchPokemon);
});

next.addEventListener('click', () =>
{
	if (searchPokemon === 1025)
		searchPokemon = 10001;
	else if (searchPokemon === 10277)
		searchPokemon = 1;
	else
		searchPokemon += 1;
	getPokemon(searchPokemon);
});

searchForm.addEventListener('submit', e => 
{
	e.preventDefault();
	getPokemon(0);
});