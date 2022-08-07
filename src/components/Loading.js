import "antd/dist/antd.css";
import { Spin } from "antd";
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "90vh",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip="Loading..." />
    </div>
  );
}
