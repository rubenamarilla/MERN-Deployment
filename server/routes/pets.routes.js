const PetController = require('../controllers/pets.controller');

module.exports = function(app){
    app.post('/api/pet', PetController.createPet);
    app.get('/api/pet', PetController.getAllPets);
    app.get('/api/pet/:id', PetController.getPet);
    app.put('/api/pet/:id', PetController.updatePet);
    // app.put('/api/pet/edit/:id', PetController.editById);
    app.delete('/api/pet/:id', PetController.deletePet);
    // app.get('/api/pet/back', AuthorController.buscarAlreves);
}