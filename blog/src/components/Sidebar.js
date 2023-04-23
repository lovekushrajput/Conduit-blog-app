import { NavLink } from "react-router-dom"
import Loading from "./Loading"

function SideBar({ tags, addTab, error}) {

    return (
        <aside className="lg:w-1/4 mt-10 sm:w-full">
            <div className="bg-secondary-100 p-4 shadow rounded-lg">
                <h2>Popular Tags</h2>
                <ul className="mt-2">
                    {tags ?
                        tags.map((tag) => (
                            <NavLink to={'/'} key={tag} onClick={() => addTab(tag)}>
                                <li
                                    className="bg-secondary-200 hover:bg-secondary-300 inline-block mr-2 mb-1 px-2 rounded-full text-xs py-1 text-white font-semibold">
                                    {tag}
                                </li>
                            </NavLink>)
                        )
                        :
                        <Loading err={error} name={'tags'} />
                    }
                </ul>
            </div >
        </aside>
    )
}

export default SideBar