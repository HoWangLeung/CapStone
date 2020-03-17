import React, {useEffect, useRef} from "react";
import Grid from "@material-ui/core/Grid";
import "./Home.css";
import {TweenMax,TimelineLite,Power3} from "gsap";


export default function Home(props) {
  let brandName = useRef(null)
  let brandSlogan= useRef(null)
  

  let tl= new TimelineLite()

  
  useEffect(()=>{

    tl.fromTo(brandName, {opacity: 0,x: -80}, {duration: 3,opacity: 1, x: 0});

    tl.staggerFrom(brandSlogan.children,4,{
      opacity: 0,
      y:44,
      ease: Power3.easeOut,
    })
  })


  return (
    <Grid container className="resize">
      <div className="gradient"><div>
      <div ref={el => brandName = el}>
        <h1 id="brand-name">Coffee Crave</h1>
        </div>
        <div ref={el => brandSlogan = el}>
        <p id="brand-slogan">a paradise for coffee lovers</p>
        </div>
      </div></div>
    </Grid>
  );
}
