function Pagination({ data, handlePagination }) {
    const { articles, articlesCount, offset } = data
    const pageCount = Math.ceil(articlesCount / 10)
    const paginationArr = []

    for (let i = 1; i <= pageCount; i++) {
        paginationArr.push(i)
    }


    const renderPaginationButtons = (index) => (
        <p
            className={index * 10 === offset + 10 ? 'active' : ''}
            key={index}
            onClick={() => handlePagination(index)}>
            {index}
        </p>
    )


    if (!articles) {
        return
    }
    return (
        <div style={{ gridTemplateColumns: `repeat(${pageCount}, 5%)` }} className='btns--pagination'>
            {paginationArr.map(renderPaginationButtons)}
        </div>
    )
}



export default Pagination