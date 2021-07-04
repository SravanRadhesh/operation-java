class Game {
    constructor() {
      this.title = 'Zombie Game';
      this.thread = null;
      this.isRunning = false;
  
      new Window(this.WIDTH, this.HEIGHT, this.title, this);
      this.start();
    }
    start() {
      if (this.isRunning) {
        return undefined;
      }
      this.thread = new Thread(this);
      this.thread.start();
      this.isRunning = true;
    }
    stop() {
      if (!this.isRunning) {
        return undefined;
      }
      try {
        this.thread.join();
      } catch (e) {
        e.printStackTrace();
      }
      this.isRunning = false;
    }
    run() {
      let lastTime = System.nanoTime();
      let amountOfTicks = 60.0;
      let ns = 1000000000 / amountOfTicks;
      let delta = 0;
      let timer = System.currentTimeMillis();
      let updates = 0;
      let frames = 0;
      while (running) {
        let now = System.nanoTime();
        delta += (now - lastTime) / ns;
        lastTime = now;
        while (delta >= 1) {
          tick();
          updates++;
          delta--;
        }
        this.render();
        frames++;
        if (System.currentTimeMillis() - timer > 1000) {
          timer += 1000;
          System.out.println('FPS: ' + frames + ' TICKS: ' + updates);
          frames = 0;
          updates = 0;
        }
      }
      this.stop();
    }
    trick() {}
    render() {
      let bs = this.getBufferStrategy();
      if (bs === null) {
        this.createBufferStrategy(3);
        return undefined;
      }
      let g = bs.getDrawGraphics();
      g.setColor("back");
      g.fillRect(0, 0, this.WIDTH, this.HEIGHT);
      bs.show();
      g.dispose();
    }
  }
  Game.WIDTH = 800;
  Game.HEIGHT = 608;
  Game.main = (args) => {
    new Game();
  };
  