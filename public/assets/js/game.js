/*
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/
https://blog.ourcade.co/posts/2020/phaser-3-add-text-input-rexui/
https://phaser.discourse.group/t/is-it-possible-to-load-a-plugin-globally-using-an-url/1556

https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-4/
https://phaser.io/tutorials/getting-started-phaser3
*/

//import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

class Start extends Phaser.Scene {
    constructor() {
        super({
            key: 'Start'
        });
    }

    preload() {
        this.load.html("loginform", "login.html");
    }
    create() {
        var element = this.add.dom(400,250).createFromCache("loginform");
        element.addListener("click");
        element.on("click", function(event) {
            var target = event.target.name;
            if (target == "loginButton") {
                var username = this.getChildByName('username').value;
                var password = this.getChildByName('password').value;

                if ((username != '' && password != '') && username.length < 10) {
                    // use ajax to validate username password
                }
            }
            if (target == "createAccount") {
                element.removeElement();
            }
        });

        /*
        this.add.text(200, 50, "LOGIN :", {
            color: "#000000",
            font: "26px monospace"
        });

        var userLabel = this.add.text(200, 100, "Input Username:", {
            color: "#000000",
            font: "18px monospace"
        });

        var usernameInput = this.add.text(350, 100, "user", {
            color: "#000000",
            font: "18px monospace"
        });

        this.input.keyboard.on("keydown", function(event) {
            if (event.keyCode == 8 && usernameInput.text.length > 0) {
                usernameInput.text = usernameInput.text.substr(0, usernameInput.text.length - 1);
            }
            else if (event.keyCode >= 48 && event.keyCode < 90) {
                if (usernameInput.text.length < 10) {
                    usernameInput.text += event.key;
                }
            }
        });
    */
    }
    update() {
        //this.usernameInput.x = 5;
    }
}

let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    pixelArt: true,
    //backgroundColor: '#ffffff',
    dom: {
        createContainer: true
    },
    scene: [Start]
};

const game = new Phaser.Game(config);