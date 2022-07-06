class OptionsScene extends Phaser.Scene {
    constructor() { 
        super("OptionsScene");
    }

    preload() {

    }
    create() {
        this.cameras.main.setBackgroundColor("black");

        var back = this.add.text(50, 20, "<< back", {
            fontSize: 30,
            shadow: 0
        }).setInteractive().on("pointerover", () => {
            back.setColor('#D0D0D0');
            back.setShadow(-2, 0, "yellow", 5);
        }).on("pointerout", () => {
            back.setColor('white');
            back.setShadow();
        }).on("pointerup", () => {
            console.log("back click");

            back.setColor('white');
            back.setShadow();

            var cam = this.cameras.main;
            var targetScene = this.scene.get("MenuScene");
            var targetCam = targetScene.cameras.main;
            var defaultHeight = this.cameras.default.height;
            var targetDefaultHeight = targetScene.cameras.default.height;

            this.scene.transition({
                target: "MenuScene",
                sleep: true,
                duration: 1000,
                onUpdate: (progress) => {
                    cam.setViewport(0, progress * defaultHeight, cam.width, (1 - progress) * defaultHeight);
                    targetCam.setViewport(0, 0, targetCam.width, progress * targetDefaultHeight);
                    targetCam.setScroll(0, (1 - progress) * defaultHeight - 1);
                }
            });
        });
    }
    update() {

    }
}

export default OptionsScene;