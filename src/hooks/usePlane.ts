import { ref } from "vue";

type rule = { plane: () => void };

export const usePlane = (): rule => {
  const onOff = ref(true);

  // 防抖
  const timer = () => {
    onOff.value = false;
    setTimeout(() => {
      onOff.value = true;
    }, 200);
  };

  function plane(this: any) {
    // 键盘控制
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-70);
      this.player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(70);
      this.player.anims.play("right", true);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-70);
      this.player.anims.play("default", true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(70);
      this.player.anims.play("default", true);
    } else if (
      cursors.left.isUp ||
      cursors.right.isUp ||
      cursors.up.isUp ||
      cursors.down.isDown
    ) {
      this.player.setVelocity(0, 0);
      this.player.anims.play("default", true);
    }

    if (cursors.space.isDown) {
      if (onOff.value) {
        timer();
        const bullet = this.physics.add
          .image(
            this.player.getCenter().x,
            this.player.getCenter().y - 40,
            "planeBullet"
          )
          .setScale(0.8);
        this.bullets.add(bullet, true);
      }
    }
  }

  return { plane };
};
