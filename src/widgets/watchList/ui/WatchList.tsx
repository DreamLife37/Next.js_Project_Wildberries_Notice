import {FC} from "react";
import styles from "./watchList.module.css";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import {Skeletons} from "@/shared/ui/skeletons/Skeletons";
import {Item} from "@/entities/item";
import { itemService } from "@/shared/api/itemService";

export const WatchList: FC = () => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryFn: () => itemService.getAll(),
        queryKey: ['item list'],
        onError: (err: any) => {
            console.log('err.message', err.message)
        }
    })

    return <section className={styles.list_items}>
        <div className={styles.wrapper}>
            <div className={styles.list_items__title}>Список отслеживаемых товаров</div>
            <div className={styles.list_items__wrapper}>
                {isLoading
                    ? <div><Skeletons/></div>
                    : data?.data.length
                        ? data.data.map((item) => {
                            return <Item key={item._id} item={item}/>
                        })
                        : <div className={styles.noItems__wrapper}>
                            <Image src="/noItems.gif"
                                   width={256}
                                   height={256}
                                   alt={'No Items'}
                                   draggable={false}/>
                        </div>
                }
            </div>
        </div>
    </section>

}