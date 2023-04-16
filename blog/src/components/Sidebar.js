import Loading from "./Loading"

function SideBar({ tags, addTab, error }) {

    if (!tags) {
        return <Loading err={error} name={'tags'} />
    }
    return (
        <aside>
            <div className="tag">
                {tags.map((tag) => (
                    <p
                        key={tag}
                        onClick={() => addTab(tag)}
                        role="button"
                        tabIndex='0'
                    >
                        {tag}
                    </p>
                ))}
            </div >
        </aside>
    )
}

export default SideBar