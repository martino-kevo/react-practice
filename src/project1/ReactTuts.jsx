import { useState } from 'react'

const ReactTuts = () => {
    const [item, setItem] = useState([
        {
            id: 1,
            checked: false,
            item: "One pound of salt"
        },
        {
            id: 2,
            checked: false,
            item: "item 2"
        },
        {
            id: 3,
            checked: false,
            item: "item 3"
        }
    ])

  return (
    <div>
      <ul>
        {item.map((item) => (
            <li className='item' key={item.id}>
                <input id="box" type="checkbox" defaultChecked={item.checked} />
                <label htmlFor="box">{item.item}</label>
                <button>Delete</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default ReactTuts
