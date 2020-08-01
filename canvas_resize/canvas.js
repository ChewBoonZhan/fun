//console.log('Successfully read file!');

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;

var c = canvas.getContext('2d');

//Rectangle
//c.fillStyle = "red";
//c.fillRect(0,0,window.innerWidth-2,window.innerHeight-2);


//note that the fillrect takes whatever style is before it.


//Line
// c.beginPath();
// c.moveTo(100,10);
// c.lineTo(100,150);
// c.lineTo(1000,100);
// c.strokeStyle = "blue";  //any css value
// c.stroke();

var radius_limit = 75;
var vision = 70;
var speedlimit = 90;
var colorArray = [
    "orange",
    "yellow",
    "black"
]

function Circle(x,y,radius,dx,dy,colour,radius,radius_small){
    this.radius = radius;
    this.tempdx = dx;
    this.tempdy = dy;
    this.radius_small = radius_small;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    //this.r = r;
    //this.g = g;
    //this.b = b;
    //this.o = o;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = "black";
        c.stroke();
        //colour = "rgba(" + String(r) + "," + String(g) + "," + String(b) + "," + String(o) + ")";
        this.colour = colour;
        c.fillStyle = this.colour;
        c.fill();
        
    }
    this.animates = function(){
        if ((mouse.which == 1) && (mouse.type == "mousedown")){
            //move elements towards the mouse x and y

            x_diff = this.x - mouse.x;
            y_diff = this.y - mouse.y;
            this.dx = -(x_diff/speedlimit);
            this.dy = -(y_diff/speedlimit);
            /*
            while (this.dy < speedlimit)
            {
                this.dy +=0.1
            }
            while (this.dx < speedlimit)
            {
                this.dx  += 0.1
            }
            
            if (((mouse.x - this.x <0) && (this.dx > 0)) || ((mouse.x - this.x >0) && (this.dx < 0)))
            {
                this.dx = -(this.dx)
            }
            if (((mouse.y - this.y <0) && (this.dy > 0)) || ((mouse.y - this.y >0) && (this.dy < 0)))
            {
                this.dy = -(this.dy)
            }
            */

        }
        else if ((mouse.which == 3) && (mouse.type == "mousedown")){
            
            x_diff = this.x - mouse.x;
            y_diff = this.y - mouse.y;
            this.dx = (x_diff/speedlimit);
            this.dy = (y_diff/speedlimit);
        }
        else if (mouse.type == "mouseup"){
            
            this.dx = this.tempdx;  
            this.dy = this.tempdy;
            
        }
        
        
        if ((this.x+(this.radius)) >= (window.innerWidth-2)|| ((this.x-(this.radius)) <= 0))
        {
            this.dx = -(this.dx);
            //speed+=1
        }
        

        if ((this.y+(this.radius)) >= (window.innerHeight-2) || ((this.y-(this.radius)) <= 0))
        {
            this.dy = -(this.dy);
            //speed+=1
        }
        
        this.x+=this.dx;
        this.y+=this.dy;
        if ((mouse.x - this.x <vision) && (mouse.x - this.x >-vision) &&(mouse.y - this.y <vision) && (mouse.y - this.y >-vision) ){
            if(this.radius <=radius_limit)
            {
                this.radius+=2;
            }
            
        }
        else if(this.radius >= this.radius_small){
            
            this.radius -=2;
        }
    
        
        
        this.draw();
    }
}
mouse = {
    x:undefined,
    y:undefined,
    which:undefined,
    type:undefined
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
})
window.addEventListener('mousedown',function(event){
    mouse.which = event.which;  //mousedown
    mouse.type = event.type;   //1 for left click, 3 for right click
    
})
window.addEventListener("mouseup",function(){
    mouse.which = event.which;   //mouseup
    mouse.type = event.type;     //1 for left click, 3 for right click
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth-2;
    canvas.height = window.innerHeight-2;

    init();   //a function
})
var circleArray = []


function animate(){
    
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);  //clear the canvas each time the page refreshes
    //c.fillStyle = "black";
    //c.fillRect(0,0,window.innerWidth-2,window.innerHeight-2);
    for (i = 0;i<circleArray.length;i++){
        circleArray[i].animates();
        
    }
    if (mouse.type == "mouseup")
    {
        mouse.type = "undefined"
    }
    
}
function init(){
    circleArray = [];
    for (var i = 0;i<500;i++){
    
        var x = Math.random()*(innerWidth- radius * 2) + radius;
        var y = Math.random()*(innerHeight- radius * 2) + radius;
        var radius = (Math.random()*5)+2;
        var radius_small = radius;
        
        //var r = Math.random()*255;
        //var g = Math.random()*255;
        //var b = Math.random()*255;
        lengths = (colorArray.length) 
        var colour = colorArray[Math.floor(Math.random() *lengths)];
        
        //var o = 0.8;
        //var x = 10;
        //var y = 20;
        //var speed = 2;
        var dx = (Math.random()-0.5);
        var dy = (Math.random()-0.5);
        
        
        
        circleArray.push(new Circle(x,y,radius,dx,dy,colour,radius,radius_small));
    }
}
init();
animate();


//dx = positive/negative
//input = positive/negative


//arc
// c.beginPath();
// c.arc(x,y,20,0,Math.PI * 2,false);
// final = "red"
// c.strokeStyle = final;
// c.stroke();






//introduce for loop for these
// for (var i = 0;i<3;i++
// {
//     x = Math.random() * window.innerWidth;
//     y = Math.random() * window.innerHeight;
//     r = Math.floor(Math.random() * 255);
//     g = Math.floor(Math.random() * 255);
//     b = Math.floor(Math.random() * 255);
//     opa = Math.random();
//     final= "rgba(" + String(r) + "," + String(g) + "," + String(b) + "," + String(opa) + ")";
//     c.beginPath();
//     c.arc(x,y,20,0,Math.PI * 2,false);
//     c.strokeStyle = final;
//     console.log(final)
//     c.stroke();
// }

//console.log(canvas);