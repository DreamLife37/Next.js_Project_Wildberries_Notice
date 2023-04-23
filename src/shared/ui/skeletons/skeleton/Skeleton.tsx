import {FC} from "react";
import styles from "./Skeleton.module.css";

export const Skeleton: FC = () => {
    return <div className={styles.skeletons}>
        <div className={styles.skeleton}></div>
    </div>


}