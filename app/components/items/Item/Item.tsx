import {FC} from "react";
import styles from "./Item.module.css";
import Link from "next/link";
import {changePrice} from "@/app/utils/utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ItemService} from "@/app/services/item.service";
import {IItem} from "@/app/components/items/Item/item.interface.";
import {toast} from "react-toastify";

type PropsType = {
    item: IItem
    // deleteItem: (id:number) => void
}

export const Item: FC<PropsType> = ({item}) => {
    const client = useQueryClient()

    const {mutate, isLoading} = useMutation({
        mutationFn: (id: number) => ItemService.deleteOne(id),

        onSuccess: () => {
            toast.success(`Товар успешно удален`)
            client.invalidateQueries({queryKey: ['item list']});
        }
    });

    const oldPriceData = item.price[item.price.length - 2]
    const newPriceData = item.price[item.price.length - 1]

    return <>
        <div className={styles.item}>
            <Link
                href={`https://www.wildberries.ru/catalog/${item.id}/detail.aspx`}>
                {item.name}
                <div className={styles.item__id}>Артикул: {item.id}</div>
            </Link>
            <div className={styles.prices}>
                {item.price.length > 1 &&
                    <div
                        className={styles.oldPrice}>{oldPriceData.price} руб </div>}
                <div className={styles.newPrice}>{newPriceData.price} руб</div>
                {item.price.length > 1 && <div
                    className={styles.changePrice}>{changePrice(oldPriceData.price, newPriceData.price)}
                </div>}
            </div>
            <div onClick={() => mutate(item.id)}
                 className={styles.removeOne}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24"
                     viewBox="0 96 960 960"
                     width="48">
                    <path
                        d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/>
                </svg>
            </div>
        </div>

    </>
}