/* LOADING */
window.addEventListener("load",()=>{
    setTimeout(()=>document.getElementById("loader").style.display="none",1200);
});

/* PASSWORD */
const PASSWORD = "12092025";
function unlock(){
    if(document.getElementById("pass").value === PASSWORD){
        document.getElementById("lock").style.display="none";
        document.getElementById("main").style.display="flex";
        document.getElementById("music").play();
    } else {
        alert("Wrong password");
    }
}

/* COUNTDOWN */
const target = new Date("2026-01-12 00:00:00").getTime();
setInterval(()=>{
    const now = Date.now();
    const d = target - now;
    if(d < 0){
        cd.innerHTML = "Today is the day ✨";
        return;
    }
    cd.innerHTML = `
        ${Math.floor(d/86400000)}d
        ${Math.floor(d%86400000/3600000)}h
        ${Math.floor(d%3600000/60000)}m
        ${Math.floor(d%60000/1000)}s
    `;
},1000);

/* AGE */
const birth = new Date("2005-01-12");
setInterval(()=>{
    const diff = Date.now() - birth.getTime();
    age.innerHTML = "Age: " + Math.floor(diff/31557600000) + " years";
},1000);

/* POPUP */
function openPop(){ popup.style.display="flex"; }
function closePop(){ popup.style.display="none"; }

/* MUSIC */
function toggleMusic(){
    const m = document.getElementById("music");
    m.paused ? m.play() : m.pause();
}

/* THEME */
let gold = true;
function toggleTheme(){
    document.body.style.background = gold ?
        "radial-gradient(circle at top,#2a2a2a,#000)" :
        "radial-gradient(circle at top,#1b1c2e,#07070d)";
    gold = !gold;
}

/* SHARE */
function sharePage(){
    if(navigator.share){
        navigator.share({title:"Happy Birthday",url:location.href});
    } else {
        alert("Copy link: " + location.href);
    }
}

/* REALISTIC FIREWORK (CANVAS) */
const c = document.getElementById("fw");
const ctx = c.getContext("2d");
function resize(){ c.width=innerWidth; c.height=innerHeight; }
resize(); addEventListener("resize",resize);

class Particle{
    constructor(x,y){
        this.x=x; this.y=y;
        this.vx=(Math.random()-.5)*6;
        this.vy=(Math.random()-.5)*6;
        this.a=1;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.vy+=0.05;
        this.a-=0.015;
    }
    draw(){
        ctx.fillStyle=`rgba(255,215,0,${this.a})`;
        ctx.fillRect(this.x,this.y,3,3);
    }
}

let particles=[];
function boom(x,y){
    for(let i=0;i<80;i++) particles.push(new Particle(x,y));
}

addEventListener("click",e=>boom(e.clientX,e.clientY));

(function animate(){
    ctx.clearRect(0,0,c.width,c.height);
    particles = particles.filter(p=>p.a>0);
    particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
})();
