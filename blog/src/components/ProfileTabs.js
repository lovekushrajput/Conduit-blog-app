function ProfileTabs({ handleTabs, activeTab }) {

    return (
        <ul className="flex" style={{ columnGap: '1rem' }}>
            <li className={activeTab === 'author' ? 'active' : 'cursor'} onClick={handleTabs} id={'author'}>My Article</li>
            <li className={activeTab === 'favorited' ? 'active' : 'cursor'} onClick={handleTabs} id={'favorited'}>Favorated Article</li>
            <hr />
        </ul>
    )
}

export default ProfileTabs