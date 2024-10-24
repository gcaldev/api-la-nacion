
// ACLARACION PARA CORRECCION: Esta abstraccion nos permite que en caso de que se necesite cambiar el criterio basta con cambiar la implementacion, al resto de la aplicacion no le importa como se determina la sucursal mas cercana
const getNearestBranchDistance = (branches) => {
    // Asumo que la sucursal que tiene la "location" con menor valor es la más cercana
    return Math.min(...branches.map(branch => branch?.location));
}

module.exports = getNearestBranchDistance;
