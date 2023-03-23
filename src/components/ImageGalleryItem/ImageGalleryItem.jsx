import React from 'react';
import css from "./ImageGalleryItem.module.css"
export const ImageGalleryItem = ({webformatURL}) => {
    return (
        <li className={css.item} >
        <img src={webformatURL} alt=""  className={css.itemImage}/>
      </li>
    )
 
};
