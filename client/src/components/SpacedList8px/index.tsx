import "./index.css";
import { WithChildren } from "../../types";

export default function SpacedGrid8px({ children }: WithChildren) {
  return <div className="spaced-grid-8px">{children}</div>;
}
