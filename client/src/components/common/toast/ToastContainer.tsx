import { styled } from "styled-components";
import Toast from "./Toast";
import useToastStore from "../../../store/toastStore";

function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <ToastContainerStyle>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        ></Toast>
      ))}{" "}
    </ToastContainerStyle>
  );
}

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 32px;
  left: 24px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default ToastContainer;
