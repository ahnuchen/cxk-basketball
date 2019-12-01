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
var CXK = (function (_super) {
    __extends(CXK, _super);
    function CXK() {
        var _this = _super.call(this) || this;
        _this.speedBall = 0;
        _this.status = 1;
        _this.step = 0;
        _this.shotStatus = 0;
        _this.createScene();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.changeIkun, _this);
        return _this;
    }
    CXK.prototype.reset = function () {
        this.step = 0;
    };
    CXK.prototype.prepare = function () {
        this.step = 1;
    };
    CXK.prototype.shot = function () {
        this.step = 2;
    };
    CXK.prototype.createScene = function () {
        this.cxk = new egret.Bitmap();
        this.cxk.width = 40;
        this.cxk.height = 60;
        this.ball = this.createBitmapByName('ball_png');
        this.ball.width = 10;
        this.ball.height = 10;
        this.ball.x = 15;
        this.addChild(this.ball);
        this.addChild(this.cxk);
    };
    CXK.prototype.changeIkun = function () {
        if (this.step === 0) {
            this.cxk.height = 60;
            this.shotStatus = 0;
            this.cxk.y = 0;
            if (this.status > 3) {
                this.status = 1;
                this.speedBall = 0;
            }
            if (this.status > 2) {
                this.cxk.texture = RES.getRes('paddle_2_png');
            }
            else {
                this.cxk.texture = RES.getRes('paddle_1_png');
            }
            this.status = this.status + 0.1;
            this.changeBall();
        }
        else if (this.step === 1) {
            this.cxk.texture = RES.getRes('paddle_2_png');
            this.ball.y = 30;
            if (this.cxk.height > 40) {
                this.cxk.height -= .6;
                this.cxk.y += .6;
            }
        }
        else if (this.step === 2) {
            this.cxk.texture = RES.getRes('paddle_3_png');
            this.cxk.height = 62;
            this.cxk.y = 0;
            this.shotStatus += 0.4;
            if (this.shotStatus > 1) {
                this.cxk.texture = RES.getRes('paddle_4_png');
            }
        }
    };
    CXK.prototype.changeBall = function () {
        if (this.status > 2) {
            this.ball.y = 15 + 10 * (this.speedBall);
        }
        else {
            this.ball.y = 40 - 10 * (this.speedBall);
        }
        this.speedBall += 0.15;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    CXK.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return CXK;
}(egret.DisplayObjectContainer));
__reflect(CXK.prototype, "CXK");
