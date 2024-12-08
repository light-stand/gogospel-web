import { createContext, useContext, useState } from "react";

type ModalTypes = "auth" | "joinMission";

type ModalContextType = {
  openModal: (modalName: ModalTypes, modalData?: any) => void;
  modalData: any;
  openModalName: null | ModalTypes;
  setOpenModalName: (modalName: null | ModalTypes) => void;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

import AuthModal from "@/auth/components/AuthModal";
import { SubmissionModal } from "@/mission/components/SubmissionModal";

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  modalData: {},
  openModalName: null,
  setOpenModalName: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModalName, setOpenModalName] = useState<null | ModalTypes>(null);
  const [modalData, setModalData] = useState<any>({});

  const openModal = (modalName: ModalTypes, modalData?: any) => {
    setOpenModalName(modalName);
    setModalData(modalData);
  };

  return (
    <ModalContext.Provider value={{ openModalName, setOpenModalName, openModal, modalData }}>
      {children}
      <AuthModal open={openModalName === "auth"} onClose={() => setOpenModalName(null)} />
      <SubmissionModal
        open={openModalName === "joinMission"}
        onClose={() => setOpenModalName(null)}
      />
    </ModalContext.Provider>
  );
};
