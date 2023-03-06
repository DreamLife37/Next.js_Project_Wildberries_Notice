import {FC, ReactElement} from "react";
import {Header} from "./header/Header";
import {Footer} from "./footer/Footer";

type PropsType = {
    children: ReactElement
}
export const Layout: FC<PropsType> = ({children}) => {
    return <div>
        <Header/>
        {children}
        <Footer/>
    </div>
}