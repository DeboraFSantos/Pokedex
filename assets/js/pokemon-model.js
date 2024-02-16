
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

class PokemonDetails {
    constructor(name, order, height, weight, stats = [], types = [], photo) {
        this.name = name;
        this.order = order;
        this.photo = photo;
        this.stats = stats;
        this.height = height;
        this.weight = weight;
        this.types = types;
    }
}