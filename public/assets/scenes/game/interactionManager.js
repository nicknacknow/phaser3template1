class InteractionManager {
    constructor(scene, target) {
        this.scene = scene;
        this.target = target;
        this.interactableObjectData = [];
    }

    addObjectData(obj) {
        // each object will need a callback, display text etc
        this.interactableObjectData.push(obj);
    }

    isDataInRange(data) {
        let obj = data.object;
        const pythag = (b1,b2) => Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
        if (pythag(obj.body, this.target.sprite.body) < data.radius) {
            return true;
        } 
    }

    isInRange(obj) { // most likely will nver use this
        data = this.interactableObjectData.filter(data => data.object == obj)[0];
        if (!data) return false;
        return this.isDataInRange(data);
    }

    objectInRange() { // may need to include corners of target but2lazy
        var o;
        this.interactableObjectData.forEach(data => {
            if (this.isDataInRange(data)){
                o = data;
                return;
            }
        });
        return o;
    }

    onUpdate() {
        var data = this.objectInRange();
        if (data) {
            data.callback(data);
        }
    }

    makeObject(x, y, info) {
        var interact = this.scene.physics.add.sprite(x, y).setOrigin(0,0).setImmovable(true);
        // make it so this object can be edited in func possibly? doesn't matter
        this.addObjectData({
            name: info.name,
            radius: info.radius,
            object: interact,
            callback: (data) => {
                if (this.target.movement && this.target.movement.isSpaceDown()) {
                    if (info.interact) {
                        info.interact(data);
                    }
                }
                else {
                    if (info.inRange) {
                        info.inRange(data);
                    }
                }
            }
        })

        return interact;
    }
}

export default InteractionManager;