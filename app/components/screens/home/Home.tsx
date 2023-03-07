import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from './Home.module.css'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ItemService} from "@/app/services/item.service";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Items} from "@/app/components/items/Items";


export default function Home() {
    const [id, setId] = useState<string>('')
    const client = useQueryClient()

    const {mutate, isLoading} = useMutation({
        mutationFn: (id: number) => ItemService.addItem(id),

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


    // const deleteItem =(id:number)=>{
    //     const myPromise = ItemService.deleteOne(id)
    //     console.log(myPromise)
    //     toast.promise(myPromise, {
    //         pending: "Удаление",
    //         success: `Товар с артикулом ${id} успешно удален `,
    //         error: "Ошибка при удалении"
    //     }).then(r => {
    //         if (r.data.deletedCount!=1) throw new Error('Ошибка при удалении')
    //         console.log(r)});
    // }


    // toast.promise(
    //     {
    //         pending: 'Promise is pending',
    //         success: 'Promise resolved 👌',
    //         error: 'Promise rejected 🤯'
    //     }
    // )

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
                                        onClick={() => mutate(+id)} >
                                    {isLoading ? <p className={isLoading ? styles.added_button__loading : ''}/> : <p>Добавить</p>}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <Items/>
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