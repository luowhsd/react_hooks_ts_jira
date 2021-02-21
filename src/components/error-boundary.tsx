import React, { Component } from "react";

type Props = React.PropsWithChildren<{ fallbackRender: FallbackRender }>;
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErroryBoundary extends Component<Props, { error: Error | null }> {
  state = { error: null };
  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
