import {FC} from "react";
import styles from "./Items.module.css";
import {useQuery} from "@tanstack/react-query";
import {ItemService} from "../../services/item.service";
import {Item} from "./Item/Item";
import {Skeletons} from "@/app/components/skeletons/Skeletons";
import Image from "next/image";

export const Items: FC = () => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryFn: () => ItemService.getAll(),
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