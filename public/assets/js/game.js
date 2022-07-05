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
        this.load.image("titlebg", "/assets/titlebg.jpg");
    }
    create() { // do pixel art for game ? 
        var width = this.game.renderer.width, height = this.game.renderer.height;
        this.add.image(0, 0, "titlebg").setOrigin(.1, 0).setDepth(0);
        var text = this.add.text(width / 2 - 200, height / 5, "game name!!!", {
            fontSize: 70
        }).setOrigin(0);

        var play = this.add.text(width / 2 - 50, height / 2 - 50, "< play >", {
            fontSize: 30
        });

        var options = this.add.text(width / 2 - 75, height / 2 + 50, "< options >", {
            fontSize: 30
        });

        var pointer1 = this.add.text(0, 0, ">>", {
            color: "yellow",
            fontSize: 25
        }), pointer2 = this.add.text(0, 0, "<<", {
            color: "yellow",
            fontSize: 25
        });
        pointer1.setVisible(false);
        pointer2.setVisible(false);

        play.setInteractive().on("pointerover", () => {
            pointer1.setVisible(true);
            pointer1.x = play.x + 5 - play.width / 2;
            pointer1.y = play.y;
            
            pointer2.setVisible(true);
            pointer2.x = play.x + play.width * 1.25;
            pointer2.y = play.y;

            play.setColor('#E0E0E0');
        }).on("pointerout", () => {
            pointer1.setVisible(false);
            pointer2.setVisible(false);
            play.setColor('white');
        }).on("pointerup", () => {
            console.log("play click");
        });

        options.setInteractive().on("pointerover", () => {
            pointer1.setVisible(true);
            pointer1.x = options.x + 10 - options.width / 2;
            pointer1.y = options.y;
            
            pointer2.setVisible(true);
            pointer2.x = options.x + options.width * 1.25;
            pointer2.y = options.y;

            options.setColor('#E0E0E0');
        }).on("pointerout", () => {
            pointer1.setVisible(false);
            pointer2.setVisible(false);
            options.setColor('white');
        }).on("pointerup", () => {
            console.log("options click");
        });
    }
    update() {
        
    }
}

export default GameScene;