class Ball extends egret.Sprite {
    private ball: egret.Bitmap;

    constructor() {
        super()
        this.createScene()
    }


    private createScene() {
        this.ball = this.createBitmapByName('ball_png');
        this.ball.width = 10
        this.ball.height = 10
        this.addChild(this.ball)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}