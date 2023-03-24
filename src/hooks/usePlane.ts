import { reactive, ref } from "vue";

type rule = { plane: () => void };

export const usePlane = (): rule => {
  const onOff = ref(true);
  const enemyOff = ref(true);

  // 防抖
  const timer = () => {
    onOff.value = false;
    setTimeout(() => {
      onOff.value = true;
    }, 200);
  };

  const timer2 = async () => {
    enemyOff.value = false;
    await setTimeout(() => {
      enemyOff.value = true;
    }, 5000);
  };

  function plane(this: any) {
    // 键盘控制
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("right", true);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.anims.play("default", true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(100);
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

    if (enemyOff.value) {
      timer2();
      // 飞机随机飞行
      this.enemyPlanes.children.entries.map((enemyPlane: any) => {
        enemyPlane.setVelocity(
          Phaser.Math.Between(-25, 25),
          Phaser.Math.Between(-25, 25)
        );

        const enemyBullet = this.physics.add
          .image(
            enemyPlane.getCenter().x,
            enemyPlane.getCenter().y + 30,
            "enemyPlaneBullet"
          )
          .setScale(0.7);

        this.enemyBullets.add(enemyBullet);
      });
    }
  }

  return { plane };
};
