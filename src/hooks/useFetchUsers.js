import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUsers = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // ページにアクセスした際、描画
    useEffect(() => {
        fetchUsers();
    }, []);
    // カスタムフックの関数
    const fetchUsers = () => {
        // ローディング処理
        setIsLoading(true);
        // Feath処理
        axios
            .get('http://localhost:3001/users') // 公開する際は本番環境のURLにする
            .then(result => {
                // APIから取り出し
                const users = result.data.map(user => ({
                    id: user.id,
                    name: `${user.lastname} ${user.firstname}`,
                    age: user.age
                }));
                // 状態変更
                setUserList(users);
            })
            .catch(() => setIsError(true)) // catch Serverが起動していない場合
            .finally(() => setIsLoading(false)); // finally 最終的にローディング解除
    }
    // それぞれの値をreturn
    return { userList, isLoading, isError };

    // クリックによる描画(本書通り)
    // const onClickFetchUser = () => {
    //     setIsLoading(true);
    //     setIsError(false);

        // axios
        // .get('http://localhost:3001/users')
        // .then(result => {
        //     const users = result.data.map(user => ({
        //         id: user.id,
        //         name: `${user.lastname} ${user.firstname}`,
        //         age: user.age
        //     }));
        //     setUserList(users);
        // })
        // .catch(() => setIsError(true))
        // .finally(() => setIsLoading(false));
    // }
    // return { userList, isLoading, isError, onClickFetchUser };
}