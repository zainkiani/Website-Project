let controller;
let slideScene;

function animateSlides(){
    // init controller 
    controller = new ScrollMagic.Controller();
    // select stuff
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");
    //loop over each slide
    sliders.forEach(slide=>{
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");

        //GSAP
        const slideTl = gsap.timeline({
            defaults:{ duration: 1, ease:"power2.inOut"}
        });
        slideTl.fromTo(revealImg,{x:"0%"},{x:"100%"});
        slideTl.fromTo(img,{scale:2},{scale:1}, "-=1");
        slideTl.fromTo(revealText,{x:"0%"},{x:"100%"}, "-=0.75");
        slideTl.fromTo(nav,{y:"-100%"},{y:"0"},"-=0.75")

        // create scene
        slideScene = new ScrollMagic.Scene({
            triggerElement:slide,
            triggerHook:0.25,
            reverse:false
        })
        .setTween(slideTl)
        .addTo(controller)
        // .addIndicators({
        //     colorStart:"white",
        //     colorTrigger:"white",
        //     name:"slide"
        // })
        
    })
}
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
function cursor(e){
    
    mouse.style.top = e.clientY + "px";
    mouse.style.left = e.clientX + "px";
}
function activeCursor(e){
    const item = e.target;
    if(item.id === "logo" || item.classList.contains("burger")){
        mouse.classList.add("nav-active");
    } else{
        mouse.classList.remove("nav-active");
    }if(item.classList.contains("explore")){
        mouse.classList.add("explore-active");
        gsap.to(".title-swipe", 1, {y:"0%"});
        mouseTxt.innerText = "Tap";
    }else{
        mouse.classList.remove("explore-active");
        mouseTxt.innerText = "";
        gsap.to(".title-swipe", 1, {y:"100%"});
    }
}

function navToggle(e){
    if(!e.target.classList.contains("active")){
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, {rotate :"45", y:5,background:"black"})
    gsap.to(".line2", 0.5, {rotate :"-45", y:-5,background:"black"})
    gsap.to(".nav-bar", 1,{clipPath: "circle(2500px at 100% -10%)"});
    gsap.to("#logo",1,{color:"black"});
    document.body.classList.add("hide");
    }else{
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, {rotate :"0", y:0,background:"white"})
    gsap.to(".line2", 0.5, {rotate :"0", y:0,background:"white"})
    gsap.to(".nav-bar", 1,{clipPath: "circle(50px at 100% -10%)"});
    gsap.to("#logo",1,{color:"white"});
    document.body.classList.remove("hide");
    }
}

window.addEventListener("mousemove",cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);

animateSlides();