export const mapTypeToColor = (type) => {
  const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  return colours[type];
};

export const mapStatToColor = (stat_name) => {
  const colorData = {
    'hp': {
      baseColor: '#3C6255',
      barColor: '#46C2CB'
    },
    'attack': {
      baseColor: '#850000',
      barColor: '#FF597B'
    },
    'defense': {
      baseColor: '#263159',
      barColor: '#DAE2B6'
    },
    'special-attack': {
      baseColor: '#540375',
      barColor: '#FF7000'
    },
    'special-defense': {
      baseColor: '#497174',
      barColor: '#8D9EFF'
    },
    'speed': {
      baseColor: '#78350f',
      barColor: '#EB6440'
    }
  }
  return colorData[stat_name] || { baseColor: '#efefef', barColor: 'skyblue' };
}