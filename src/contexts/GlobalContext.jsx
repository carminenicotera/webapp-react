/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// creo un contesto globale per condividere lo stato di caricamento tra i componenti
const GlobalContext = createContext()

// esporto un provider che avvolge l'app e fornisce lo stato di caricamento a tutti i componenti figli
const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <GlobalContext.Provider value={ {
      isLoading,
      setIsLoading,
    } }>
      { children }
    </GlobalContext.Provider>
  )
}

// creo un hook personalizzato per accedere facilmente al contesto globale in qualsiasi componente
const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export {GlobalProvider, useGlobalContext}