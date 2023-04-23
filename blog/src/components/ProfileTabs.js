function ProfileTabs({ handleTabs, activeTab }) {

    return (
        <>
            <ul className="flex">
                <li className={activeTab === 'author' ? 'text-primary-100 border-b-2 border-primary-100 px-3 pb-2' : 'text-secondary-100 px-3 hover:text-secondary-200 cursor-pointer'} onClick={handleTabs} id={'author'}>My Article</li>
                <li className={activeTab === 'favorited' ? 'text-primary-100 border-b-2 border-primary-100 px-3 pb-2' : 'text-secondary-100 px-3 hover:text-secondary-200 cursor-pointer'} onClick={handleTabs} id={'favorited'}>Favorated Article</li>

            </ul>
            <hr className="mb-6" />
        </>
    )
}

export default ProfileTabs