import {FC, ReactElement} from "react";
import {Header} from "@/widgets/header/ui/Header";
import {Footer} from "@/widgets/footer/ui/Footer";

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