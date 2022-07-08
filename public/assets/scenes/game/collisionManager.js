class CollisionManager {
    constructor(scene) {
        this.scene = scene;
    }
    GiveObjectCollision(sprite,obj,callback) {
        this.scene.physics.add.collider(sprite, obj, callback);
    }
    CollideWithLayer(sprite,layer, callback) {
        const self = this;
        layer.list.forEach(function(obj) {
            self.GiveObjectCollision(sprite, obj, callback);
        });
    }
}

export default CollisionManager;