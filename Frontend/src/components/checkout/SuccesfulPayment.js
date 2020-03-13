/**
 * Use the CSS tab above to style your Element's container.
 */

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { render } from "react-dom";
import { useTransition, animated } from "react-spring";
import "./CSS/success.css";
function SuccessfulPayment() {
  const ref = useRef([]);
  const [items, set] = useState([]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#8fa5b6",
      marginLeft: 400
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80,marginLeft: 400, },
      { transform: "perspective(600px) rotateX(0deg)", color: "#28d79f" },
      { transform: "perspective(600px) rotateX(0deg)" }
    ],
    leave: [
      { color: "#c23369",marginLeft: 400 },
      { innerHeight: 0 },
      { opacity: 0, height: 0 }
    ],
    update: { color: "#8fa5b6" }
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(
      setTimeout(() => set(["Thank You", "for", "your Order"]), 500)
    );
    ref.current.push(
      setTimeout(() => set(["Your drinks", "will arrive soon"]), 1500)
    );
    ref.current.push(
      setTimeout(() => set(["Look Forward To  ", "Seeing You", "Again"]), 2500)
    );
    ref.current.push(setTimeout(() => set(["click to exit"]), 3500));
  }, []);

  useEffect(() => void reset(), []);

  return (
    
      <Grid justify="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
            <animated.div
              className="transitions-item"
              key={key}
              style={rest}
              onClick={reset}
            >
              <animated.div style={{ overflow: "hidden", height: innerHeight }}>
                {item}
              </animated.div>
            </animated.div>
          ))}
        </Link>
      </Grid>

  );
}

export default SuccessfulPayment;
