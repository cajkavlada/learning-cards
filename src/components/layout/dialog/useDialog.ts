import { useContext } from "react";
import { DialogContext } from "./dialogProvider";

export const useDialog = () => useContext(DialogContext);
