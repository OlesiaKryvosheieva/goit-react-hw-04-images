import React from "react"
import css from './LoadMore.module.css'
export const LoadMore = ({onClick}) => {
 return (
    <button type="button" className={css.button} onClick={onClick}>Load more</button>
 )
}