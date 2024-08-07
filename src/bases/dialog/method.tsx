import  ReactDOM from "react-dom/client";
import { Dialog, DialogProps } from "./dialog";

export function show(props: DialogProps) {

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  function unmount() {
    root.unmount()
    container.remove();
  }

  root.render(<Dialog {...props} unMount={unmount} />);
}
