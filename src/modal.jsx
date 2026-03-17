import { useState, useEffect } from 'react'
import './App.css'

function Modal({isOpen,handleClose}) {
    if (!isOpen) return null

  return (
       <div className='modal'>
         <div className='modal-content'>
           <h1>Инструкция</h1>
           <p> 🌍 Отвечайте на вопросы викторины, чтобы зарабатывать монеты. <br />
   
             🪙 Монеты нужны для покупки земель вокруг главного биома. <br />
   
             🌱 Обычные земли дают пассивный доход. <br />
   
             ⭐Когда все обычные земли куплены — открывается главный биом, <br />
             который открывает новые возможности и новые территории. <br />
   
             🎯Развивайте биомы и увеличивайте доход!</p>
   
           <button onClick={()=> handleClose()}>Закрыть</button>
         </div>
   
   
   
       </div>
  )
}

export default Modal