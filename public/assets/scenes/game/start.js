import InteractionManager from "./interactionManager.js";
import AnimationManager from "./animationManager.js";
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
        this.alert = new Alert(this);

        this.cameras.main.setBackgroundColor("#ffa54f");
    }
    create() {
        this.cameras.main.fadeIn(1000);
        //this.add.image(0, 0, "room1").setOrigin(0, 0).setScale(4).setDepth(0);

        // need sprite sheet for player - load thru physics ngine (wtch jest array vid)
        // https://fermmm.wordpress.com/2011/02/04/swf-spritesheet-creator/ https://www.pinterest.com/pin/272256739943045007/
        
        this.roomManager.onCreate();
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
    
        
        var sprite = this.physics.add.sprite(100, 200, "main", "atlas_0").setCollideWorldBounds(true); this.sprite = sprite;
        sprite.setSize(50, 100);

        sprite.interactionManager = new InteractionManager(this, sprite);
        sprite.movement = new Movement(this, sprite);

        var interact1 = this.physics.add.sprite(500,500).setOrigin(0,0);

        sprite.interactionManager.addObjectData({
            name: "hitlist",
            object: interact1,
            radius: 100,
            callback: (data) => {
                // make alert to player you can interact with data.objname, maybe even highlight it
                if (sprite.movement.isSpaceDown()) { // you can totally ignore the alrt by holding spc br down. do i care? no
                    // implement the thing where this is only called like once o smth
                    console.log("interacting");
                }
                else { // as insanity increases, number of exclamations increases (meaning its moer important) - only when with things linked 2 hitlist
                    this.alert.alert(`Interacting with ${data.name}`, (async () => {
                        var interval = setInterval(() => { // we want this function only clld once, instead it'll b calld every fame the space bar isnt down
                            if (!sprite.interactionManager.isDataInRange(data)) {
                                this.alert.stop();
                                clearInterval(interval);
                            }
                        }, 1000); // 10 times per sec
                    }));
                    // how to detect when no longr interacting ?
                    // no longer interacting when out of range
                    // no longer interacting when clicked ?
                    // alert should return function that is called when wanna stop alrt
                    // when no longer interactng, which will tidy up
                    // setInterval here will continuously chck if still iteracting
                    // so much talk for a bunch of crap
                }
            }
        });
        

        // https://www.deviantart.com/someonecalledmgee/art/Pixel-Wooden-Floor-Texture-736852960
        // for flooring etc.. add more sprites such as bed, table, award shelf thingy
        // just find free assets online for each sprite !! just google : 
        // load through physics engine                  free to use wooden plank texture pixel art
        // remember texture etc
        
        this.cameras.main.once("camerafadeincomplete", (camera) => {
            delay(2000).then(() => {
                this.notification.notify("Welcome", "you are an assassin.\nGet started by reading the hitlist.");
            });
        });
    }
    update(time, dt) {
        this.sprite.movement.onUpdate(dt);
        this.sprite.interactionManager.onUpdate();
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