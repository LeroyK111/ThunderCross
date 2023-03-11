import { ref, reactive } from "vue";

type obj = { create: () => void; update: () => void };

export const useCreate = (): obj => {
  // 创建一个响应式对象
  let player: any;

  // 动作创建
  function create(this: any): void {
    // 添加背景, 这里我们设置了x，y坐标
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    // 设置静态物理组，我这里用不到
    // const platforms = this.physics.add.staticGroup();

    // 加入玩家
    player = this.physics.add
      .sprite(220, 600, "plane", 2)
      .setOrigin(0, 0)
      .setScale(0.8);

    // 给玩家设置弹性系数，
    // player.setBounce(0.2);
    // 圈定玩家边界，不能跑出canvas
    player.setCollideWorldBounds(true);

    // 设置阻尼
    player.setDamping(true)

    // 给玩家设置动作
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("plane", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("plane", { start: 3, end: 4 }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: "default",
      frames: [{key: "plane", frame: 2}],
      frameRate: 5,
    });
    

    // 粒子特效
    // const particles = this.add.particles("plane");

    // 碰撞器，子弹和敌机
    // this.physics.add.collider(player, platforms);
  }

  function update(this: any) {
    // 键盘控制
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-70);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(70);
      player.anims.play("right", true);
    } else if (cursors.up.isDown) {
      player.setVelocityY(-70);
      player.anims.play("default", true);
    } else if (cursors.down.isDown) {
      player.setVelocityY(70);
      player.anims.play("default", true);
    } else if (cursors.left.isUp || cursors.right.isUp || cursors.up.isUp || cursors.down.isDown) {
      player.setVelocity(0, 0)
      player.anims.play("default", true);
    }
  }

  return { create, update };
};
