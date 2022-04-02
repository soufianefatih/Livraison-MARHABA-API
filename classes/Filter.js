class Filters {
    static setModel(model){
        this.model = model
        return this;
    }

    static filters(filters) {
        this.data = this.model.find(filters)
        return this;
    }

    static get(){
        return this.data;
    }
}

module.exports = Filters