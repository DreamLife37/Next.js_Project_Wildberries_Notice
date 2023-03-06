import {FC} from "react";
import styles from "./Items.module.css";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ItemService} from "../../services/item.service";
import {Item} from "./Item/Item";
import {toast} from "react-toastify";
import {Skeletons} from "@/app/components/skeletons/Skeletons";

export const Items: FC = () => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryFn: () => ItemService.getAll(),
        queryKey: ['item list'],
        onError: (err: any) => {
            console.log('err.message', err.message)
        }
    })

    // const isLoading = true

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
                        : <div>Товары не найдены</div>
                }
            </div>
        </div>
    </section>

}