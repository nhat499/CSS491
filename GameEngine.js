class GameEngine {
    constructor() {
        this.entities = []; // all the thing that are in the game
        this.entitiesToAdd = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // input controls 
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.jump = false;
        this.attack = false;
        this.slide = false;
    }

    init(ctx) { // call after the page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    }

    // update render loop (the heart of it)
    start() {
        let self = this;
        (function gameLoop() {
            self.loop();    // does stuff on our end
            //requestAnimFrame(gameLoop, that.ctx.canvas); // for backward compatiblity
            requestAnimationFrame(gameLoop, self.ctx.canvas); //requestAnimation -> build in method, that will call back when the monitor finish updating the frame
        })();
    };



    startInput() {
    // teacher will go over this later
        let self = this;
        this.ctx.canvas.addEventListener("keydown", function (e) {
            //console.log(e);
            switch (e.code) {
                case "ArrowLeft":
                    self.left = true;
                    break;
                case "ArrowRight":
                    self.right = true;
                    break;
                case "ArrowUp":
                    self.up = true;
                    break;
                case "ArrowDown":
                    self.down = true;
                    break;
                case "Space":
                    self.jump = true;
                    break; 
                case "KeyA":
                    self.attack = true;
                    break;
                case "KeyS":
                    self.slide = true;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                    self.left = false;
                    break;
                case "ArrowRight":
                    self.right = false;
                    break;
                case "ArrowUp":
                    self.up = false;
                    break;
                case "ArrowDown":
                    self.down = false;
                    break;
                case "Space":
                    self.jump = false;
                    break;
                case "KeyA":
                    self.attack = false;
                    break;
                case "KeyS":
                    self.slide = false;
            }
        }, false);
    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);                  // thing that are draw last are on top
        }
    }

    update() {
        let entitiesCount = this.entities.length;
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();              // update all entites
            }
        }

        for (let i = this.entities.length -1; i >= 0; i--) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);       // delete entities if they are removeFromWorld
            }
        }

        // add new things
        this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }
}