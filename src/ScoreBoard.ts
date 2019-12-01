class ScoreBoard extends egret.DisplayObjectContainer {

    public scoreBoard: egret.Bitmap;//人物的bitmap图
    //任务移动的方向

    private currentPoint: number = 0;
    private maxPoint: number = 0;

    private currentPointText: egret.TextField;
    private maxPointText: egret.TextField;

    constructor() {
        super();
        // this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }

    setCurrentPoint(point: number) {
        this.currentPoint = point;
        if (point > this.maxPoint) {
            this.maxPoint = point;
        }
        this.currentPointText.text = this.currentPoint + "";
        this.maxPointText.text = this.maxPoint + "";
    }

    private init() {
        let shp = new egret.DisplayObjectContainer();

        this.scoreBoard = this.createBitmapByName('scoreboard_png');

        shp.width = this.scoreBoard.width;
        shp.height = this.scoreBoard.height;
        this.width = shp.width;
        this.height = shp.height;
        shp.addChild(this.scoreBoard);
        this.currentPointText = new egret.TextField();
        this.maxPointText = new egret.TextField();
        shp.addChild(this.currentPointText);
        shp.addChild(this.maxPointText);

        this.currentPointText.y = this.scoreBoard.height / 2.5;
        this.currentPointText.textColor = 0xcc0000;
        this.maxPointText.textColor = 0xcc0000;
        this.maxPointText.y = this.scoreBoard.height / 1.65;
        this.currentPointText.x = this.scoreBoard.width / 2;
        this.maxPointText.x = this.scoreBoard.width / 2;
        this.addChild(shp);

    }
}