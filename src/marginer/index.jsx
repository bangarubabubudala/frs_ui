import React from "react";
import styled from "styled-components";

const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ $margin }) =>
    typeof $margin === "string" ? $margin : `${$margin}px`};
`;

const VerticalMargin = styled.span`
  display: flex;
  height: ${({ $margin }) =>
    typeof $margin === "string" ? $margin : `${$margin}px`};
`;

function Marginer(props) {
  const { direction, margin, ...rest } = props;

  if (direction === "horizontal")
    return <HorizontalMargin $margin={margin} {...rest} />;
  else
    return <VerticalMargin $margin={margin} {...rest} />;
}


Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };