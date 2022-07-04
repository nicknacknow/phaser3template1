class Start extends Phaser.Scene {
    constructor() {
        super({
            key: 'Start'
        });
    }

    preload() {
        this.load.html("loginform", "login.html");
        this.load.html("signupform", "signup.html");
    }
    create() {
        var login_element = this.add.dom(400,250).createFromCache("loginform");
        var signup_element = this.add.dom(400,250).createFromCache("signupform");
        document.querySelector(".signup-form").style.display = "none";

        login_element.addListener("click");
        login_element.on("click", function(event) {
            var target = event.target.name;
            if (target == "loginButton") {
                var username = this.getChildByName('username').value;
                var password = this.getChildByName('password').value;

                if ((username != '' && password != '') && username.length < 10) {
                    // use ajax to validate username password
                }
            }
            if (target == "createAccount") {
                event.preventDefault();
                
                document.querySelector(".signup-form").style.display = "block";
                document.querySelector(".signup-shadow").style.visibility = "visible";
                document.querySelector(".form").style.display = "none";
                document.querySelector(".shadow").style.visibility = "hidden";
                //login_element.setElement("shadow", {visibility: "hidden"});
                //signup_element.setElement("signup-main", {display: "block"});
            }
        });
    }
    update() {
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