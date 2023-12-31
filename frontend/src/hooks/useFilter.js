import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useFilter = (filters, sort) => {
  const products = useSelector(s => s.products)
  const [filteredItems, setFilteredItems] = useState([])
  const params = new URLSearchParams(window.location.search)
  const category = params.get('category')

  useEffect(() => {
    if (category !== null) {
      setFilteredItems(products.categoryItems)
    } else {
      setFilteredItems(products.items)
    }
  }, [category, products])

  useEffect(() => {
    let items
    if (category !== null) {
      items = products.categoryItems
    } else {
      items = products.items
    }
    if (filters !== undefined) {
      setFilteredItems(
        items.filter((product) => {

          if (!filters.color && filters.size) {
            return product.size.includes(filters.size)
          }
          if (!filters.size && filters.color) {
            return product.color.includes(filters.color)
          }
          if (filters.size && filters.color) {
            return product.color.includes(filters.color) && product.size.includes(filters.size)
          }
          if (!filters.size && !filters.color) {
            return product
          }
        })
      );
    }

  }, [filters])


  useEffect(() => {
    if (filteredItems.length !== 0) {
      if (sort === "asc") {
        setFilteredItems(
          [...filteredItems].sort((a, b) => {
            return a.price - b.price;
          })
        );
      } else if (sort === "desc") {
        setFilteredItems(
          [...filteredItems].sort((a, b) => {
            return b.price - a.price;
          })
        );
      } else {
        setFilteredItems(
          [...filteredItems].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
      }
    }
  }, [sort]);

  return {
    filteredItems
  }
}