// import { ref, reactive } from "vue";
// import * as Phaser from "phaser";
import bg1_startcg from "../assets/imgs/ui/bg1_startcg.jpg";
import p01_1 from "../assets/imgs/p01-1.png";
import p_f01 from "../assets/imgs/p-f01.png";
import a11bai from "../assets/imgs/enemy/a1-1-bai.png";
import wb01 from "../assets/imgs/bullet/wb-01.png";
// import boss6 from "../assets/imgs/boss/img_plane_boss6_副本.png";

type obj = { preload: () => void };

export const usePreload = (): obj => {
  // 加载器, new LoaderPlugin(scene) === this 都指向构造函数
  function preload(this: any) {
    // 设置路径
    // this.load.setBaseURL("..");
    // 加载图片
    this.load.image("sky", bg1_startcg);
    // 加载飞机的精灵图，设置截取片段大小
    this.load.spritesheet("plane", p01_1, {
      frameWidth: 63.5,
      frameHeight: 86,
      startFrame: 0,
      endFrame: 4,
      spacing: 0,
      margin: 0,
    });
    // 加载飞机子弹
    this.load.image("planeBullet", p_f01);
    // 加载敌机
    this.load.spritesheet("enemyPlane", a11bai, {
      frameWidth: 47,
      frameHeight: 98,
      startFrame: 0,
      endFrame: 2,
      spacing: 0,
      margin: 0,
    });
    // 加载敌机子弹
    this.load.image("enemyPlaneBullet", wb01);
    // 加载爆炸特效
    

    // 开始游戏

    // 暂停游戏

    // 继续游戏

    // 击坠数

    // 被击毁，结算界面

    // 飞机子弹音效

    // 战斗bgm

    // 敌机被击毁音效

    // 飞机被击毁音效
  }
  return { preload };
};
