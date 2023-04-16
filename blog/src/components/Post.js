import { Link } from 'react-router-dom';
import { format } from 'date-fns'


function Post({ article }) {
    const { author, tagList, createdAt, description, slug, title } = article

    return (
        <div style={{ marginTop: '2rem' }} key={slug} >
            <hr /> 
            <div className="flex">
                <img src={author.image} alt={author.image} />
                <div>
                    <p>{author.username}</p>
                    <p>{format(new Date(createdAt), 'E LLL dd Y')}</p>
                </div>
            </div>

            <div style={{ margin: '0.5rem 0' }}>
                <Link to={'article/' + slug}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </Link >
            </div>



            {/* read more and tags */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={'article/' + slug}>Read more...</Link>
                <div className="flex justify-space width-20" >
                    {tagList.map((tag) => (
                        <p key={tag} className="border">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post