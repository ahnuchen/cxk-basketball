//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var getTimer = egret.getTimer;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.ballT = 0;
        _this.gameStatus = 0; //游戏状态 0 未开始 1 按压 2 正在投篮 3命中 4积分
        _this.powerEarn = 0; //力量 0-1
        _this.ballCount = 10;
        _this.totalPoint = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBeginState, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEndState, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.scale_intro = RES.getRes('scale_intro_mp3');
                        this.scale_circle = RES.getRes('scale_loop_mp3');
                        this.shotSound = RES.getRes('launch_mp3');
                        this.bingoSound = RES.getRes('point_mp3');
                        this.dieSound = RES.getRes('die_mp3');
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.drawBallCountAndScore = function () {
        this.ballCountText.text = 'x' + this.ballCount.toString();
        this.pointText.text = '得分：' + this.totalPoint.toString();
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        //    白色背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xffffff, 1);
        shp.graphics.drawRect(0, 0, stageW, stageH);
        shp.graphics.endFill();
        this.addChild(shp);
        //篮球场背景
        var sky = this.createBitmapByName("bg_png");
        this.addChild(sky);
        sky.width = stageW;
        sky.height = stageW / (1102 / 1172);
        sky.y = (stageH - sky.height) / 2;
        this.cxk = new CXK();
        this.addChild(this.cxk);
        this.cxk.x = 349;
        this.cxk.y = sky.y + 231;
        var ball2 = new Ball();
        this.addChild(ball2);
        ball2.x = 156;
        ball2.y = 325;
        ball2.alpha = 0;
        this.ball2 = ball2;
        this.touchEnabled = true;
        this.scoreboardImg = new ScoreBoard();
        this.scoreboardImg.touchEnabled = true;
        this.scoreboardImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
        var tipText = new egret.TextField();
        this.addChild(tipText);
        tipText.textColor = 0x1aad19;
        tipText.x = 200;
        tipText.y = 900;
        tipText.text = '长按蓄力，松开投球';
        this.pointText = new egret.TextField();
        this.addChild(this.pointText);
        this.pointText.x = 400;
        this.pointText.y = 5;
        this.pointText.textColor = 0x333333;
        this.pointText.size = 28;
        this.ballCountText = new egret.TextField();
        this.addChild(this.ballCountText);
        this.ballCountText.x = 60;
        this.ballCountText.y = 5;
        this.ballCountText.size = 28;
        this.ballCountText.textColor = 0x333333;
        this.ball3 = this.createBitmapByName('ball_png');
        this.addChild(this.ball3);
        this.ball3.y = 5;
        this.ball3.x = 25;
        this.ball3.width = 25;
        this.ball3.height = 25;
        this.drawBallCountAndScore();
    };
    Main.prototype.restart = function () {
        console.log('restart');
        if (this.gameStatus === 4) {
            this.removeChild(this.scoreboardImg);
            this.gameStatus = 0;
            this.totalPoint = 0;
            this.ballCount = 10;
            this.drawBallCountAndScore();
        }
    };
    Main.prototype.onEnterFrame = function () {
        if (this.gameStatus === 2 || this.gameStatus === 3) {
            this.ballSport();
        }
        if (this.gameStatus === 1) {
            //蓄力过程
            this.powerEarn = this.powerEarn + (1 / 66);
        }
    };
    Main.prototype.onTouchBeginState = function () {
        var _this = this;
        console.log('touch begin');
        if (this.gameStatus === 0) {
            this.gameStatus = 1;
            this.powerEarn = 0;
            this.ballT = 0;
            this.scaleChannel = this.scale_intro.play(0, 1);
            setTimeout(function () {
                if (_this.gameStatus === 1) {
                    _this.scaleChannel.stop();
                    _this.scaleChannel = _this.scale_circle.play(0, 0);
                }
            }, 2200);
            this.cxk.prepare();
        }
    };
    Main.prototype.onTouchEndState = function () {
        console.log('touch end');
        if (this.gameStatus === 1) {
            this.ballT = 0;
            this.gameStatus = 2;
            this.scaleChannel.stop();
            this.shotSound.play(0, 1);
            this.cxk.shot();
            this.ballCount--;
            this.drawBallCountAndScore();
            this.ball = new Ball();
            this.addChild(this.ball);
            this.ball.alpha = 0;
        }
    };
    Main.prototype.ballSport = function () {
        var _this = this;
        //篮球弧线
        var speed = 0.015;
        var t = this.ballT;
        var p0 = { x: 350, y: 445 };
        // let p1 = {x: 250, y: 200};
        var p1 = { x: 250, y: 200 + (0.5 - this.powerEarn) * 320 };
        var p2 = __assign({}, p1);
        var p3 = { x: 100 + (0.5 - this.powerEarn) * 160, y: 400 };
        var cx = 3 * (p1.x - p0.x);
        var bx = 3 * (p2.x - p1.x) - cx;
        var ax = p3.x - p0.x - cx - bx;
        var cy = 3 * (p1.y - p0.y);
        var by = 3 * (p2.y - p1.y) - cy;
        var ay = p3.y - p0.y - cy - by;
        var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
        var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;
        this.ballT += speed;
        if (this.ballT > 1) {
            this.ballT = 1;
        }
        this.ball.alpha = 1;
        //结束这一步
        var stepOver = function () {
            _this.gameStatus = 0;
            _this.cxk.reset();
            _this.removeChild(_this.ball);
            if (_this.ballCount <= 0) {
                _this.gameStatus = 4;
                _this.addChildAt(_this.scoreboardImg, 10);
                _this.scoreboardImg.x = (_this.stage.stageWidth - _this.scoreboardImg.scoreBoard.width) / 2;
                _this.scoreboardImg.y = (_this.stage.stageHeight - _this.scoreboardImg.scoreBoard.height) / 2;
                console.log(_this.scoreboardImg.x, _this.scoreboardImg.y);
                _this.scoreboardImg.setCurrentPoint(_this.totalPoint);
            }
            _this.drawBallCountAndScore();
        };
        if (this.gameStatus === 3) {
            this.ball.y = yt;
            if (yt >= p3.y - 1) {
                this.totalPoint++;
                stepOver();
            }
        }
        else if (this.gameStatus === 2) {
            var isHit = this.ball2.hitTestPoint(this.ball.x + 5, this.ball.y + 5);
            if (isHit) {
                this.bingoSound.play(0, 1);
                this.gameStatus = 3;
            }
            this.ball.x = xt;
            this.ball.y = yt;
        }
        if (this.ball.y >= p3.y - 1 && this.ball.x <= p3.x + 1) {
            if (this.gameStatus === 2) {
                this.dieSound.play(0, 1);
                stepOver();
            }
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
