import Styles from "./Error.module.css";
import { ReactNode } from "react";

interface Props {
    error: string | ReactNode;
}

function Error({ error }: Props) {
    return <div>{error}</div>;
}

export default Error;
