import React from 'react'
import ProgressBar from './ProgressBar'

function StatItem({ label, value, baseColor, barColor }) {
  return (
    <div>
      <div className='flex justify-between'>
      <label className='text-xl'>{label}</label>
      <label className='text-xl'>{value}</label>
      </div>
      <ProgressBar percentage={(value/225)*100} baseColor={baseColor} barColor={barColor} />
    </div>
  )
}

export default StatItem