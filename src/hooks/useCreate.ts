import { ref, reactive } from "vue";

type obj = { create: () => void };

export const useCreate = (): obj => {
  // 动作创建
  function create(this: any): void {
    // 添加背景, 这里我们设置了x，y坐标
    const bg = this.add.image(0, 0, "sky").setOrigin(0, 0);

    // 设置静态物理组，我这里用不到
    // const platforms = this.physics.add.staticGroup();

    // 加入玩家
    const player = this.physics.add
      .sprite(220, 600, "plane", 2)
      .setOrigin(0, 0)
      .setScale(0.8);

    // 给玩家设置弹性系数，
    // player.setBounce(0.2);
    // 圈定玩家边界，不能跑出canvas
    player.setCollideWorldBounds(true);

    // 设置阻尼
    player.setDamping(true);

    // 将玩家绑定到this上
    this["player"] = player;

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
      frames: [{ key: "plane", frame: 2 }],
      frameRate: 5,
    });

    // 飞机子弹组
    const bullets = this.physics.add.group({
      velocityY: -150,
    });
    // 绑定到动作组
    this["bullets"] = bullets;


    // boss
    // this.physics.add.image(0, 0, "boss").setOrigin(0, 0);

    // 敌机组
    
    // 敌机子弹




    // 击落敌机，物理碰撞，删除子弹和敌机，展示敌机爆炸动画。积分变动。


    // 击落我机，物理碰撞，删除子弹，展示我机爆炸动画，进入结算画面。


    // 敌机和我机碰撞，双方爆炸动画。进入结算界面。
    
  }

  return { create };
};
