import Loading from "./Loading"
import Post from "./Post"

function Posts({ articles, error }) {

    if (!articles) {
        return (<Loading err={error} name='articles' />)
    }

    if(articles.length===0){
        return <p>No articles are here... yet.</p>
    }

    return (
        <>
            {articles.map(article => <Post key={article.slug} article={article} />)}
        </>
    )
}

export default Posts