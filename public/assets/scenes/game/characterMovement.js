class Movement{
    constructor(scene, target, enabled) {
        this.scene = scene;
        this.character = target;
        this.enabled = enabled == null ? true : enabled;

        this.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D, SPACE");
    }

    isSpaceDown() {
        return this.keyboard.SPACE.isDown;
    }

    onUpdate(dt) { // https://www.youtube.com/watch?v=55DzXMkCfVA
        if (!this.enabled) return;
        if (this.keyboard.SPACE.isDown) {
            // spacebar for interact with nearby instances to player
            // create interaction class, allow objects to be accepted with interacion etc
           // console.log("space is down");
        }
        if (this.keyboard.W.isDown) {
            this.character.setVelocityY(-100);
        }
        if (this.keyboard.A.isDown) {
            this.character.setVelocityX(-100);
        }
        if (this.keyboard.S.isDown) {
            this.character.setVelocityY(100);
        }
        if (this.keyboard.D.isDown) {
            this.character.setVelocityX(100);
        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
            this.character.setVelocityX(0);
        }
        if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
            this.character.setVelocityY(0);
        }

        let velocity = this.character.body.velocity;
        if (velocity.y > 0) { 
            this.character.play("walk_down", true);
        } else if (velocity.x > 0) {
            this.character.play("walk_right", true);
        } else if (velocity.x < 0) {
            this.character.play("walk_left", true);
        } else if (velocity.y < 0) {
            this.character.play("walk_up", true);
        }
        else {
            // stationary , make character look at mouse
            let posX = this.character.body.x + this.character.body.width / 2, posY = this.character.body.y + this.character.body.height / 2;
            let mouseX = this.scene.input.mousePointer.x, mouseY = this.scene.input.mousePointer.y;
            let angle = Math.atan((mouseY - posY) / (mouseX - posX));

            if (mouseY > posY){
                if (angle > 0.35 || angle < -0.35) {
                    this.character.play("idle_down");
                }
            }
            else {

                if (angle < -1 || angle > 1) {
                    this.character.play("idle_up");
                }
                else if (angle < 1 && angle > 0) {
                    this.character.play("idle_left");
                }
                else if (angle > -1 && angle < 0) {
                    this.character.play("idle_right");
                }
            }
        }
    }
}

export default Movement;