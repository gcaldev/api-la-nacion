const getNearestBranchDistance = require('../utils/nearest-branch-calculation');
const URL_CLUB_LA_NACION = 'https://club.lanacion.com.ar/';
const getHighestBenefits = require('../utils/highest-benefits-calculation');


const toDistance = (distance) => distance > 1000 ? (distance / 1000).toFixed(2) + ' km' : distance + ' m';

const toBenefitCardDTO = (account) => {
    if(!account) {
        return null;
    }
    const nearestBranch = getNearestBranchDistance(account.branches);

    return {
        id: account.id,
        name: account.name,
        image: account.images[0]?.url,
        url: URL_CLUB_LA_NACION + account.crmid,
        highestBenefits: getHighestBenefits(account.benefits),
        distance: toDistance(nearestBranch),
    };
};

const toDiscountCardDTO = (account) => {
    if (!account) {
        return null;
    }

    return {
        id: account.id,
        name: account.name,
        image: account.images[0]?.url || '',
        url: URL_CLUB_LA_NACION + account.crmid,
        // No se bien que se esperaba devolver cuando se refiere al Button de Promocode ya que la url se devuelve en el otro campo. Supongo que sino podria devolver otro campo con el valor que se necesite presentar: 
        //buttonPromocode: `https://club.lanacion.com.ar/${account.crmid}`
    };
};

module.exports = {
    toBenefitCardDTO,
    toDiscountCardDTO
};