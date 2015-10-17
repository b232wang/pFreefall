var c;
var ctx;
var particles = [];
var width = 800;
var height = 600;

// (y)

function Particle(_x, _y, _vx, _vy,_color){
    this.x = _x;
    this.y = _y; this.ax = 0;
    this.ay = 1;
    this.vx = _vx;
    this.vy = _vy;
    this.color = _color;
}

function main(){
    //alert("12313");
    c = document.getElementById("steven");
    ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,width,height);
    setInterval(loop,1000/30);


}

function myClick(){
    //var myRandom = Math.floor(Math.random() * 0xffffff);
    //alert(myRandom.toString(16));

    var x = event.clientX;
    var y = event.clientY;
    var newColor = 0;
    while(newColor < 240){
        var myRandom = Math.floor(Math.random() * 0xffffff);
        var red = myRandom >> 16;
        var green = (myRandom >> 8) & 0xff;
        var blue = myRandom & 0xff;
        newColor = Math.sqrt(red * red + green * green + blue * blue);
    }

    for(var i = 0; i< 100; i++){
        var a = Math.random()*3.14*2;
        var r = Math.random()*20;
        var vx = Math.cos(a)*r;
        var vy = Math.sin(a)*r;
        var p = new Particle(x,y,vx,vy,"#"+myRandom.toString(16));
        particles.push(p);
    }
}

function clean(){

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,800,600);
    ctx.fillStyle = "rgba(0,0,0,1)";
}

function render(){
    clean();
    for(var i = 0; i < particles.length ; i++){
        var p = particles[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,5,5);
    }
}
        var ppt = 0;

function update(){
    var i = particles.length;
    while(i--){
        var p = particles[i];
        var min = 1;
        var vlc = 5;
        if(p.x < 0){
            p.x = 0;
            p.vx *= -1;
        }
        if(p.x > width){
            p.x = width;
            p.vx *= -1;
        }
        if(p.x+400 < p.y){
            if(Math.abs(p.vx) < min){
                ppt++;
                p.vx = vlc;
                p.vy = vlc;
            //    p.ay = 0;
            }else{
                p.y = p.x+400;
                p.vy = p.vx ^ p.vy;
                p.vy = p.vx ^ p.vy;
                p.vy = p.vx ^ p.vy;
                p.vy *= 0.8;
                p.vx *= 0.8;
            }
        }
        if(1200 - p.x < p.y){
            if(Math.abs(p.vx) < min){
                p.vx = -vlc;
                p.vy = vlc;
                //p.ay = 0;
            }else{
                p.vy = p.vx ^ p.vy;
                p.vy = p.vx ^ p.vy;
                p.vy = p.vx ^ p.vy;
                p.y = -p.x+1200;
                p.vy *= 0.8;
                p.vx *= 0.8;
            }
        }
        if(p.y > height){

            p.y = height;
            p.vy *= -0.5;
            if(Math.abs(p.vy) < 5){
                particles[i] = particles[particles.length-1];
                particles.pop();
                continue;
            }
        }
        p.vx += p.ax;
        p.vy += p.ay;
        p.x += p.vx;
        p.y += p.vy;

    }
    //document.getElementById("show").innerHTML = "total: "+particles.length + " ::"+ particles[0].x +"  "+ particles[0].y + "  " + particles[0].ay;
    //document.getElementById("show1").innerHTML = particles[0].vx + " and " + particles[0].vy + " ==> " + ppt;


}
function loop(){
	update();
	render();
}
