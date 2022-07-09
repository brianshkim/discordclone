import { createContext, useContext, useState } from "react";

const ListModalContext = createContext()

export const ListModalProvider = (props) => {
    const [modal, setShowModal] = useState(false)
    const [bool, setBool] = useState(false)
    const [show, setShow] = useState(false)


    return (
        <ListModalContext.Provider value={ { modal, setShowModal, bool, setBool, show, setShow } }>
            { props.children }
        </ListModalContext.Provider>
    );
}

export const useListModal = () => useContext(ListModalContext)
