import {FC} from "react";
import styles from "./Item.module.css";
import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {IItem} from "@/entities/item/model/item.interface.";
import {changePrice} from "@/entities/item/lib/utils/changePrice";
import { itemService } from "@/shared/api/itemService";

type PropsType = {
    item: IItem
}

export const Item: FC<PropsType> = ({item}) => {
    const client = useQueryClient()

    const {mutate, isLoading} = useMutation({
        mutationFn: (id: number) => itemService.deleteOne(id),

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

            <div className={styles.wrapper__button}>
                {isLoading
                    ? <div className={styles.added_form__button}>
                        <p className={styles.added_button__loading}/></div>
                    : <div onClick={() => mutate(item.id)}
                           className={styles.removeOne}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24"
                             viewBox="0 96 960 960"
                             width="48">
                            <path
                                d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/>
                        </svg>

                    </div>}</div>
        </div>
    </>
}