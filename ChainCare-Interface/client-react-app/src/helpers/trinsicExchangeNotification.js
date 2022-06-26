import { Button } from "react-bootstrap";

import { notification } from "antd";

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Ok
    </Button>
  );
  notification.error({
    message: "Error",
    description:
      "This account has exceeded the maximum allowed credential monthly exchanges. Please upgrade your plan.",
    btn,
    key,
    onClose: close,
  });
};

export { openNotification };
