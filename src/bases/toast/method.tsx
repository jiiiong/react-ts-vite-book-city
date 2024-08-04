import  ReactDOM from "react-dom/client";
import { Toast, ToastProps } from "./toast";

export type ToastShowProps = ToastProps | string

export function show(p: ToastShowProps) {
  const props = (typeof p === 'string') ? {content: p} : p

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  function unmount() {
    root.unmount()
    container.remove();
  }

  root.render(<Toast {...props} unmount={unmount} />);
}
