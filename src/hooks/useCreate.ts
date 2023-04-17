import { ref, reactive, watch } from "vue";
import * as Phaser from "phaser";
import useStore from "../pinia/useStore";

type obj = { create: () => void };

export const useCreate = (): obj => {
  const store = useStore();
  const enemyPlane = 7;

  // 动作创建
  function create(this: any): void {
    // 添加背景, 这里我们设置了x，y坐标
    const bg = this.add.image(0, 0, "sky").setOrigin(0, 0);

    this["bg"] = bg;

    // 加入玩家
    const player = this.physics.add
      .sprite(220, 600, "plane", 2)
      .setOrigin(0, 0)
      .setScale(0.8);

    // 给玩家设置弹性系数，
    // player.setBounce(0.2);
    // 设置阻尼
    player.setDamping(true);

    // 将玩家绑定到this上
    this["player"] = player;

    player.setCollideWorldBounds(true);

    // 给玩家设置动作
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("plane", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: 0,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("plane", { start: 3, end: 4 }),
      frameRate: 5,
      repeat: 0,
    });
    this.anims.create({
      key: "default",
      frames: [{ key: "plane", frame: 2 }],
      frameRate: 5,
    });

    // 飞机子弹组
    const bullets = this.physics.add.group({
      velocityY: -150,
    });

    // 绑定到动作组
    this["bullets"] = bullets;

    // 敌机组，随机运动，
    const enemyPlanes = this.physics.add.group({
      key: "enemyPlane",
      repeat: enemyPlane,
      setXY: { x: 0, y: 0 },
      setOrigin: { originX: 0, originY: 0 },
    });

    this["enemyPlanes"] = enemyPlanes;

    // 敌机子弹组
    const enemyBullets = this.physics.add.group({
      velocityY: 150,
    });
    this["enemyBullets"] = enemyBullets;

    // 敌机子类配置，迭代器
    enemyPlanes.children.iterate(function (child: any) {
      child.setCollideWorldBounds(true);
      child.setPosition(
        Phaser.Math.FloatBetween(0, store.size.width),
        Phaser.Math.FloatBetween(0, store.size.height / 3)
      );
    });

    // 设置爆炸动画
    this.anims.create({
      key: "boom",
      frames: this.anims.generateFrameNumbers("kaboom", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: 0,
    });

    // 积分
    const scoreText = this.add.text(16, 16, `得分: ${store.score}`, {
      fontSize: "14px",
      fill: "#e42623",
    });

    const Event1 = (bullets: any, enemyPlanes: any) => {
      console.log("击中敌机");
      // 爆炸特效
      this.add
        .sprite(enemyPlanes.getCenter().x, enemyPlanes.getCenter().y)
        .play("boom");

      store.score += 10;
      scoreText.setText("得分: " + store.score);
      bullets.disableBody(true, true);
      enemyPlanes.disableBody(true, true);

      if (store.score == 10 * enemyPlane) {
        alert("Victory! Give me stars, please!");
        location.replace("https://github.com/LeroyK111/ThunderCross");
      }
    };

    const Event2 = (enemyBullets: any, player: any) => {
      console.log("击中我");
      this.add.sprite(player.getCenter().x, player.getCenter().y).play("boom");
      enemyBullets.disableBody(true, true);
      player.disableBody(true, true);

      alert("Failure, please challenge again!");
      location.reload();
    };

    const collectStar = (enemyPlanes: any, player: any) => {
      console.log("同归");
      this.add.sprite(player.getCenter().x, player.getCenter().y).play("boom");
      player.disableBody(true, true);
      enemyPlanes.disableBody(true, true);

      alert("Failure, don't give up the game!");
      location.reload();
    };

    // 击落敌机，物理碰撞，删除子弹和敌机，展示敌机爆炸动画。积分变动。
    this.physics.add.collider(bullets, enemyPlanes, Event1);

    // 击落我机，物理碰撞，删除子弹，展示我机爆炸动画，进入结算画面。
    this.physics.add.collider(enemyBullets, player, Event2);

    // 敌机和我机碰撞，双方爆炸动画。进入结算界面。
    this.physics.add.overlap(enemyPlanes, player, collectStar, null, this);
  }

  return { create };
};
