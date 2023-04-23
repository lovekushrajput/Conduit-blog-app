function Pagination({ data, handlePagination }) {
    const { articles, articlesCount, offset } = data
    const pageCount = Math.ceil(articlesCount / 10)
    const paginationArr = []

    for (let i = 1; i <= pageCount; i++) {
        paginationArr.push(i)
    }

    let common = 'lg:px-3 lg:py-2 md:px-3 md:py-2 sm:px-3 sm:py-2 max-[520px]:py-1 max-[520px]:px-1  border-t border-b border-r border-secondary-100  hover:underline'

    const renderPaginationButtons = (index) => (
        <li
            // this class is made using psuedo class
            className={index * 10 === offset + 10 ? `${common} bg-primary-100 text-white first:border first:rounded-l-lg last:rounded-r-lg` : `${common} text-primary-100  cursor-pointer hover:bg-secondary-100 hover:text-primary-200 first:border first:rounded-l-lg last:rounded-r-lg`}
            key={index}
            onClick={() => handlePagination(index)}>
            {index}
        </li>
    )


    if (!articles) {
        return
    }
    return (
        <ul className="flex my-10   md:w-full sm:flex-wrap md:flex-wrap max-[520px]:flex-wrap">
            {paginationArr.map(renderPaginationButtons)}
        </ul>
    )
}



export default Pagination