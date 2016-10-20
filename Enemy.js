/**
 * Created by ho on 10/19/2016.
 */

function Enemy (name){
    this.size = random(6, 20);

    this.name = name;

    this.x = random(0, 500);
    this.y = random(0, 500);

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);


    this.display = function(){
        imageMode(CENTER);
        smooth();
        strokeCap(ROUND);
        strokeWeight(5);
        stroke(this.r-20, this.g-20, this.b-20);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size);
        noStroke();
        fill(0);
        textAlign(CENTER);
        text(this.name, this.x, this.y);
    };


    this.xNoiseOffset = random(0, 2000);
    this.yNoiseOffset = random(2000, 4000);

    this.move = function(EXP, player){



        //NO WRAP-AROUNDS!
        if (this.x > width){
            this.x = width;
        }
        if (this.x < 0){
            this.x = 0;
        }
        if (this.y > height){
            this.y = height;
        }
        if (this.y < 0){
            this.y = 0;
        }


        //A better one:
        //Computer auto moves. If smaller than player, move away. Within that, find EXP.
        // If bigger than player, move however it wants. OR towards player???
        //But that'll be too difficult


        //--------- inefficent implementation ---------
        //1) If enemy comes cross user within a certain dist, and user is smaller, enemy should chase user until that dist runs out.
        //2) Else, enemy runs away till certain dist.
        //3) EXP-consumption should be second priority -- the first two should be priotized. Also, no need for perlin noise. Just iterate thru array and find the nearest EXP.

        //if it's close to EXP or user
        //move depending on what it is
        if (dist(this.x ,this.y, player.x, player.y) < 80){
            //if player size is smaller, chase after it
            if (player.size < this.size){
                if (this.x < player.x){
                    this.x += 1;
                }
                if (this.x > player.x){
                    this.x -= 1;
                }
                if (this.y < player.y){
                    this.y += 1;
                }
                if (this.y > player.x){
                    this.y -= 1;
                }
            }
            //else if other size is bigger, run
            else {
                if (this.x < player.x){
                    this.x -= 1;
                }
                if (this.x > player.x){
                    this.x += 1;
                }
                if (this.y < player.y){
                    this.y -= 1;
                }
                if (this.y > player.x){
                    this.y += 1;
                }
            }
        }
        else {
            var smallestX = EXP[0].x, smallestY = EXP[0].y;
            for (var i = 0; i < EXP.length; i++){
                if (dist (this.x, this.y, EXP[i].x, EXP[i].y) < dist(this.x, this.y, smallestX, smallestY)){
                    smallestX = EXP[i].x;
                    smallestY = EXP[i].y;
                }
            }
            //chase after the nearest EXP;
            if (this.x < smallestX){
                this.x += 1;
            }
            if (this.x > smallestX){
                this.x -= 1;
            }
            if (this.y < smallestY){
                this.y += 1;
            }
            if (this.y > smallestY){
                this.y -= 1;
            }
        }
    };

    this.checkHit = function(other){
        if (dist(this.x, this.y, other.x, other.y) < (this.size/2)){
            if (this.size < other.size){
                return false;
            }
            else {
                //OTHER IS DELETED
                this.size++;
                // this.points++;
                return true;
            }
        }
    };

    this.respawn = function(){
        this.x = random(500);
        this.y = random(500);
        this.size = random(6, 20);
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }



}