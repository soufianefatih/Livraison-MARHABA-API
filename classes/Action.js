class Actions {
    static setModel(model){
        this.model = model
        return this;
    }

    static filters(filters) {
        this.data = this.model.findAll(filters)
        return this;
    }

    static get(){
        return this.data;
    }
}

module.exports = Actions