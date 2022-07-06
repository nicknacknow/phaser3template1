class Movement{
    constructor(scene, target) {
        this.scene = scene;
        this.character = target;

        this.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D, SPACE");
    }

    onUpdate(dt) {
        if (this.keyboard.SPACE.isDown) {
            // spacebar for interact with nearby instances to player
            // create interaction class, allow objects to be accepted with interacion etc
            console.log("space is down");
        }
        if (this.keyboard.W.isDown) {
            this.character.y = this.character.y - 100 * (dt / 1000);
        }
        if (this.keyboard.A.isDown) {
            this.character.x = this.character.x - 100 * (dt / 1000);
        }
        if (this.keyboard.S.isDown) {
            this.character.y = this.character.y + 100 * (dt / 1000);
        }
        if (this.keyboard.D.isDown) {
            this.character.x = this.character.x + 100 * (dt / 1000);
        }
    }
}

export default Movement;