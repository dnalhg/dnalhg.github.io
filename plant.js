class Plant {
    constructor(name) {
        this.name = name;
        this.watered = false;
        this.daysWatered = 0;
        this.growthTime = 10;
    }

    isHarvestable() {
        if (this.daysWatered >= this.growthTime) {
            return true;
        }
        return false;
    }

    info() {
        return "Name: " + this.name + "\nWatered: " + this.watered + "\nReady to harvest: " + this.isHarvestable();
    }

    water() {
        if (this.watered) {
            return false;
        }
        this.watered = true;
        return true;
    }

    getPlantSprite() {
        var fileName = "";
        if (this.daysWatered >= this.growthTime) {
            fileName += "img/full_grown";
        } else if (this.daysWatered >= this.growthTime/2) {
            fileName += "img/stage2";
        } else if (this.daysWatered >= 1) {
            fileName += "img/stage1";
        } else {
            fileName += "img/new_plant";
        }

        if (this.watered) {
            fileName += "_watered.png";
        } else {
            fileName += ".png";
        }
        return fileName;
    }

    harvest() {
        if (!this.isHarvestable) {
            return 0;
        }
        return 1+Math.floor(Math.random()*3);
    }
}