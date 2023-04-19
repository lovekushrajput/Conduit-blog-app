import {NavLink } from "react-router-dom"
import Loading from "./Loading"

function SideBar({ tags, addTab, error, activeTab }) {

    if (!tags) {
        return <Loading err={error} name={'tags'} />
    }
    return (
        <aside>
            <div className="sidebar">
                <h2>Popular Tags</h2>
                <div className="tagList">
                    {
                        tags.map((tag) => <NavLink className={activeTab === tag ? 'active--tag' : ''} to={'/'} key={tag} onClick={() => addTab(tag)}>   {tag} </NavLink>)
                    }
                </div>
            </div >
        </aside>
    )
}

export default SideBar