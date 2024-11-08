class Notification {
    constructor(scene) {
        this.scene = scene;
        this.graphics = scene.add.graphics();
    }

    notify(title, content_text, info) {
        if (this.isNotifying) return;
        this.isNotifying = true;
        var title = this.scene.add.text(-30, 25, title, {
            //color: "white",
            fontSize: 20
        }).setDepth(6);
        var bodyWidth = title.width * 1.75;
        title.x = 0 - bodyWidth;

        var content = this.scene.add.text(0 - bodyWidth, 45, content_text, {
            fontSize: 12.5,
            wordWrap: {
                width: bodyWidth * 0.9,
                useAdvancedWrap: true
            }
        }).setDepth(6);

        this.graphics.fillStyle(0xB80F0A, 0.85);
        var back = this.graphics.fillRoundedRect(0 - bodyWidth, 20, bodyWidth, (title.height + content.height) * 1.5, 15).setDepth(6);
        content.text = ""; // super finecky but must use for text width etc
        let self = this;
        this.scene.tweens.add({
            targets: back,
            x: 20 + bodyWidth,
            duration: 1250,
            ease: "Expo.easeOut",
            hold: 5000 + content_text.length * 75,
            yoyo: true,
            onComplete: function() { self.isNotifying = false; }
        });
        this.scene.tweens.add({
            targets: [title,content],
            x: 30,
            duration: 1250,
            ease: "Expo.easeOut",
            hold: 5000 + content_text.length * 75,
            yoyo: true
        });

        (async () => {
            await new Promise(r => setTimeout(r, 350));

            for (let i = 0; i < content_text.length; i++) {
                let c = content_text.charAt(i);
                content.text = content.text + c;
                await new Promise(r => setTimeout(r, info.textDelay));
            }
        })();
    }
}

export default Notification;