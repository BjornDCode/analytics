import React from 'react'

import * as Icons from 'react-icons/fi'

const Icon = ({ name, ...props }) => {
    const Component = Icons[`Fi${name}`]

    return <Component className="text-gray-700 w-5 h-5" {...props} />
}

export default Icon
