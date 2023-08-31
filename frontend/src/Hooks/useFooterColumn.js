import { useEffect, useState } from 'react'

function useFooterColumn(footerData , titles) {
    const [columnData, setColumnData] = useState([]);

    useEffect(() => {
        const filteredData = footerData.filter(item => titles.includes(item.fields.Category));
        const newColumnData = titles.map(title =>
            filteredData.filter(item => item.fields.Category === title)
        );
        setColumnData(newColumnData);
    }, [footerData, titles]);

    return columnData;
}

export default useFooterColumn