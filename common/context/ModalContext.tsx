import { createContext, useContext, useState } from "react";

type ModalTypes = "auth";

type ModalContextType = {
  openModal: ModalTypes | null;
  setOpenModal: (modalName: ModalTypes) => void;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

import AuthModal from "@/auth/components/AuthModal";

const ModalContext = createContext<ModalContextType>({
  openModal: null,
  setOpenModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<null | ModalTypes>(null);
  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
      <AuthModal
        open={openModal === "auth"}
        onClose={() => setOpenModal(null)}
      />
    </ModalContext.Provider>
  );
};
