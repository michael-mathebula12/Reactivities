import { useContext } from "react";
import { StoreContext } from "../stores/stores";

export function useStore(){
    return useContext(StoreContext);
}