import {useState} from "react"




const useLocalStorage = (itemName,initialValue) => {
    
    const itemLocalStorage = JSON.parse(localStorage.getItem(itemName))

    if(itemLocalStorage == null){
        localStorage.setItem(itemName,JSON.stringify(initialValue))
        itemLocalStorage = localStorage.getItem(itemName)
    }

    const saveItemLocalStorage = (itemName,newItem) => {
        const stringfyItem = JSON.stringify(newItem)
        localStorage.setItem(itemName, stringfyItem)
    }

    return {
        itemLocalStorage,
        saveItemLocalStorage,
    }
}
export { useLocalStorage }