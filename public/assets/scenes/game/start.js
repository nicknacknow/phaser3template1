import Movement from "./characterMovement.js"
import Notification from "./notification.js"

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));


class StartGameScene extends Phaser.Scene {
    constructor() {
        super("StartGameScene");
    }

    preload() {
        this.notification = new Notification(this);
        this.cameras.main.setBackgroundColor("#ffa54f");
        //this.load.image("room1", "/assets/room1.png");
    }
    create() {
        this.cameras.main.fadeIn(1000);
        //this.add.image(0, 0, "room1").setOrigin(0, 0).setScale(4).setDepth(0);

        // need sprite sheet for player - load thru physics ngine (wtch jest array vid)
        // https://fermmm.wordpress.com/2011/02/04/swf-spritesheet-creator/ https://www.pinterest.com/pin/272256739943045007/
        var player = this.add.text(50, 50, "|||\n|||");
        this.movement = new Movement(this, player);

        // https://www.deviantart.com/someonecalledmgee/art/Pixel-Wooden-Floor-Texture-736852960
        // for flooring etc.. add more sprites such as bed, table, award shelf thingy
        // just find free assets online for each sprite !! just google : 
        // load through physics engine                  free to use wooden plank texture pixel art
        // remember texture etc
        
        this.cameras.main.once("camerafadeincomplete", (camera) => {
            delay(2000).then(() => {
                this.notification.notify("Welcome", "you are a hitman.\nGet started by reading the hitlist.");
            });
        });
    }
    update(time, dt) {
        this.movement.onUpdate(dt);
    }
}

export default StartGameScene;