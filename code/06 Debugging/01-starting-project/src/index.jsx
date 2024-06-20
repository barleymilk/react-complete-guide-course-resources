import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// Strict Mode를 사용하는 건 특정하게 index.jsx에서 시작해야 한다.
// 하지만 원한다면 앱에 부분적으로만 활성화 시킬 수 있다.
// 왜냐하면 엄격 모드는 결국 간단히 말해 리액트에스 import하는 컴포넌트이기 때문이다.
// 모든 컴포넌트 함수를 두 번씩 실행한다. - 개발단계에서만 그렇게 한다.(에러를 발견하기 더 쉽기 때문)
// 만약 애플리케이션을 배포 목적으로 준비 중이라 서버에 업로드 한다면 StrictMode는 더 이상 두 번씩 컴포넌트들을 실행하지 않는다.
