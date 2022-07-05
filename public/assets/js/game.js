/*
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/
https://blog.ourcade.co/posts/2020/phaser-3-add-text-input-rexui/
https://phaser.discourse.group/t/is-it-possible-to-load-a-plugin-globally-using-an-url/1556

https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-4/
https://phaser.io/tutorials/getting-started-phaser3
*/

//import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.html("loginform", "login.html");
        this.load.html("signupform", "signup.html");
        this.load.image("pagebg", "/assets/pagebg.jpg");

        this.load.on("progress", (v)=>{console.log(v);});
    }
    create() {
        
    }
    update() {
        
    }
}

export default GameScene;