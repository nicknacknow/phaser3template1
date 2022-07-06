/*
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/
https://blog.ourcade.co/posts/2020/phaser-3-add-text-input-rexui/
https://phaser.discourse.group/t/is-it-possible-to-load-a-plugin-globally-using-an-url/1556

https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-4/
https://phaser.io/tutorials/getting-started-phaser3
*/

//import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image("titlebg", "/assets/titlebg.jpg");
    }
    create() { // do pixel art for game ? 
        var width = this.game.renderer.width, height = this.game.renderer.height;
        this.add.image(0, 0, "titlebg").setOrigin(.1, 0).setDepth(0);
        var title = this.add.text(width / 2 - 75, height / 5, "title", {
            fontSize: 70,
            shadow: 0
        }).setShadow(0, 0, "black", 5).setOrigin(0);
        var text = this.add.text(title.x, title.y, title.text, {
            fontSize: 70,
            shadow: 0
        }).setShadow(0, 0, "yellow", 5).setOrigin(0);

        this.tweens.add({ // 'flashing light' effect
            targets: text,
            alpha: 0,
            ease: 'Quadratic ease-out',  
            duration: 100,
            repeat: -1,
            yoyo: true,
            hold: 1500,
            repeatDelay: 100
        });

        var play = this.add.text(width / 2 - 50, height / 2 - 50, "< play >", {
            fontSize: 30,
            shadow: 0
        });

        var options = this.add.text(width / 2 - 75, height / 2 + 50, "< options >", {
            fontSize: 30,
            shadow: 0
        });

        var pointer1 = this.add.text(0, 0, ">>", {
            //color: "yellow",
            fontSize: 25,
            shadow: 0
        }).setShadow(2, 0, "yellow", 2), pointer2 = this.add.text(0, 0, "<<", {
            //color: "yellow",
            fontSize: 25,
            shadow: 0
        }).setShadow(-2, 0, "yellow", 2);;
        pointer1.setVisible(false);
        pointer2.setVisible(false);

        play.setInteractive().on("pointerover", () => {
            pointer1.setVisible(true);
            pointer1.x = play.x + 5 - play.width / 2;
            pointer1.y = play.y;
            
            pointer2.setVisible(true);
            pointer2.x = play.x + play.width * 1.25;
            pointer2.y = play.y;

            play.setColor('#D0D0D0');
            play.setShadow(0, 0, "yellow", 5);
        }).on("pointerout", () => {
            pointer1.setVisible(false);
            pointer2.setVisible(false);
            play.setColor('white');
            play.setShadow();
        }).on("pointerup", () => {
            console.log("play click");

            play.disableInteractive();
            this.cameras.main.fadeOut(1500, 0, 0, 0);

            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("StartGameScene");
            });
        });

        options.setInteractive().on("pointerover", () => {
            pointer1.setVisible(true);
            pointer1.x = options.x + 10 - options.width / 2;
            pointer1.y = options.y;
            
            pointer2.setVisible(true);
            pointer2.x = options.x + options.width * 1.25;
            pointer2.y = options.y;

            options.setColor('#D0D0D0');
            options.setShadow(0, 0, "yellow", 5);
        }).on("pointerout", () => {
            pointer1.setVisible(false);
            pointer2.setVisible(false);
            options.setColor('white');
            options.setShadow();
        }).on("pointerup", () => {
            console.log("options click");

            // tidy up
            pointer1.setVisible(false);
            pointer2.setVisible(false);
            options.setColor('white');
            options.setShadow();
            play.setColor('white');
            play.setShadow();

            var cam = this.cameras.main;
            var targetScene = this.scene.get("OptionsScene");
            var targetCam = targetScene.cameras.main;
            var defaultHeight = this.cameras.default.height;
            var targetDefaultHeight = targetScene.cameras.default.height;

            this.scene.transition({
                target: "OptionsScene",
                sleep: true,
                duration: 1000,
                onUpdate: (progress) => {
                    cam.setViewport(0, 0, cam.width, (1 - progress) * defaultHeight);
                    cam.setScroll(0, progress * defaultHeight - 1);
                    targetCam.setViewport(0, (1 - progress) * defaultHeight, targetCam.width, progress * targetDefaultHeight);
                }
            });
        });
    }
    update() {
        // for flickering sound effct could get status of tween here ?
    }
}

export default MenuScene;