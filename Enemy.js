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

    this.move = function(other){



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

        //if it's close to EXP or user
        //move depending on what it is
        if (dist(this.x ,this.y, other.x, other.y) < (this.size *4)){
            //if other size is smaller, chase after it
            if (other.size < this.size){
                if (this.x < other.x){
                    this.x += 1;
                }
                if (this.x > other.x){
                    this.x -= 1;
                }
                if (this.y < other.y){
                    this.y += 1;
                }
                if (this.y > other.x){
                    this.y -= 1;
                }
            }
            //else if other size is bigger, run
            else {
                if (this.x < other.x){
                    this.x -= 1;
                }
                if (this.x > other.x){
                    this.x += 1;
                }
                if (this.y < other.y){
                    this.y -= 1;
                }
                if (this.y > other.x){
                    this.y += 1;
                }
            }
        }
        else {
            console.log("not close");
            //Perlin noise movement
            var xMovement = map(noise(this.xNoiseOffset), 0, 1, -1, 1);
            var yMovement = map(noise(this.yNoiseOffset), 0, 1, -1, 1);
            this.xNoiseOffset += 0.01;
            this.yNoiseOffset += 0.1;

            this.x += xMovement;
            this.y += yMovement;
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
    }



}