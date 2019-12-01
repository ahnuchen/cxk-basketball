var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ScoreBoard = (function (_super) {
    __extends(ScoreBoard, _super);
    function ScoreBoard() {
        var _this = _super.call(this) || this;
        //任务移动的方向
        _this.currentPoint = 0;
        _this.maxPoint = 0;
        // this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    ScoreBoard.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    };
    ScoreBoard.prototype.setCurrentPoint = function (point) {
        this.currentPoint = point;
        if (point > this.maxPoint) {
            this.maxPoint = point;
        }
        this.currentPointText.text = this.currentPoint + "";
        this.maxPointText.text = this.maxPoint + "";
    };
    ScoreBoard.prototype.init = function () {
        var shp = new egret.DisplayObjectContainer();
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
    };
    return ScoreBoard;
}(egret.DisplayObjectContainer));
__reflect(ScoreBoard.prototype, "ScoreBoard");
