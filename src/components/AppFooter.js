import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          uCheck - a friendly to-do list
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
