class CXK extends egret.DisplayObjectContainer {

    private cxk: egret.Bitmap;
    private ball: egret.Bitmap;
    private speedBall: number = 0;
    private status: number = 1;

    private step: number = 0;

    private shotStatus = 0;

    constructor() {
        super()
        this.createScene()
        this.addEventListener(egret.Event.ENTER_FRAME, this.changeIkun, this)
    }

    public reset() {
        this.step = 0
    }

    public prepare() {
        this.step = 1
    }

    public shot() {
        this.step = 2
    }


    createScene() {
        this.cxk = new egret.Bitmap();
        this.cxk.width = 40
        this.cxk.height = 60

        this.ball = this.createBitmapByName('ball_png');
        this.ball.width = 10
        this.ball.height = 10
        this.ball.x = 15
        this.addChild(this.ball)
        this.addChild(this.cxk)
    }


    private changeIkun() {
        if (this.step === 0) {
            this.cxk.height = 60
            this.shotStatus = 0
            this.cxk.y = 0
            if (this.status > 3) {
                this.status = 1;
                this.speedBall = 0
            }
            if (this.status > 2) {
                this.cxk.texture = RES.getRes('paddle_2_png')
            } else {
                this.cxk.texture = RES.getRes('paddle_1_png')
            }
            this.status = this.status + 0.1

            this.changeBall()
        } else if (this.step === 1) {
            this.cxk.texture = RES.getRes('paddle_2_png')
            this.ball.y = 30
            if (this.cxk.height > 40) {
                this.cxk.height -= .6
                this.cxk.y += .6
            }
        } else if (this.step === 2) {
            this.cxk.texture = RES.getRes('paddle_3_png')
            this.cxk.height = 62
            this.cxk.y = 0
            this.shotStatus += 0.4
            if (this.shotStatus > 1) {
                this.cxk.texture = RES.getRes('paddle_4_png')
            }
        }
    }

    private changeBall() {
        if (this.status > 2) {
            this.ball.y = 15 + 10 * (this.speedBall)
        } else {
            this.ball.y = 40 - 10 * (this.speedBall)
        }
        this.speedBall += 0.15
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