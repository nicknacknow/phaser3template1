import InteractionManager from "./interactionManager.js";
import Movement from "./characterMovement.js"

class PlayerManager {
    constructor() {

    }
    new(scene, x, y, callback) {
        var sprite = scene.physics.add.sprite(x, y, "main", "atlas_0").setCollideWorldBounds(true).setSize(50, 80).setDepth(5);
        this.sprite = sprite;
        this.interactionManager = new InteractionManager(scene, this);
        this.movement = new Movement(scene, sprite, false);

        
        if (callback) callback(this);
        return this;
    }
    makeInteractionObject(x, y, info) {
        if (this.interactionManager) {
            this.interactionManager.makeObject(x, y, info);
        }
    }
    onUpdate(dt) {
        if (this.interactionManager) {
            this.interactionManager.onUpdate();
        }
        if (this.movement) {
            this.movement.onUpdate(dt);
        }
    }
}

export default PlayerManager;