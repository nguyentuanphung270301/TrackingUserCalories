import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const actionState = {
  login: "login",
  register: "register"
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.login);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.login);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "600px",
        padding: 4,
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>

          {action === actionState.login && <LoginForm switchAuthState={() => switchAuthState(actionState.register)} />}

          {action === actionState.register && <RegisterForm switchAuthState={() => switchAuthState(actionState.login)} />}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;