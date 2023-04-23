import Image from 'next/image'
import styles from './Home.module.css'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {WatchList} from "@/widgets/watchList/ui/WatchList";
import { itemService } from '@/shared/api/itemService';


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
