import styles from "@/entities/item/ui/Item.module.css";

export const changePrice = (oldPrice: number, newPrice: number) => {
    let percentageChange
    if (oldPrice !== newPrice) {
        percentageChange = Math.floor((newPrice - oldPrice) / oldPrice * 100)
        if (oldPrice > newPrice) return <div className={styles.priceDown}>{`↓ на ${percentageChange} %`}</div>
        if (oldPrice < newPrice) return <div className={styles.priceUp}>{`↑ на ${percentageChange} %`}</div>
    }
}