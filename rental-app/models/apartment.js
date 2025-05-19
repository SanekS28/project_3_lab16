class Apartment {
    constructor(id, owner, description, parameters) {
        this.id = id;
        this.owner = owner;
        this.description = description;
        this.parameters = parameters; // {rooms, price, location, size...}
    }
}
module.exports = Apartment;
