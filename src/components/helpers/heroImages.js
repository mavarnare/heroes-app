let loadImage = () => ({ default: '' });

try {
    loadImage = require.context('../../assets/heroes', true);
} catch(error){}

export const heroImages = heroId => loadImage(`./${ heroId }.jpg`).default;

export default { heroImages }