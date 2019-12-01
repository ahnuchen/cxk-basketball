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

import getTimer = egret.getTimer;

class Main extends egret.DisplayObjectContainer {


    private cxk: CXK;
    private ball: Ball;
    private ball2: Ball;
    private ball3: egret.Bitmap;

    private pointText: egret.TextField;
    private ballCountText: egret.TextField;

    private scale_intro: egret.Sound;
    private scale_circle: egret.Sound;

    private shotSound: egret.Sound;
    private bingoSound: egret.Sound;
    private dieSound: egret.Sound;


    private scaleChannel: egret.SoundChannel

    private ballT: number = 0;

    private gameStatus: number = 0;//游戏状态 0 未开始 1 按压 2 正在投篮 3命中 4积分

    private powerEarn: number = 0;//力量 0-1
    private scoreboardImg: ScoreBoard;

    private ballCount: number = 10;
    private totalPoint: number = 0;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginState, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndState, this)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this)
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.scale_intro = RES.getRes('scale_intro_mp3')
            this.scale_circle = RES.getRes('scale_loop_mp3')
            this.shotSound = RES.getRes('launch_mp3')
            this.bingoSound = RES.getRes('point_mp3')
            this.dieSound = RES.getRes('die_mp3')
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    private drawBallCountAndScore() {
        this.ballCountText.text = 'x' + this.ballCount.toString()
        this.pointText.text = '得分：' + this.totalPoint.toString()
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        //    白色背景
        let shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xffffff, 1);
        shp.graphics.drawRect(0, 0, stageW, stageH);
        shp.graphics.endFill();
        this.addChild(shp);
        //篮球场背景
        let sky = this.createBitmapByName("bg_png");
        this.addChild(sky);
        sky.width = stageW;
        sky.height = stageW / (1102 / 1172)
        sky.y = (stageH - sky.height) / 2


        this.cxk = new CXK()
        this.addChild(this.cxk)
        this.cxk.x = 349
        this.cxk.y = sky.y + 231

        let ball2 = new Ball();
        this.addChild(ball2)
        ball2.x = 156
        ball2.y = 325
        ball2.alpha = 0;
        this.ball2 = ball2
        this.touchEnabled = true
        this.scoreboardImg = new ScoreBoard();
        this.scoreboardImg.touchEnabled = true
        this.scoreboardImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this)

        let tipText = new egret.TextField();
        this.addChild(tipText)
        tipText.textColor = 0x1aad19
        tipText.x = 200
        tipText.y = 900
        tipText.text = '长按蓄力，松开投球'

        this.pointText = new egret.TextField()
        this.addChild(this.pointText)
        this.pointText.x = 400
        this.pointText.y = 5
        this.pointText.textColor = 0x333333
        this.pointText.size = 28

        this.ballCountText = new egret.TextField()
        this.addChild(this.ballCountText)
        this.ballCountText.x = 60
        this.ballCountText.y = 5
        this.ballCountText.size = 28
        this.ballCountText.textColor = 0x333333

        this.ball3 = this.createBitmapByName('ball_png')
        this.addChild(this.ball3)
        this.ball3.y = 5
        this.ball3.x = 25
        this.ball3.width = 25
        this.ball3.height = 25

        this.drawBallCountAndScore()
    }

    private restart() {
        console.log('restart')
        if (this.gameStatus === 4) {
            this.removeChild(this.scoreboardImg)
            this.gameStatus = 0
            this.totalPoint = 0
            this.ballCount = 10
            this.drawBallCountAndScore()
        }
    }

    private onEnterFrame() {
        if (this.gameStatus === 2 || this.gameStatus === 3) {
            this.ballSport()
        }

        if (this.gameStatus === 1) {
            //蓄力过程
            this.powerEarn = this.powerEarn + (1 / 66)
        }

    }

    onTouchBeginState() {
        console.log('touch begin')
        if (this.gameStatus === 0) {
            this.gameStatus = 1
            this.powerEarn = 0
            this.ballT = 0
            this.scaleChannel = this.scale_intro.play(0, 1)
            setTimeout(() => {
                if (this.gameStatus === 1) {
                    this.scaleChannel.stop()
                    this.scaleChannel = this.scale_circle.play(0, 0)
                }
            }, 2200)
            this.cxk.prepare()
        }
    }

    onTouchEndState() {
        console.log('touch end')
        if (this.gameStatus === 1) {
            this.ballT = 0
            this.gameStatus = 2
            this.scaleChannel.stop()
            this.shotSound.play(0, 1)
            this.cxk.shot()
            this.ballCount--
            this.drawBallCountAndScore()
            this.ball = new Ball();
            this.addChild(this.ball)
            this.ball.alpha = 0
        }
    }


    ballSport() {
        //篮球弧线
        let speed = 0.015;
        let t = this.ballT
        let p0 = {x: 350, y: 445};
        // let p1 = {x: 250, y: 200};
        let p1 = {x: 250, y: 200 + (0.5 - this.powerEarn) * 320};
        let p2 = {...p1};
        let p3 = {x: 100 + (0.5 - this.powerEarn) * 160, y: 400};

        let cx = 3 * (p1.x - p0.x);
        let bx = 3 * (p2.x - p1.x) - cx;
        let ax = p3.x - p0.x - cx - bx;

        let cy = 3 * (p1.y - p0.y);
        let by = 3 * (p2.y - p1.y) - cy;
        let ay = p3.y - p0.y - cy - by;

        let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
        let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

        this.ballT += speed

        if (this.ballT > 1) {
            this.ballT = 1
        }
        this.ball.alpha = 1

        //结束这一步
        const stepOver = () => {
            this.gameStatus = 0
            this.cxk.reset()
            this.removeChild(this.ball)
            if (this.ballCount <= 0) {
                this.gameStatus = 4
                this.addChildAt(this.scoreboardImg, 10);
                this.scoreboardImg.x = (this.stage.stageWidth - this.scoreboardImg.scoreBoard.width) / 2;
                this.scoreboardImg.y = (this.stage.stageHeight - this.scoreboardImg.scoreBoard.height) / 2;
                console.log(this.scoreboardImg.x, this.scoreboardImg.y)
                this.scoreboardImg.setCurrentPoint(this.totalPoint);
            }
            this.drawBallCountAndScore()
        }

        if (this.gameStatus === 3) {//中了之后
            this.ball.y = yt
            if (yt >= p3.y - 1) {
                this.totalPoint++
                stepOver()
            }
        } else if (this.gameStatus === 2) {
            let isHit = this.ball2.hitTestPoint(this.ball.x + 5, this.ball.y + 5)
            if (isHit) {
                this.bingoSound.play(0, 1)
                this.gameStatus = 3
            }
            this.ball.x = xt
            this.ball.y = yt
        }

        if (this.ball.y >= p3.y - 1 && this.ball.x <= p3.x + 1) {
            if (this.gameStatus === 2) {
                this.dieSound.play(0, 1)
                stepOver()
            }
        }

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