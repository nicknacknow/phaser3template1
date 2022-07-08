import InteractionManager from "./interactionManager.js";
import AnimationManager from "./animationManager.js";
import PlayerManager from "./playerManager.js";
import Movement from "./characterMovement.js"
import Notification from "./notification.js"
import RoomManager from "./roomManager.js";
import Alert from "./alert.js";

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));


class StartGameScene extends Phaser.Scene {
    constructor() {
        super("StartGameScene");
    }

    preload() {
        this.animationManager = new AnimationManager(this, true);
        this.roomManager = new RoomManager(this, true);
        this.notification = new Notification(this);
        this.playerManager = new PlayerManager();
        this.alert = new Alert(this);

        //this.cameras.main.setBackgroundColor("#ffa54f");
    }
    create() {
        this.cameras.main.fadeIn(1500);
        //this.add.image(0, 0, "room1").setOrigin(0, 0).setScale(4).setDepth(0);

        // need sprite sheet for player - load thru physics ngine (wtch jest array vid)
        // https://fermmm.wordpress.com/2011/02/04/swf-spritesheet-creator/ https://www.pinterest.com/pin/272256739943045007/
        
        this.animationManager.onCreate([
            {
                key: "walk_down",
                frames: ["atlas_0", "atlas_4", "atlas_1", "atlas_4"],
                frameRate: 3
            },
            {
                key: "idle_down",
                frames: ["atlas_4"],
                frameRate: 1
            },
            {
                key: "walk_up",
                frames: ["atlas_2", "atlas_6", "atlas_5", "atlas_6"],
                frameRate: 3
            },
            {
                key: "idle_up",
                frames: ["atlas_6"],
                frameRate: 1
            },
            {
                key: "walk_right",
                frames: ["atlas_3", "atlas_11", "atlas_7", "atlas_11"],
                frameRate: 3
            },
            {
                key: "idle_right",
                frames: ["atlas_11"],
                frameRate: 1
            },
            {
                key: "walk_left",
                frames: ["atlas_8", "atlas_10", "atlas_9", "atlas_10"],
                frameRate: 3
            },
            {
                key: "idle_left",
                frames: ["atlas_10"],
                frameRate: 1
            }
        ]);
    
        var alert = this.alert;

        const width = this.game.renderer.width, height = this.game.renderer.height;
        
        var sprite = this.playerManager.new(this, width - 48 * 1.5, 48 * 3, (sprite) => { sprite.sprite.play("idle_left"); }); this.sprite = sprite;

        sprite.makeInteractionObject(width - 470, 500, {
            name: "Breakfast",
            radius: 75,
            interact: (data) => {
                console.log("interacting");
            },
            inRange: (data) => { // add keybnd options that u can change in options menu
                alert.alert(`Press <SPACE> to interact with ${data.name}`, (async () => {
                    var interval = setInterval(() => {
                        if (!sprite.interactionManager.isDataInRange(data)) {
                            alert.stop();
                            clearInterval(interval);
                        }
                    }, 1000);
                }));
            }
        });

        this.roomManager.onCreate(sprite);
        

        // https://www.deviantart.com/someonecalledmgee/art/Pixel-Wooden-Floor-Texture-736852960
        // for flooring etc.. add more sprites such as bed, table, award shelf thingy
        // just find free assets online for each sprite !! just google : 
        // load through physics engine                  free to use wooden plank texture pixel art
        // remember texture etc
        
        this.cameras.main.once("camerafadeincomplete", (camera) => {
            delay(2000).then(() => {
                //this.notification.notify("Welcome", "you are an assassin.\nGet started by reading the hitlist.");
                this.notification.notify("Good morning !", "Use <WASD> to eat your breakfast...", {textDelay: 75});
                sprite.movement.enabled = true;
            });
        });
    }
    update(time, dt) {
        this.sprite.onUpdate(dt);
    }
}

export default StartGameScene;

/*
use to generate atlas from spritesheet: https://gammafp.com/tool/atlas-packer/
good video guide: https://www.youtube.com/watch?v=qEoD3ZXpR4c



cool game thing :
https://steemit.com/utopian-io/@onepice/move-objects-according-to-the-mouse-position-with-phaser-3

nice sprite sheet
https://limezu.itch.io/kitchen


https://www.youtube.com/watch?v=96kUkPgAiJA
tilemap stuff...


cool lighting
https://phaser.io/examples/v3/view/game-objects/lights/tilesprite-light

*/