import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }
  // 오류가 발생했을 때 조치
  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
        return <p>Something went wrong</p>
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
