import Image from 'next/image'
import styles from './Home.module.css'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {WatchList} from "@/widgets/watchList/ui/WatchList";
import {itemService} from '@/shared/api/itemService';
import Link from "next/link";


export default function Home() {
    const [id, setId] = useState<string>('')
    const client = useQueryClient()

    const {mutate, isLoading} = useMutation({
        mutationFn: (id: number) => itemService.addItem(id),

        onSuccess: (data) => {
            console.log(data)
            toast.success(` ${data.data.message} `)
            client.invalidateQueries({queryKey: ['item list']})
            setId('')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    // @ts-ignore
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <main className={styles.main}>
                <section className={styles.intro}>
                    <div className={styles.wrapper}>
                        <div className={styles.into__wrapper}>
                            <div className={styles.content}>
                                <h1 className={styles.into__title}>
                                    Подпишись на изменение цены
                                </h1>
                                <div className={styles.into__subtitle}>
                                    <div className={styles.into__subtitleImg}>
                                        <svg id="sw-js-blob-svg" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <defs>
                                                <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                                                    <stop id="stop1" stopColor="rgba(248, 117, 55, 1)" offset="0%"/>
                                                    <stop id="stop2" stopColor="rgba(251, 168, 31, 1)" offset="100%"/>
                                                </linearGradient>
                                            </defs>
                                            <path fill="url(#sw-gradient)" d="M30.9,-25.6C36.3,-17.9,34.3,-5.3,30.3,4.8C26.3,14.9,20.4,22.4,12.6,26.1C4.9,29.8,-4.7,29.6,-13.5,26.1C-22.3,22.6,-30.5,15.7,-34.5,5.7C-38.6,-4.4,-38.6,-17.6,-32.2,-25.5C-25.7,-33.5,-12.9,-36.2,0,-36.2C12.8,-36.1,25.5,-33.4,30.9,-25.6Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0"  stroke="url(#sw-gradient)"/>
                                        </svg>
                                    </div>
                                    <Link className={styles.into__subtitleText} href={'https://t.me/WildberriesNoticeBot'}>Telegram бот пришлет уведомление</Link>
                                </div>
                            </div>

                            <Image className={styles.intro__phone}
                                   src="/phone.png"
                                   width={327}
                                   height={400}
                                   alt={'Phone'}
                                   draggable={false}/>
                        </div>
                        <div className={styles.added_form}>
                            <div className={styles.added_form__wrap}>
                                <input type="text" className={styles.added_form__field}
                                       placeholder="Введи артикул для отслеживания"
                                       value={id}
                                       onChange={(e) => setId(e.currentTarget.value)}/>
                                <button disabled={!id || isLoading} className={styles.added_form__button}
                                        onClick={() => mutate(+id)}>
                                    {isLoading ? <p className={isLoading ? styles.added_button__loading : ''}/> :
                                        <p>Добавить</p>}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <WatchList/>
            </main>
        </>
    )
}
