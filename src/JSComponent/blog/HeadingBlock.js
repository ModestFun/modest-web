import React, { PureComponent } from "react";
import Heading from "./Heading";

class HeadingBlock extends PureComponent {
  renderHtml = () => {
    const { level, children } = this.props;

    if (children && children.length > 0) {
      const nodeValue = children[0].props.value;
      return (
        <Heading level={`h${level}`} id={nodeValue}>
          <span className="MDtitle">{children}</span>
          <a href={`#${nodeValue}`} className="MDlink">
            #
          </a>
        </Heading>
      );
    } else {
      return <>{children}</>;
    }
  };
  render() {
    return <>{this.renderHtml()}</>;
  }
}

export default HeadingBlock;