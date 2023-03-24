// import { ref, reactive } from "vue";
// import * as Phaser from "phaser";
import bg1_startcg from "../assets/imgs/ui/bg1_startcg.jpg";
import p01_1 from "../assets/imgs/p01-1.png";
import p_f01 from "../assets/imgs/p-f01.png";
import a11bai from "../assets/imgs/enemy/a1-1-bai.png";
import wb01 from "../assets/imgs/bullet/wb-01.png";
import boom01 from "../assets/imgs/effect/boom01.png";

type obj = { preload: () => void };

export const usePreload = (): obj => {
  // 加载器, new LoaderPlugin(scene) === this 都指向构造函数
  function preload(this: any) {
    // 设置路径https://github.com/LeroyK111/ThunderCross/blob/master/docs/assets/a1-1-bai.png?raw=true
    this.load.setBaseURL("https://github.com/LeroyK111/ThunderCross/");
    // 加载图片
    this.load.image("sky", "assets/bg1_startcg.jpg");
    // 加载飞机的精灵图，设置截取片段大小
    this.load.spritesheet("plane", "assets/p01-1.png", {
      frameWidth: 63.5,
      frameHeight: 86,
      startFrame: 0,
      endFrame: 4,
      spacing: 0,
      margin: 0,
    });
    // 加载飞机子弹
    this.load.image("planeBullet", "assets/p-f01.pn");
    // 加载敌机
    this.load.spritesheet("enemyPlane", "assets/a1-1-bai.png", {
      frameWidth: 47,
      frameHeight: 98,
      startFrame: 0,
      endFrame: 2,
      spacing: 0,
      margin: 0,
    });
    // 加载敌机子弹
    this.load.image("enemyPlaneBullet", "assets/wb-01.png");
    // 加载爆炸贴图
    this.load.spritesheet("kaboom", "assets/boom01.png", {
      frameWidth: 86,
      frameHeight: 85,
      startFrame: 0,
      endFrame: 5,
      spacing: 0,
      margin: 0,
    });
  }
  return { preload };
};
