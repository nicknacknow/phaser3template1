/*
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/
https://blog.ourcade.co/posts/2020/phaser-3-add-text-input-rexui/
https://phaser.discourse.group/t/is-it-possible-to-load-a-plugin-globally-using-an-url/1556

https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-4/
https://phaser.io/tutorials/getting-started-phaser3
*/

class Start extends Phaser.Scene {
    constructor() {
        super({
            key: 'Start'
        });
    }
    preload() {
        /*this.load.scenePlugin({
            key: 'rexuiplugin',
            url: "http://localhost:3000/assets/js/rexuiplugin.min.js",
            sceneKey: 'rexUI'
        })

        this.load.plugin('rextexteditplugin', 'http://localhost:3000/assets/js/rextexteditplugin.min.js', true)*/
    }
    create() {
        this.message = this.add.text(640, 250, "hello", {
            color: "#000000",
            font: "18px monospace"
        }).setOrigin(0.5);

        /*this.message.setInteractive().on("pointerdown", () => {
            this.rexUI.edit(text);
        });*/
    }
}

let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    pixelArt: true,
    backgroundColor: '#ffffff',
    dom: {
        createContainer: true
    },
    scene: [Start]
};

const game = new Phaser.Game(config);