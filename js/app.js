//NOTE: x goes from left to right, and y goes from top to bottom (i.e. for y, 0 is at the top of the board.)
//NOTE: Positions are based on the top left corner of the bounding box of the player image which extends than the player itself. 
//NOTE: All images are 101 x 171; tiles overlap to create the shadow/depth effect on the canvas. 

// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field 
    this.sprite = 'images/enemy-bug.png';
};

// A method on the Enemy class that will update the enemies' positions. 
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Move the bugs back to the left side of the canvas once they reach the end (right side))
    if (this.x >= 510) {
        //Starts the buggies just off the left side of the canvas
        let start = -51;
        this.x = start;
        //Randomly generate the speed (will be @ least 200, which is the same as the default speed) 
        //and apply the time delta parameter.
        this.speed = (200 + Math.floor(Math.random() * 200)) * dt;
    };

    // Updates the position of the enemy as they move from left to right. 
    this.x += this.speed;
};

// Place (draw) the bugs on the canvas. 
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class that takes x and y parameters (the inputs required to move the player around the board).
var Player = function (x, y) {

    //This is the player that the game engine will render on the canvas. 
    this.player = 'images/char-boy.png';

    // This is the position of the player on the board. 
    this.x = x;
    this.y = y;
};

Player.prototype.update = function (dt) {

    for (let enemy of allEnemies) {
    // Collision detection from MDN: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x < enemy.x + 77 && this.x + 77 > enemy.x && 
        this.y < enemy.y + 60 && 60 + this.y > enemy.y) {
        this.x = 202;
        this.y = 405;
    };
};

};

// Renders the image of the player into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Dictates the player's response to the user pressing the arrow keys in any direction. 
Player.prototype.handleInput = function (keyPress) {

    // Left arrow press will move the player one tile to the left, but not off the canvas!
    // 101 represents the width of a column.
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 101;
    };

    // Right arrow press will move the player one tile to the left, but not off the canvas!
    // 101 represents the width of a column.
    // If this.x is 404, that means we're already in the farthest right column, which starts at 404.
    if (keyPress == 'right' && this.x < 404) {
        this.x += 101;
    };

    // Up arrow press will move the player one tile up, until they die or win, @ which point they are reset. 
    // 83 represents the height of a row.
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Down arrow press will move the player one tile down, but not off the canvas!
    // 83 represents the height of a row.
    // If this.y is 404, that means we're at the starting point for y, and can't go down any further.
    if (keyPress == 'down' && this.y < 403) {
        this.y += 83;
    };

    // If the player makes it to the top (the H2O, they win and are reset to the bottom), with a slight delay.
    if (this.y < 0) {
        setTimeout(() => {
            //This is the same as our starting coordinates.
            this.x = 202;
            this.y = 403;
        }, 750);
    };
};


//~~~~~Here's where we instantiate our objects!~~~~~~

// We will add all three enemies to this array; it's ready and waiting!
var allEnemies = [];

// Instantiate an enemy for each row of "stones" on the canvas. 
// Remember, the parameters are x position, y position and speed. Default speed here is 200.
    enemy = new Enemy(0, 63, 200);
    allEnemies.push(enemy);

    enemy = new Enemy(0, 147, 200);
    allEnemies.push(enemy);

    enemy = new Enemy(0, 230, 200);
    allEnemies.push(enemy);



// Instantiate a new player and put it at the starting point where x is 202 and y is 403.
// 202 for x places us in the 3rd column since each column is 101 wide.
// 403 for y is based on the height of about 4.25 (4.25 * 83) rows plus the extra 50px space above the top row. 
var player = new Player(202, 403);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
