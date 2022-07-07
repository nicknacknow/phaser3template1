class Alert {
    constructor(scene) {
        this.scene = scene;
    }

    alert(message, callback) {
        if (this.isAlerting) return;
        this.isAlerting = true;
        
        var graphics = this.scene.add.graphics();
        graphics.fillStyle(0x710C04, 0.85);

        this.back = graphics.fillRoundedRect(10, this.scene.game.renderer.height, 500, 40, 15).setDepth(5);
        this.exclamation = this.scene.add.text(20, this.scene.game.renderer.height, "!", { fontSize: 30 }).setDepth(5);
        this.content = this.scene.add.text(50, this.scene.game.renderer.height + 7, message, { fontSize: 15 }).setDepth(5);
    
        // thes should not be created every alert, intead made in constructor & stored until use
        // for now here but when finished teening move

        this.scene.tweens.add({
            targets: this.back,
            y: -60,
            duration: 567,
            ease: "Expo.easeInOut"
        });

        this.scene.tweens.add({
            targets: this.exclamation,
            y: this.scene.game.renderer.height - 55,
            duration: 567,
            ease: "Expo.easeInOut"
        });

        this.scene.tweens.add({
            targets: this.content,
            y: this.scene.game.renderer.height - 48,
            duration: 567,
            ease: "Expo.easeInOut"
        });

        if (callback) {
            callback();
        }
    }

    stop() {
        if (this.stopping) return;
        this.stopping = true;
        console.log("stpo");
        let self = this;
        this.scene.tweens.add({
            targets: this.back,
            y: 0,
            duration: 890,
            ease: "Expo.easeInOut",
            onComplete: function() {
                self.stopping = false;
                self.isAlerting = false;
                self.back.destroy();
                self.exclamation.destroy();
                self.content.destroy();
            }
        });

        this.scene.tweens.add({
            targets: this.exclamation,
            y: this.scene.game.renderer.height + 5,
            duration: 890,
            ease: "Expo.easeInOut"
        });

        this.scene.tweens.add({
            targets: this.content,
            y: this.scene.game.renderer.height + 12, // for seamless tweeing
            duration: 890,
            ease: "Expo.easeInOut"
        });
    }
}

export default Alert;