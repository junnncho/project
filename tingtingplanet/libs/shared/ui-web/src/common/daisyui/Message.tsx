"use client";
type MessageType = "open" | "success" | "error" | "info" | "warning" | "loading";

type messageProps = {
  content: string | string[];
  key?: string;
  type?: MessageType;
  duration?: number;
};

const toastMap = new Map();

export const message = ({ content, key, type, duration = 3000 }: messageProps) => {
  // key가 있으면 기존에 있는지 확인
  if (key && toastMap.has(key)) {
    const existingToast = toastMap.get(key);
    if (!existingToast) return;
    const alertDoc = existingToast.toast.querySelector(".alert");
    if (typeof content === "string") {
      alertDoc.textContent = content;
    } else if (Array.isArray(content)) {
      alertDoc.textContent = content.join(" ");
    }
    alertDoc.classList.remove(
      "alert-success",
      "alert-error",
      "alert-info",
      "alert-warning",
      "alert-loading",
      "alert-open"
    );
    const messageType = type || "info";
    alertDoc.classList.add(`alert-${messageType}`);
    clearTimeout(existingToast.timeoutId);

    existingToast.timeoutId = setTimeout(() => {
      existingToast.toast.remove();
      toastMap.delete(key);
    }, duration);
    return;
  }

  // key가 없으면 새로 만들기
  const toast = document.createElement("div");
  toast.classList.add("toast", "toast-top", "toast-end", "z-50");

  const messageType = type || "info";
  toast.innerHTML = `<div class="alert z-[100] alert-${messageType}">${content}</div>`;
  document.body.appendChild(toast);

  const timeoutId = setTimeout(() => {
    toast.remove();
    key && toastMap.delete(key);
  }, duration);

  key && toastMap.set(key, { toast, timeoutId });
};

message.open = (props: messageProps | string) => message(makeProps(props));
message.success = (props: messageProps | string) => message(makeProps(props, "success"));
message.error = (props: messageProps | string) => message(makeProps(props, "error"));
message.info = (props: messageProps | string) => message(makeProps(props, "info"));
message.warning = (props: messageProps | string) => message(makeProps(props, "warning"));
message.loading = (props: messageProps | string) => message(makeProps(props, "loading"));

const makeProps = (props: messageProps | string, type?: MessageType) =>
  typeof props === "string" ? { content: props, type } : { ...props, type: type || props.type };
