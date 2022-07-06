import MenuScene from "./menu.js"
import OptionsScene from "./options.js"

// game scenes
import StartGameScene from "./game/start.js"

function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++){
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class Start extends Phaser.Scene {
    constructor() {
        super("start");
    }

    preload() {
        this.load.html("loginform", "login.html");
        this.load.html("signupform", "signup.html");
        this.load.image("pagebg", "/assets/pagebg.jpg");
    }
    create() {
        this.add.image(600, 400, "pagebg");
        var login_element = this.add.dom(400,250).createFromCache("loginform");
        var signup_element = this.add.dom(400,250).createFromCache("signupform");
        document.querySelector(".signup-form").style.display = "none";

        const self = this;
        login_element.addListener("click");
        login_element.on("click", function(event) {
            var target = event.target.name;
            if (target == "loginButton") {
                var email = this.getChildByName('email').value;
                var password = this.getChildByName('password').value;

                if ((email != '' && password != '')) {
                    // use ajax to validate username password
                    // remember frontend checks also need to be prformd on the backend! thats why im not doing any
                    (async () => {
                        const response = await fetch("/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({email, password})
                        });
                        const res = await response;
                        const json = await res.json();
                        const data = await json;
    
                        if (data.status == "ok") {
                            // successful log-in !
                            console.log("successful log-in");
                            self.scene.start("MenuScene");
                            setInterval(function() {
                                $.ajax({
                                    type: "POST",
                                    url: "/token",
                                    data: {
                                        refreshToken: getCookie("refreshJwt"),
                                        email
                                    },
                                    success: (data) => {},
                                    error: (xhr) => { // alrdy logged out so idk y
                                        $.ajax({
                                            method: "POST",
                                            url: "/logout"
                                        });
                                        window.alert(JSON.stringify(xhr));
                                        //window.location.replace("")
                                    }
                                })
                            }, 10000);
                        }
                    })();
                }
            }
            if (target == "forgotPassword") {
                event.preventDefault();
                alert("remember then");
            }
            if (target == "createAccount") {
                event.preventDefault();
                
                document.querySelector(".signup-form").style.display = "block";
                document.querySelector(".signup-shadow").style.visibility = "visible";
                document.querySelector(".form").style.display = "none";
                document.querySelector(".shadow").style.visibility = "hidden";
            }
        });

        signup_element.addListener("click");
        signup_element.on("click", function(event) {
            var target = event.target.name;

            if (target == "signupButton") {
                event.preventDefault();
                
                var username = this.getChildByName('username').value;
                var email = this.getChildByName('email').value;
                var password = this.getChildByName('password').value;
                var confirmPass = this.getChildByName('confirmPass').value;

                // validate username, email & passwords then post to backend

                if (password == confirmPass) {
                    (async () => {
                        const response = await fetch("/signup", {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({name: username, password, email})
                        });
                        const res = await response;
                        const json = await res.json();
                        const data = await json;

                        console.log(data);
                    })();
                }
            }

            if (target == "loginAccount") {
                event.preventDefault();

                document.querySelector(".signup-form").style.display = "none";
                document.querySelector(".signup-shadow").style.visibility = "hidden";
                document.querySelector(".form").style.display = "block";
                document.querySelector(".shadow").style.visibility = "visible";
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
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Start, MenuScene, OptionsScene, StartGameScene]
};

const game = new Phaser.Game(config);

//game.scene.start("GameScene");