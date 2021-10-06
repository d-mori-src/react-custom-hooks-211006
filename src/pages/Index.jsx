import Layout from '../components/Layout/Layout';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useFetchPosts } from '../hooks/useFetchPosts';

const Index = () => {
    // returnしたカスタムフックを分割代入して、ビューで展開させる
    const { userList, isLoading, isError } = useFetchUsers();
    const { postList, isLoading: isPostLoading, isError: isPostError } = useFetchPosts(); // 分割代入時かぶるときは名前を付け替えることが可能
    // const { userList, isLoading, isError, onClickFetchUser } = useFetchUsers(); // ボタントリガーのカスタムフック

    return (
        <Layout>
            <main className="top">
                {isError && isPostError && <p style={{ color: 'red' }}>Server Error</p>}
                {isLoading && isPostLoading ? <p>Loading...</p> : (
                    <>
                        {postList.map((post) => (
                            <div key={post.id} className="items">
                                {userList.map((user) => (
                                    <div key={user.id} className="item">
                                        {post.userId === user.id  && (
                                            <>
                                                <h3>{post.title}</h3>
                                                <p>{post.content}</p>
                                                <div>by {user.name}</div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))} 
                    </>
                )}
                {/* <button　onClick={onClickFetchUser}>ユーザー取得</button> */}
            </main>
        </Layout>
    );
}

export default Index;
