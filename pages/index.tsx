import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '../styles/style.module.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ItemService} from "@/app/services/item.service";
import Link from 'next/link';
import axios from 'axios';

const inter = Inter({subsets: ['latin']})

export interface IItem {
    _id: string
    id: number
    name: string
    price: Price[]
    __v: number
}

export interface Price {
    price: number
    _id: string
    date: string
}


export default function Home({items}) {

    const client = useQueryClient()
    const {isLoading, data, error, isSuccess} = useQuery({
        queryFn: () => ItemService.getAll(),
        queryKey: ['item list'],
        onError: (err) => {
            console.log('err.message', err.message)
        }
    })
    console.log(data);

    const deleteItem = useMutation({
        mutationFn: (id) => ItemService.deleteOne(id),
        onSuccess(data) {
            client.invalidateQueries({queryKey: ['item list']});
        }
    });

    const changePrice = (oldPrice: number, newPrice: number) => {
        let percentageChange
        let textPriceChanged
        if (oldPrice !== newPrice) {
            percentageChange = Math.floor((newPrice - oldPrice) / oldPrice * 100)
            if (oldPrice > newPrice) return textPriceChanged = `↓ на ${percentageChange} %`
            if (oldPrice < newPrice) return textPriceChanged = `↑ на ${percentageChange} %`
        }
    }


    return (
        <>
            <Head>
            </Head>

            <div className={styles.header}>
                <div className={styles.wrapper}>
                    <div className={styles.header__wrapper}>
                        <div className={styles.header__logo}>
                            <a href="https://devandreyit.ru/" className={styles.header__logo_link}>
                                <svg className={styles.header__logo_img} width="226" height="35"
                                     viewBox="0 0 226 35"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.7614 27H0.6875V0.818181H10.6591C13.3523 0.818181 15.679 1.34233 17.6392 2.39062C19.608 3.4304 21.125 4.9304 22.1903 6.89062C23.2642 8.84233 23.8011 11.1818 23.8011 13.9091C23.8011 16.6364 23.2685 18.9801 22.2031 20.9403C21.1378 22.892 19.6293 24.392 17.6776 25.4403C15.7259 26.4801 13.4205 27 10.7614 27ZM7.79545 20.9659H10.5057C11.8011 20.9659 12.9048 20.7571 13.8168 20.3395C14.7372 19.9219 15.4361 19.2017 15.9134 18.179C16.3991 17.1562 16.642 15.733 16.642 13.9091C16.642 12.0852 16.3949 10.6619 15.9006 9.6392C15.4148 8.61648 14.6989 7.89631 13.7528 7.47869C12.8153 7.06108 11.6648 6.85227 10.3011 6.85227H7.79545V20.9659ZM35.8812 27.358C33.7846 27.358 31.9778 26.9574 30.4608 26.1562C28.9522 25.3466 27.7889 24.1875 26.9707 22.679C26.161 21.1619 25.7562 19.3466 25.7562 17.233C25.7562 15.2045 26.1653 13.4318 26.9835 11.9148C27.8017 10.3977 28.9565 9.21733 30.448 8.37358C31.9394 7.52983 33.6994 7.10795 35.7278 7.10795C37.2108 7.10795 38.5531 7.33807 39.7548 7.7983C40.9565 8.25852 41.9835 8.92756 42.8358 9.8054C43.688 10.6747 44.3443 11.7315 44.8045 12.9759C45.2647 14.2202 45.4948 15.6222 45.4948 17.1818V18.8182H27.9551V14.9318H39.0005C38.992 14.3693 38.8471 13.875 38.5659 13.4489C38.2931 13.0142 37.9224 12.6776 37.4537 12.4389C36.9934 12.1918 36.4693 12.0682 35.8812 12.0682C35.3102 12.0682 34.786 12.1918 34.3088 12.4389C33.8315 12.6776 33.448 13.0099 33.1582 13.4361C32.8769 13.8622 32.7278 14.3608 32.7108 14.9318V19.125C32.7108 19.7557 32.8429 20.3182 33.1071 20.8125C33.3713 21.3068 33.7505 21.6946 34.2448 21.9759C34.7392 22.2571 35.3358 22.3977 36.0346 22.3977C36.5204 22.3977 36.9636 22.3295 37.3642 22.1932C37.7733 22.0568 38.1227 21.8608 38.4125 21.6051C38.7022 21.3409 38.9153 21.0256 39.0517 20.6591H45.4948C45.2733 22.0227 44.7491 23.2074 43.9224 24.2131C43.0957 25.2102 42.0005 25.9858 40.6369 26.5398C39.2818 27.0852 37.6965 27.358 35.8812 27.358ZM66.952 7.36364L60.3555 27H52.1736L45.577 7.36364H52.9918L56.1623 20.3523H56.3668L59.5373 7.36364H66.952ZM72.4771 27H64.8066L73.4487 0.818181H83.1646L91.8066 27H84.1362L78.4089 8.02841H78.2043L72.4771 27ZM71.0453 16.6705H85.4657V21.9886H71.0453V16.6705ZM100.767 15.9545V27H93.7106V7.36364H100.409V11.0966H100.614C101.04 9.85227 101.79 8.87642 102.864 8.16903C103.946 7.46165 105.208 7.10795 106.648 7.10795C108.037 7.10795 109.243 7.42756 110.266 8.06676C111.297 8.69744 112.094 9.56676 112.657 10.6747C113.228 11.7827 113.509 13.0483 113.5 14.4716V27H106.444V15.9545C106.452 14.983 106.205 14.2202 105.702 13.6662C105.208 13.1122 104.517 12.8352 103.631 12.8352C103.051 12.8352 102.544 12.9631 102.11 13.2188C101.684 13.4659 101.355 13.8239 101.125 14.2926C100.895 14.7528 100.776 15.3068 100.767 15.9545ZM123.372 27.2557C121.974 27.2557 120.687 26.8892 119.511 26.1562C118.344 25.4233 117.406 24.3111 116.699 22.8196C116 21.3281 115.65 19.4489 115.65 17.1818C115.65 14.8125 116.017 12.8864 116.75 11.4034C117.491 9.92045 118.446 8.83381 119.613 8.14347C120.79 7.45312 122.025 7.10795 123.321 7.10795C124.292 7.10795 125.145 7.27841 125.878 7.61932C126.611 7.9517 127.224 8.39915 127.719 8.96165C128.213 9.51562 128.588 10.125 128.844 10.7898H128.946V0.818181H136.003V27H128.997V23.7784H128.844C128.571 24.4432 128.179 25.0398 127.667 25.5682C127.165 26.0881 126.551 26.5014 125.826 26.8082C125.111 27.1065 124.292 27.2557 123.372 27.2557ZM125.98 21.8352C126.628 21.8352 127.182 21.6477 127.642 21.2727C128.111 20.8892 128.469 20.3523 128.716 19.6619C128.971 18.9631 129.099 18.1364 129.099 17.1818C129.099 16.2102 128.971 15.3793 128.716 14.6889C128.469 13.9901 128.111 13.4574 127.642 13.0909C127.182 12.7159 126.628 12.5284 125.98 12.5284C125.332 12.5284 124.778 12.7159 124.318 13.0909C123.866 13.4574 123.517 13.9901 123.27 14.6889C123.031 15.3793 122.912 16.2102 122.912 17.1818C122.912 18.1534 123.031 18.9886 123.27 19.6875C123.517 20.3778 123.866 20.9105 124.318 21.2855C124.778 21.652 125.332 21.8352 125.98 21.8352ZM138.747 27V7.36364H145.599V11.0966H145.804C146.162 9.71591 146.729 8.70597 147.504 8.06676C148.288 7.42756 149.204 7.10795 150.253 7.10795C150.56 7.10795 150.862 7.13352 151.16 7.18466C151.467 7.22727 151.761 7.29119 152.043 7.37642V13.3977C151.693 13.2784 151.263 13.1889 150.751 13.1293C150.24 13.0696 149.801 13.0398 149.435 13.0398C148.744 13.0398 148.122 13.1974 147.568 13.5128C147.023 13.8196 146.592 14.2543 146.277 14.8168C145.962 15.3707 145.804 16.0227 145.804 16.7727V27H138.747ZM161.921 27.358C159.824 27.358 158.017 26.9574 156.5 26.1562C154.992 25.3466 153.828 24.1875 153.01 22.679C152.2 21.1619 151.796 19.3466 151.796 17.233C151.796 15.2045 152.205 13.4318 153.023 11.9148C153.841 10.3977 154.996 9.21733 156.487 8.37358C157.979 7.52983 159.739 7.10795 161.767 7.10795C163.25 7.10795 164.592 7.33807 165.794 7.7983C166.996 8.25852 168.023 8.92756 168.875 9.8054C169.727 10.6747 170.384 11.7315 170.844 12.9759C171.304 14.2202 171.534 15.6222 171.534 17.1818V18.8182H153.994V14.9318H165.04C165.031 14.3693 164.886 13.875 164.605 13.4489C164.333 13.0142 163.962 12.6776 163.493 12.4389C163.033 12.1918 162.509 12.0682 161.921 12.0682C161.35 12.0682 160.825 12.1918 160.348 12.4389C159.871 12.6776 159.487 13.0099 159.198 13.4361C158.916 13.8622 158.767 14.3608 158.75 14.9318V19.125C158.75 19.7557 158.882 20.3182 159.146 20.8125C159.411 21.3068 159.79 21.6946 160.284 21.9759C160.779 22.2571 161.375 22.3977 162.074 22.3977C162.56 22.3977 163.003 22.3295 163.404 22.1932C163.813 22.0568 164.162 21.8608 164.452 21.6051C164.742 21.3409 164.955 21.0256 165.091 20.6591H171.534C171.313 22.0227 170.788 23.2074 169.962 24.2131C169.135 25.2102 168.04 25.9858 166.676 26.5398C165.321 27.0852 163.736 27.358 161.921 27.358ZM177.497 34.3636C176.687 34.3636 175.916 34.2997 175.183 34.1719C174.45 34.0526 173.807 33.8864 173.253 33.6733L174.787 28.6619C175.366 28.8665 175.895 28.9986 176.372 29.0582C176.858 29.1179 177.271 29.0838 177.612 28.956C177.962 28.8281 178.213 28.5852 178.366 28.2273L178.52 27.8693L171.616 7.36364H178.98L182.151 20.9659H182.355L185.577 7.36364H192.991L185.832 28.6364C185.474 29.7188 184.954 30.6903 184.273 31.5511C183.599 32.4205 182.713 33.1065 181.614 33.6094C180.514 34.1122 179.142 34.3636 177.497 34.3636ZM201.284 0.818181V27H194.176V0.818181H201.284ZM203.217 6.54545V0.818181H225.973V6.54545H218.098V27H211.092V6.54545H203.217Z"
                                        fill="black"/>
                                </svg>
                            </a>
                        </div>
                        <div className={styles.header__free}>Бесплатно</div>
                    </div>
                </div>
            </div>

            <main className={styles.main}>
                <section className={styles.intro}>
                    <div className={styles.wrapper}>
                        <div className={styles.into__wrapper}>
                            <div className={styles.content}>
                                <h1 className={styles.into__title}>
                                    Подпишись на изменение цены
                                </h1>
                                <div className={styles.into__subtitle}>
                                    Telegram бот пришлет уведомление
                                </div>
                            </div>
                            <Image className={styles.intro__phone}
                                   src="/phone.png"
                                   width={327}
                                   height={400}
                                   alt={'Phone'}
                                   draggable={false}/>
                        </div>
                        <form className={styles.added_form}>
                            <p className={styles.added_form__wrap}>
                                <input type="text" className={styles.added_form__field}
                                       placeholder="Введи артикул для отслеживания"/>
                                <button className={styles.added_form__button}>
                                    Добавить
                                </button>
                            </p>
                        </form>
                    </div>
                </section>

                <section className={styles.list_items}>
                    <div className={styles.wrapper}>
                        <div className={styles.list_items__title}>Список отслеживаемых товаров</div>
                        {isLoading
                            ? <div>...isLoading</div>
                            : data?.data.length
                                ? data.data.map((item) => {
                                    const oldPriceData = item.price[item.price.length - 2]
                                    const newPriceData = item.price[item.price.length - 1]
                                    return <div key={item._id} className={styles.item}>
                                        <Link href={`https://www.wildberries.ru/catalog/${item.id}/detail.aspx`}>
                                            {item.name}
                                        </Link>
                                        <div className={styles.prices}>
                                            {item.price.length > 1 &&
                                                <div className={styles.oldPrice}>{oldPriceData.price} руб </div>}
                                            <div className={styles.newPrice}>{newPriceData.price} руб</div>
                                            {item.price.length > 1 && <div
                                                className={styles.changePrice}>{changePrice(oldPriceData.price, newPriceData.price)}
                                            </div>}
                                        </div>
                                        <div onClick={() => deleteItem.mutate(item.id)} className={styles.removeOne}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"
                                                 width="48">
                                                <path
                                                    d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                })
                                : <div>Товары не найдены</div>
                        }
                    </div>
                </section>
            </main>

        </>
    )
}

// export const getStaticProps = async () => {
//     const response = await fetch('http://localhost:5000/api/items')
//
//     const items = await response.json()
//     return {
//         props: {
//             items
//         },
//         revalidate: 10,
//     }
// }